import React, { useState } from "react";
import {
  Button,
  Upload,
  Space,
  Dropdown,
  DatePicker,
  TimePicker,
  Tooltip,
  Modal,
  Form,
  message,
  Badge,
  Divider,
  Typography,
} from "antd";
import {
  SendOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
  CheckOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import ScheduleModal from "../ScheduleModal";
const { Text } = Typography;

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
  // State for scheduling
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [scheduledMessages, setScheduledMessages] = useState([]);
  const [schedulingForm] = Form.useForm();

  // Generate a default time 30 minutes from now
  const getDefaultScheduleTime = () => {
    return dayjs().add(30, "minute");
  };

  // Handle opening the scheduler
  const showScheduleModal = () => {
    schedulingForm.setFieldsValue({
      scheduleDate: dayjs(),
      scheduleTime: getDefaultScheduleTime(),
    });
    setIsScheduleModalVisible(true);
  };

  // Handle scheduling a message
  const handleScheduleMessage = () => {
    schedulingForm.validateFields().then((values) => {
      // Combine date and time
      const { scheduleDate, scheduleTime } = values;

      const combinedDateTime = dayjs(scheduleDate)
        .hour(scheduleTime.hour())
        .minute(scheduleTime.minute())
        .second(0);

      // Check if the time is in the past
      if (combinedDateTime.isBefore(dayjs())) {
        message.error("Cannot schedule a message in the past");
        return;
      }

      // Create the scheduled message
      const scheduledMessage = {
        id: Date.now(),
        scheduledTime: combinedDateTime.toISOString(),
        displayTime: combinedDateTime.format("YYYY-MM-DD HH:mm"),
        content: messageText || "(No message content)",
        files: fileList.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
        status: "scheduled",
      };

      // Update the scheduled messages list
      setScheduledMessages([...scheduledMessages, scheduledMessage]);
      setScheduledTime(combinedDateTime);

      message.success(
        <Space>
          <ScheduleOutlined />
          <span>
            Message scheduled for{" "}
            {combinedDateTime.format("MMM D, YYYY [at] h:mm A")}
          </span>
        </Space>
      );

      // Close the modal and reset form
      setIsScheduleModalVisible(false);
      schedulingForm.resetFields();
    });
  };

  // Dropdown items for the clock button
  const scheduleItems = [
    {
      key: "30min",
      label: "Send in 30 minutes",
      icon: <ClockCircleOutlined />,
      onClick: () => {
        const time = dayjs().add(30, "minutes");
        setScheduledTime(time);

        message.success(
          <Space>
            <ScheduleOutlined />
            <span>Message will send in 30 minutes</span>
          </Space>
        );
      },
    },
    {
      key: "1hour",
      label: "Send in 1 hour",
      icon: <ClockCircleOutlined />,
      onClick: () => {
        const time = dayjs().add(1, "hour");
        setScheduledTime(time);

        message.success(
          <Space>
            <ScheduleOutlined />
            <span>Message will send in 1 hour</span>
          </Space>
        );
      },
    },
    {
      key: "3hours",
      label: "Send in 3 hours",
      icon: <ClockCircleOutlined />,
      onClick: () => {
        const time = dayjs().add(3, "hours");
        setScheduledTime(time);

        message.success(
          <Space>
            <ScheduleOutlined />
            <span>Message will send in 3 hours</span>
          </Space>
        );
      },
    },
    {
      key: "tomorrow",
      label: "Send tomorrow morning",
      icon: <CalendarOutlined />,
      onClick: () => {
        const time = dayjs().add(1, "day").hour(9).minute(0).second(0);
        setScheduledTime(time);

        message.success(
          <Space>
            <ScheduleOutlined />
            <span>Message will send tomorrow at 9:00 AM</span>
          </Space>
        );
      },
    },
    {
      type: "divider",
    },
    {
      key: "custom",
      label: "Custom time",
      icon: <ScheduleOutlined />,
      onClick: showScheduleModal,
    },
    {
      key: "view",
      label: "View scheduled messages",
      icon: <ScheduleOutlined />,
      onClick: () => {
        // Could implement a modal to show all scheduled messages
        message.info(`You have ${scheduledMessages.length} scheduled messages`);
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          backgroundColor: "#fafafa",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
        }}
      >
        <Space>
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            multiple
            fileList={fileList}
            onChange={({ fileList: newFileList }) => {
              onFileListChange(newFileList);
            }}
          >
            <Tooltip title="Attach files">
              <Button
                type="text"
                shape="circle"
                icon={<PaperClipOutlined style={{ fontSize: "20px" }} />}
                style={{
                  color: "#000",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size="large"
              />
            </Tooltip>
          </Upload>

          <Dropdown
            menu={{ items: scheduleItems }}
            placement="topRight"
            trigger={["click"]}
            arrow
          >
            <Tooltip title="Schedule message">
              <Badge dot={scheduledTime !== null} offset={[-2, 2]}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<ClockCircleOutlined style={{ fontSize: "20px" }} />}
                  style={{
                    color: scheduledTime ? "#2563eb" : "#000",
                    border: "1px solid #f0f0f0",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  size="large"
                />
              </Badge>
            </Tooltip>
          </Dropdown>
        </Space>

        {/* Flexible spacer */}
        <div style={{ flex: 1 }}></div>

        <Tooltip
          title={
            scheduledTime
              ? "Schedule for " + dayjs(scheduledTime).format("MMM D, h:mm A")
              : "Send now"
          }
        >
          <Button
            type="primary"
            shape="circle"
            icon={scheduledTime ? <ScheduleOutlined /> : <SendOutlined />}
            onClick={onSendMessage}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:  "0 2px 5px rgba(37, 99, 235, 0.2)",
              backgroundColor: scheduledTime ? "#2563eb" : "#2563eb",
            }}
            size="large"
          />
        </Tooltip>
      </div>
      
      <ScheduleModal
        schedulingForm={schedulingForm}
        handleScheduleMessage={handleScheduleMessage}
        isScheduleModalVisible={isScheduleModalVisible}
        setIsScheduleModalVisible={setIsScheduleModalVisible}
        messageText={messageText}
        fileList={fileList}
      />
    </>
  );
};

export default MessageInput;
