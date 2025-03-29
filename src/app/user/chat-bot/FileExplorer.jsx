"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Table,
  Upload,
  Form,
  Input,
  Modal,
  Space,
  Empty,
  message,
  Tooltip,
  Spin,
} from "antd";
import {
  FileOutlined,
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const FileExplorer = ({ loading, fileList, setFileList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFileList, setUploadFileList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUploadFileList([]);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (uploadFileList.length === 0) {
        message.error("Please upload a file");
        return;
      }

      setModalLoading(true);

      // In a real application, this would be an API call to upload the file
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add the new file to the list with simplified data structure
      const newFile = {
        id: String(Date.now()), // Using timestamp as ID for simplicity
        title: values.title,
        description: values.description,
      };

      setFileList([newFile, ...fileList]);
      message.success("File uploaded successfully");
      setIsModalOpen(false);
      form.resetFields();
      setUploadFileList([]);
      setModalLoading(false);
    } catch (error) {
      message.error("Failed to upload file");
      setModalLoading(false);
    }
  };

  const handleDelete = (id) => {
    setFileList(fileList.filter((file) => file.id !== id));
    message.success("File deleted successfully");
  };

  const uploadProps = {
    onRemove: () => {
      setUploadFileList([]);
    },
    beforeUpload: (file) => {
      setUploadFileList([file]);
      return false;
    },
    fileList: uploadFileList,
    maxCount: 1,
  };

  // Simplified columns to match the available data
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              icon={<EyeOutlined />}
              size="small"
              style={{ borderColor: "#000" }}
              onClick={() => message.info(`Viewing ${record.title}`)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              style={{
                borderColor: "#000",
                color: "#000",
              }}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Spin size="large" tip="Loading file explorer..." />
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "4px",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          <FileOutlined /> Knowledge Base Files
        </Title>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={showModal}
          style={{
            background: "#000",
            borderColor: "#000",
          }}
        >
          Upload
        </Button>
      </div>

      {fileList.length > 0 ? (
        <div style={{ maxHeight: "370px", overflowY: "auto" }}>
          <Table
            dataSource={fileList}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 4 }}
            size="small"
            style={{ marginTop: "8px" }}
          />
        </div>
      ) : (
        <Empty
          description="No files uploaded yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}

      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            style={{ borderColor: "#d9d9d9" }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={modalLoading}
            onClick={handleSubmit}
            disabled={uploadFileList.length === 0}
            style={{
              background: "#000",
              borderColor: "#000",
            }}
          >
            Upload
          </Button>,
        ]}
        maskClosable={false}
        width={600}
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
                Support for single file upload. PDF, CSV, DOC, XLS, TXT, etc.
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FileExplorer;
