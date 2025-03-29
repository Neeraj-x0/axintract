import React from "react";
import { Button, Typography, Tooltip } from "antd";
import {
  AudioOutlined,
  FileOutlined,
  DownloadOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const MessageBubble = ({ message }) => {
  const getBubbleStyle = (backgroundColor, borderColor) => ({
    padding: "5px 10px",
    borderRadius: "6px",
    background: "#fdffff",
    border: `1.5px solid ${borderColor}`,
    color: "#000",
    maxWidth: "50%",
    marginLeft: "auto",
    marginRight: "16px",
    marginBottom: "16px",
    position: "relative",
    boxShadow: "0 3px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    animation: "fadeIn 0.3s ease",
    transform: "translateY(-2px)", // Subtle lift effect
  });

  const timeStyle = {
    fontSize: "10px",
    color: "#666",
    marginLeft: "8px",
    alignSelf: "flex-end",
    opacity: 0.7,
  };

  const renderImageMessage = () => (
    <div
      style={getBubbleStyle(
        "linear-gradient(145deg, #f8f9fa, #ffffff)",
        "rgba(0,0,0,0.08)"
      )}
    >
      <div style={{ position: "relative" }}>
        <img
          src={message.imageUrl}
          alt={message.caption || "Image"}
          style={{
            width: "100%",
            borderRadius: "10px",
            maxHeight: "220px",
            objectFit: "cover",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
        {message.caption && (
          <Text
            style={{
              display: "block",
              marginTop: "8px",
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {message.caption}
          </Text>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "6px",
        }}
      >
        <Text style={timeStyle}>{message.time}</Text>
      </div>
    </div>
  );

  const renderVoiceMessage = () => (
    <div
      style={getBubbleStyle(
        "linear-gradient(145deg, #f0f1f3, #ffffff)",
        "rgba(0,0,0,0.06)"
      )}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Button
          shape="circle"
          icon={<AudioOutlined />}
          style={{
            backgroundColor: "rgba(45, 85, 255, 0.1)",
            border: "1px solid rgba(45, 85, 255, 0.2)",
            color: "#2D55FF",
          }}
          size="small"
        />
        <div
          style={{
            height: "6px",
            flex: 1,
            backgroundColor: "rgba(45, 85, 255, 0.1)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "30%",
              backgroundColor: "#2D55FF",
              borderRadius: "3px",
            }}
          ></div>
        </div>
        <Text style={{ color: "#333", fontWeight: 500 }}>
          {message.duration}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "6px",
        }}
      >
        <Text style={timeStyle}>{message.time}</Text>
      </div>
    </div>
  );

  const renderDocumentMessage = () => (
    <div
      style={getBubbleStyle(
        "linear-gradient(145deg, #f4f5f7, #ffffff)",
        "rgba(0,0,0,0.07)"
      )}
      className="w-full"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "4px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(45, 85, 255, 0.1)",
            borderRadius: "12px",
            padding: "10px",
            border: "1px solid rgba(45, 85, 255, 0.2)",
          }}
        >
          <FileOutlined style={{ fontSize: "24px", color: "#2D55FF" }} />
        </div>
        <div style={{ flex: 1 }}>
          <Text
            style={{
              color: "#333",
              display: "block",
              fontWeight: "600",
            }}
          >
            {message.name}
          </Text>
          <Text style={{ color: "#666", fontSize: "12px" }}>
            {message.size}
          </Text>
        </div>
        <Tooltip title="Download">
          <Button
            type="text"
            shape="circle"
            icon={
              <DownloadOutlined
                style={{ color: "#2D55FF", fontSize: "16px" }}
              />
            }
            style={{
              backgroundColor: "rgba(45, 85, 255, 0.1)",
              border: "1px solid rgba(45, 85, 255, 0.2)",
            }}
          />
        </Tooltip>
      </div>
      {message.caption && (
        <Text
          style={{
            display: "block",
            marginTop: "8px",
            color: "#333",
            fontWeight: 500,
          }}
        >
          {message.caption}
        </Text>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "6px",
        }}
      >
        <Text style={timeStyle}>{message.time}</Text>
      </div>
    </div>
  );

  const renderTextMessage = () => (
    <div
      style={getBubbleStyle(
        "linear-gradient(145deg, #f5f6f8, #ffffff)",
        "rgba(0,0,0,0.05)"
      )}
    >
      <Text
        style={{
          color: "#333",
          wordBreak: "break-word",
          fontSize: "15px",
          lineHeight: "1.6",
          fontWeight: 500,
        }}
      >
        {message.text}
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "6px",
        }}
      >
        <Text style={timeStyle}>{message.time}</Text>
      </div>
    </div>
  );

  switch (message.type) {
    case "image":
      return renderImageMessage();
    case "voice":
      return renderVoiceMessage();
    case "document":
      return renderDocumentMessage();
    default:
      return renderTextMessage();
  }
};

export default MessageBubble;
