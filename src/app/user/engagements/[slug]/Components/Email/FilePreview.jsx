import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Space } from "antd";
import {
  CloseOutlined,
  FileOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const FilePreview = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const isImage = file?.type?.startsWith("image/");

  useEffect(() => {
    if (isImage && file) {
      try {
        // If file has a URL property, use it directly
        if (file.url) {
          setPreviewUrl(file.url);
          return;
        }

        // If file is a Blob or File object, create object URL
        if (file instanceof Blob || file instanceof File) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
          return () => URL.revokeObjectURL(url); // Cleanup on unmount
        }
      } catch (error) {
        console.error("Error creating preview URL:", error);
      }
    }
  }, [file, isImage]);

  return (
    <Card
      style={{
        width: isImage ? "120px" : "200px",
        padding: "8px",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      <Button
        type="text"
        shape="circle"
        icon={<CloseOutlined />}
        onClick={() => onRemove(file)}
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      />

      {isImage && previewUrl ? (
        <div style={{ position: "relative", paddingTop: "100%" }}>
          <img
            src={previewUrl}
            alt={file.name || "Image preview"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </div>
      ) : (
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <FileOutlined style={{ fontSize: "24px", color: "#000" }} />
          <Text ellipsis style={{ width: "100%", textAlign: "center" }}>
            {file?.name || "Unknown file"}
          </Text>
          {file?.size && (
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {file.size}
            </Text>
          )}
        </Space>
      )}
    </Card>
  );
};

export default FilePreview;
