import React from "react";
import { Card, Button, Typography } from "antd";
import { CloseOutlined, FileOutlined } from "@ant-design/icons";

const { Text } = Typography;

const FilePreview = ({ file, onRemove }) => {
  const isImage = file.type?.startsWith("image/");
  const isPoster = file.isPoster;

  return (
    <Card
      style={{
        width: isImage ? 120 : 160,
        backgroundColor: "#fafafa",
        marginBottom: "4px",
        borderRadius: 10,
        position: "relative",
        flexShrink: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        border: `1px solid #fafafa`,
      }}
      styles={{body:{ padding: "8px" }}}
    >
      <Button
        size="small"
        type="text"
        icon={<CloseOutlined />}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "50%",
          color: "#fff",
          zIndex: 10,
          width: "18px",
          height: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
        }}
        onClick={() => onRemove(file)}
      />
      {isImage ? (
        <img
          src={isPoster ? file.imageUrl : URL.createObjectURL(file.originFileObj)}
          style={{
            width: "100%",
            height: "80px",
            objectFit: "cover",
            borderRadius: 10,
          }}
          alt="attachment preview"
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
          }}
        >
          <FileOutlined
            style={{
              fontSize: "24px",
              color: "#2563EB",
            }}
          />
          <Text
            style={{
              color: "#000",
              fontSize: "12px",
              marginTop: "4px",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {file.name}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default FilePreview; 