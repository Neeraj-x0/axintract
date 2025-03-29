import React, { useState } from "react";
import {
  Button,
  Input,
  Upload,
  Dropdown,
  Tooltip,
  message,
  Space,
  Typography,
} from "antd";
import {
  SendOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  FileImageOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const MESSAGE_SCHEDULE_OPTIONS = [
  {
    label: "30 Minutes",
    duration: 30,
    unit: "minutes",
  },
  {
    label: "1 Hour",
    duration: 1,
    unit: "hour",
  },
  {
    label: "Tomorrow",
    duration: 1,
    unit: "day",
    time: { hour: 9, minute: 0 },
  },
];

const MessageInput = ({
  onSend,
  style,
  messageText = "",
  captionText = "",
  fileList = [],
  onMessageChange,
  onCaptionChange,
  onSendMessage,
  onKeyPress,
  onFileListChange,
  onRemoveFile,
  showModal,
}) => {
  const scheduleMenu = (
    <div className="schedule-dropdown-menu">
      {MESSAGE_SCHEDULE_OPTIONS.map((option) => (
        <div
          key={option.label}
          className="schedule-option"
          onClick={() => onSend(messageText, option)}
        >
          <Text>{option.label}</Text>
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        borderTop: "1px solid #e8e8e8",
        padding: "10px 15px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...style,
      }}
    >
      {fileList.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <Upload
            fileList={fileList}
            onRemove={onRemoveFile}
            listType="picture"
            maxCount={5}
          />
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          placeholder={fileList.length > 0 ? "Add caption" : "Type a message"}
          value={messageText}
          onChange={(e) => onMessageChange?.(e.target.value)}
          onKeyDown={onKeyPress}
          style={{ flex: 1 }}
          suffix={
            <Space>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  if (onFileListChange) {
                    onFileListChange([file]);
                  }
                  return false;
                }}
              >
                <Tooltip title="Attach file">
                  <Button
                    type="text"
                    icon={<PaperClipOutlined />}
                    style={{ border: "none" }}
                  />
                </Tooltip>
              </Upload>

              <Tooltip title="Create poster">
                <Button
                  type="text"
                  onClick={showModal}
                  icon={<PictureOutlined />}
                  style={{ border: "none" }}
                />
              </Tooltip>

              <Dropdown
                menu={{
                  items: MESSAGE_SCHEDULE_OPTIONS.map((option, index) => ({
                    key: index,
                    label: option.label,
                    onClick: () => onSend(messageText, option),
                  })),
                }}
                overlay={scheduleMenu}
                trigger={["click"]}
              >
                <Tooltip title="Schedule message">
                  <Button
                    type="text"
                    icon={<ClockCircleOutlined />}
                    style={{ border: "none" }}
                  />
                </Tooltip>
              </Dropdown>
            </Space>
          }
        />

        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={() => onSendMessage?.(messageText)}
          disabled={!messageText.trim() && fileList.length === 0}
          style={{ marginLeft: 8 }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
