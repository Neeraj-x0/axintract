import React, { useState, useRef, useEffect } from "react";
import { Layout, Modal, Typography } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import MessageBubble from "./Whatsapp/MessageBubble";
import FilePreview from "./Whatsapp/FilePreview";
import MessageInput from "./Whatsapp/MessageInput";
import PosterGenerator from "./PosterGenerator";
import { dummyMessages } from "./Whatsapp/constants";

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePosterGenerated = (posterData) => {
    setPosterData(posterData);
    setIsPosterGeneratorOpen(false);

    // Create a file object from the poster data
    const posterFile = {
      uid: `poster-${Date.now()}`,
      name: 'Generated Poster',
      status: 'done',
      type: 'image/png',
      imageUrl: posterData.imageUrl,
      isPoster: true // Flag to identify this is a generated poster
    };

    // Add to file list for preview
    setFileList(prevFiles => [...prevFiles, posterFile]);
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
          padding: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)"  // Subtle overall container shadow
        }}
      >
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "calc(100vh - 80px)",
            border: "1px solid rgba(0,0,0,0.06)",  // Soft border for content
            borderRadius: "8px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#fafafa",
              backgroundImage:
                "linear-gradient(rgba(240, 245, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 245, 255, 0.5) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              border: "1px solid rgba(0,0,0,0.04)",  // Subtle border for messages container
              borderRadius: "6px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"  // Soft inset shadow
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

          {fileList.length > 0 && (
            <div
              style={{
                padding: "10px 16px",
                backgroundColor: "#fafafa",
                borderTop: `1px solid #e0e0e0`,
                boxShadow: "0 -2px 10px rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.06)",  // Border for file preview
                borderRadius: "6px",
                margin: "10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "10px",
                  paddingBottom: "8px",
                }}
              >
                {fileList.map((file, index) => (
                  <FilePreview
                    key={index}
                    file={file}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </div>
            </div>
          )}

          <MessageInput
            style={{
              border: "1px solid rgba(0,0,0,0.08)",  // Soft border for input
              borderRadius: "8px",
              boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
              margin: "10px"
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
            onAttachClick={() => setIsPosterGeneratorOpen(true)}
          />
        </Content>
      </Layout>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileImageOutlined style={{ color: "#2563EB" }} />
            <span>Generate Poster</span>
          </div>
        }
        open={isPosterGeneratorOpen}
        onCancel={() => setIsPosterGeneratorOpen(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
        bodyStyle={{ backgroundColor: "#fafafa", padding: 0 }}
        className="poster-generator-modal"
      >
        <PosterGenerator onGenerate={handlePosterGenerated} />
      </Modal>

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
