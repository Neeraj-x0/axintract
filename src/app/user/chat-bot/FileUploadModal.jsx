import React from "react";
import { Modal, Button, Form, Input, Upload, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Dragger } = Upload;

const FileUploadModal = ({
  isOpen,
  onCancel,
  onSubmit,
  loading = false,
  uploadProps,
  fileList = [],
  form,
  width = 600,
}) => {
  return (
    <Modal
      title="Upload File"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={onCancel}
          style={{ borderColor: "#d9d9d9" }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
          disabled={fileList.length === 0}
          style={{
            background: "#000",
            borderColor: "#000",
          }}
        >
          Upload
        </Button>,
      ]}
      maskClosable={false}
      width={width}
      destroyOnClose
    >
      <Form form={form} layout="vertical" requiredMark="optional">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter file title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea
            placeholder="Enter file description (optional)"
            rows={3}
          />
        </Form.Item>

        <Form.Item label="File" required>
          <Dragger
            {...uploadProps}
            style={{
              borderColor: "#d9d9d9",
              background: "#fafafa",
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#000" }} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for single file upload. PDF, CSV, DOC, XLS, TXT,
              etc.
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FileUploadModal;