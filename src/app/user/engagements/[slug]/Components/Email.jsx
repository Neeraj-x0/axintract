import React, { useState, useRef, useEffect } from "react";
import { Layout, Modal, Typography, Select, Switch, Input, Card } from "antd";
import { MailOutlined, PaperClipOutlined } from "@ant-design/icons";
import FilePreview from "./Email/FilePreview";
import MessageInput from "./Email/MessageInput";
import { dummyEmails } from "./Email/constants";

import EmailBubble from "./Email/EmailBubble";

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const EnhancedEmail = () => {
  const [messageText, setMessageText] = useState("");
  const [fileList, setFileList] = useState([]);
  const [messages, setMessages] = useState(dummyEmails);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [emailService, setEmailService] = useState("mailgun");
  const [formData, setFormData] = useState({
    emailSubject: "",
    customHTML: "",
    emailTitle: "",
    emailNote: "",
    templateId: "",
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (fileList.length > 0 || messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "email",
        subject: formData.emailSubject,
        content: messageText,
        htmlContent: formData.customHTML,
        attachments: fileList,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
      setFileList([]);
      setFormData({
        emailSubject: "",
        customHTML: "",
        emailTitle: "",
        emailNote: "",
        templateId: "",
      });
    }
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
  };

  return (
    <>
      <Layout
        style={{
          background: "#ffffff",
          overflow: "hidden",
          padding: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Content
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            height: "calc(100vh - 80px)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "10px", width: "600px" }}>
            <Card
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "8px",
                boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <MailOutlined style={{ color: "#2563EB" }} />
                  <Text strong>Email Configuration</Text>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <Text>Email Service</Text>
                    <Select
                      value={emailService}
                      onChange={setEmailService}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="mailgun">Mailgun</Select.Option>
                      <Select.Option value="gmail">Gmail</Select.Option>
                    </Select>
                  </div>

                  <div>
                    <Text>Email Format</Text>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "4px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    >
                      <Text>HTML</Text>
                      <Switch checked={isHtmlMode} onChange={setIsHtmlMode} />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <Text>Subject</Text>
                  <Input
                    placeholder="Enter email subject"
                    value={formData.emailSubject}
                    onChange={(e) =>
                      setFormData({ ...formData, emailSubject: e.target.value })
                    }
                  />
                </div>

                {isHtmlMode && (
                  <div style={{ marginBottom: "16px" }}>
                    <Text>Email Title</Text>
                    <Input
                      placeholder="Email title"
                      value={formData.emailTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, emailTitle: e.target.value })
                      }
                    />
                  </div>
                )}

                <div style={{ marginBottom: "16px" }}>
                  <Text>{isHtmlMode ? "HTML Content" : "Email Content"}</Text>
                  <TextArea
                    placeholder={`Enter ${
                      isHtmlMode ? "HTML" : "email"
                    } content...`}
                    value={isHtmlMode ? formData.customHTML : messageText}
                    onChange={(e) => {
                      if (isHtmlMode) {
                        setFormData({
                          ...formData,
                          customHTML: e.target.value,
                        });
                      } else {
                        setMessageText(e.target.value);
                      }
                    }}
                    rows={4}
                    style={{ fontFamily: isHtmlMode ? "monospace" : "inherit" }}
                  />
                </div>
              </div>

              <MessageInput
                messageText={messageText}
                fileList={fileList}
                onMessageChange={setMessageText}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
                onFileListChange={setFileList}
                onRemoveFile={handleRemoveFile}
              />
            </Card>
          </div>
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#fafafa",
              backgroundImage: "url(/chatbg.png)", // Background image for messages container
              backgroundSize: "auto",
              backgroundPosition: "center",
              border: "1px solid rgba(0,0,0,0.04)",
              borderRadius: "6px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
            }}
            className="email-messages-container"
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
                <EmailBubble key={msg.id} message={msg} />
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
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "6px",
                margin: "10px",
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
        </Content>
      </Layout>

      <style jsx global>{`
        .email-messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .email-messages-container::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        .email-messages-container::-webkit-scrollbar-track {
          background-color: transparent;
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

export default EnhancedEmail;
