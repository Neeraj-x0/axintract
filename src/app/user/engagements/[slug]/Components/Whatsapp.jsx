import React, { useState, useRef, useEffect } from "react";
import { Layout, Modal, Typography } from "antd";
import MessageBubble from "./Whatsapp/MessageBubble";
import MessageInput from "./Whatsapp/MessageInput";
import { dummyMessages } from "./Whatsapp/constants";
import PosterModal from "./PosterGenerator";

const { Content } = Layout;
const { Text } = Typography;

const EnhancedWhatsapp = () => {
  const [messageText, setMessageText] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [fileList, setFileList] = useState([]);
  const [messages, setMessages] = useState(dummyMessages);
  const [isPosterGeneratorOpen, setIsPosterGeneratorOpen] = useState(false);
  const [posterData, setPosterData] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        const isImage = file.type.startsWith("image/");
        const newMessage = {
          id: messages.length + 1,
          type: isImage ? "image" : "document",
          imageUrl: isImage ? file.imageUrl : null,
          name: !isImage ? file.name : null,
          size: !isImage ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : null,
          caption: captionText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: "me",
          status: "sent",
        };
        setMessages([...messages, newMessage]);
      });
      setFileList([]);
      setCaptionText("");
    } else if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  const onPosterGenerate = (data) => {
    setFileList([...fileList, data]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveFile = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    if (newFileList.length === 0) {
      setCaptionText("");
    }
  };

  return (
    <>
      <Layout
        style={{
          background: "#ffffff",
          overflow: "hidden",
          padding: 5,
          flex: 1,
          display: "flex",
          height: "100%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)", // Subtle overall container shadow
        }}
      >
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "calc(100vh -80)",
            border: "1px solid rgba(0,0,0,0.06)", // Soft border for content
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#fafafa",
              backgroundImage: "url(/chatbg.png)", // Background image for messages container
              backgroundSize: "auto",
              backgroundPosition: "center",

              border: "1px solid rgba(0,0,0,0.04)", // Subtle border for messages container
              borderRadius: "6px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", // Soft inset shadow
            }}
            className="chat-messages-container"
          >
            <div
              style={{
                width: "100%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <MessageInput
            style={{
              border: "1px solid rgba(0,0,0,0.08)", // Soft border for input
              borderRadius: "8px",
              boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
              margin: "10px",
            }}
            messageText={messageText}
            captionText={captionText}
            fileList={fileList}
            onMessageChange={(value) => setMessageText(value)}
            onCaptionChange={(value) => setCaptionText(value)}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onFileListChange={setFileList}
            onRemoveFile={handleRemoveFile}
            showModal={setIsPosterGeneratorOpen}
          />
        </Content>
      </Layout>

      <PosterModal
        onCancel={() => setIsPosterGeneratorOpen(false)}
        visible={isPosterGeneratorOpen}
        onConfirm={(data) => {
          setPosterData(data);
          setIsPosterGeneratorOpen(false);
        }}
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages-container::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        .chat-messages-container::-webkit-scrollbar-track {
          background-color: transparent;
        }

        .poster-generator-modal .ant-modal-content {
          border-radius: 10px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .ant-modal {
            width: 90% !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedWhatsapp;
