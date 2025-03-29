import React from "react";
import {
  Modal,
  Button,
  Form,
  DatePicker,
  TimePicker,
  Divider,
  Typography,
  Select,
} from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;

const Scheduler = ({
  isScheduleModalVisible,
  setIsScheduleModalVisible,
  handleScheduleMessage,
  schedulingForm,
  messageText,
  fileList,
}) => {
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <ScheduleOutlined style={{ marginRight: 8, color: "#2563eb" }} />
          <span>Schedule Message</span>
        </div>
      }
      open={isScheduleModalVisible}
      onCancel={() => setIsScheduleModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsScheduleModalVisible(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          style={{ background: "#000000", borderColor: "#000000" }}
          onClick={handleScheduleMessage}
          icon={<ScheduleOutlined />}
        >
          Schedule
        </Button>,
      ]}
      width={400}
      centered
    >
      <Form form={schedulingForm} layout="vertical">
        <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
          Select a date and time to schedule your message
        </Text>

        <Form.Item
          name="scheduleDate"
          label="Date"
          rules={[{ required: true, message: "Please select a date" }]}
          initialValue={dayjs()}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            disabledDate={(current) => {
              return current && current < dayjs().startOf("day");
            }}
          />
        </Form.Item>

        <Form.Item
          name="scheduleTime"
          label="Time"
          rules={[{ required: true, message: "Please select a time" }]}
          initialValue={dayjs()}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" minuteStep={5} />
        </Form.Item>

        <Form.Item
          name="frequency"
          label="Repeat Frequency"
          rules={[{ required: true, message: "Please select a frequency" }]}
        >
          <Select style={{ width: "100%" }} defaultValue={"once"}>
            <Select.Option value="once">Once</Select.Option>
            <Select.Option value="daily">Daily</Select.Option>
            <Select.Option value="3d">3 Days</Select.Option>
            <Select.Option value="weekly">Weekly</Select.Option>
            <Select.Option value="monthly">Monthly</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Scheduler;
