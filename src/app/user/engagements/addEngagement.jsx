import React, { useState, useCallback } from "react";
import { Modal, Form, Input, Select, Button, Space, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { parseBody } from "../../../constants";
import PropTypes from "prop-types";

const { TextArea } = Input;
const { Title, Text } = Typography;

const CreateEngagementPopup = ({ isOpen, onClose, onSubmit, categories }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const formData = {
        ...values,
        totalMessages: 0,
        replies: 0,
      };

      await onSubmit(parseBody(formData));
      form.resetFields();
      onClose();
      toast.success("Engagement created successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to create engagement: ${error.message}`);
      } else {
        toast.error("Failed to create engagement");
      }
      console.error("Error creating engagement:", error);
    } finally {
      setLoading(false);
    }
  }, [form, onSubmit, onClose]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Create New Engagement
          </Title>
          <Button type="text" icon={<CloseOutlined />} onClick={handleCancel} />
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      maskClosable={false}
      width={500}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={true}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label={<Text strong>Name</Text>}
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter engagement name" />
        </Form.Item>

        <Form.Item
          name="category"
          label={<Text strong>Category</Text>}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const status = getFieldValue("status");
                if (!value && !status) {
                  return Promise.reject(
                    "Either Category or Status is required"
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Select placeholder="Select a category">
            <Select.Option value="">Select a category</Select.Option>
            {(categories || []).map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="notes" label={<Text strong>Notes</Text>}>
          <TextArea rows={4} placeholder="Add any additional notes..." />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "16px",
            marginTop: "8px",
          }}
        >
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                backgroundColor: "#000000",
                borderColor: "#000000",
                color: "#ffffff"
              }}
            >
              Create Engagement
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateEngagementPopup;

CreateEngagementPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
