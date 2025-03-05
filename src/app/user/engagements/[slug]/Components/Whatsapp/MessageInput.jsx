import React from "react";
import { Button, Input, Upload, Dropdown, Tooltip } from "antd";
import {
  SendOutlined,
  PaperClipOutlined,
  AudioOutlined,
  FileOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const MessageInput = ({
  messageText,
  captionText,
  fileList,
  onMessageChange,
  onCaptionChange,
  onSendMessage,
  onKeyPress,
  onFileListChange,
  onRemoveFile,
  onAttachClick,
}) => {
  const attachmentOptions = [
    {
      key: "generatePoster",
      label: "Generate Poster",
      icon: <FileOutlined />,
      onClick: onAttachClick,
    },
    {
      key: "uploadFile",
      label: "Upload Files",
      icon: <UploadOutlined />,
      onClick: () => document.getElementById("file-upload").click(),
    },
  ];

  return (
    <div
      style={{
        padding: "12px 16px",
        backgroundColor: "#ffffff", // Pure white background
        display: "flex",
        alignItems: "center",
        gap: "12px",
        border: "1px solid rgba(0,0,0,0.08)", // Subtle border
        borderRadius: "12px", // Soft rounded corners
        margin: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Gentle elevation
        transition: "all 0.3s ease",
      }}
    >
      <Dropdown
        menu={{ items: attachmentOptions }}
        placement="topRight"
        trigger={["click"]}
        arrow
      >
        <Tooltip title="Attach Files">
          <Button
            type="text"
            shape="circle"
            icon={<PaperClipOutlined style={{ fontSize: "20px", color: "#2D55FF" }} />}
            style={{
              color: "#2D55FF",
              border: "1px solid rgba(45, 85, 255, 0.2)",
              backgroundColor: "rgba(45, 85, 255, 0.05)",
              boxShadow: "0 2px 5px rgba(45, 85, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            size="large"
          />
        </Tooltip>
      </Dropdown>

      <Upload
        id="file-upload"
        beforeUpload={() => false}
        showUploadList={false}
        multiple
        fileList={fileList}
        onChange={({ fileList: newFileList }) => {
          onFileListChange([...fileList, ...newFileList]);
        }}
      >
        <input type="file" style={{ display: "none" }} />
      </Upload>

      {fileList.length > 0 ? (
        <TextArea
          value={captionText}
          onChange={(e) => onCaptionChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Add a caption..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          style={{
            flex: 1,
            backgroundColor: "#f9fafb", // Subtle background variation
            borderRadius: "18px",
            border: "1px solid rgba(0,0,0,0.1)",
            color: "#333",
            resize: "none",
            padding: "11px 16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
        />
      ) : (
        <TextArea
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type a message"
          autoSize={{ minRows: 1, maxRows: 4 }}
          style={{
            flex: 1,
            backgroundColor: "#f9fafb", // Subtle background variation
            borderRadius: "18px",
            border: "1px solid rgba(0,0,0,0.1)",
            color: "#333",
            resize: "none",
            padding: "11px 16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            fontSize: "15px",
            transition: "all 0.3s ease",
          }}
        />
      )}

      <Button
        type="primary"
        shape="circle"
        icon={
          messageText || fileList.length > 0 ? (
            <SendOutlined style={{ color: "white" }} />
          ) : (
            <AudioOutlined style={{ color: "white" }} />
          )
        }
        onClick={onSendMessage}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2D55FF", // Consistent accent color
          border: "1px solid rgba(45, 85, 255, 0.3)",
          boxShadow: "0 4px 12px rgba(45, 85, 255, 0.2)",
          transition: "all 0.3s ease",
          transform: "translateY(-1px)", // Subtle lift effect
        }}
        size="large"
      />
    </div>
  );
};

export default MessageInput;