import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Tabs,
  Typography,
  Space,
  Divider,
  message,
  Card,
  Row,
  Col,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  DownloadOutlined,
  PlusOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
const AddLeadsPopup = ({ isOpen, onClose, onSubmit, category, isLoading }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [file, setFile] = useState(null);
  const [manualForm] = Form.useForm();
  const [importForm] = Form.useForm();
  const [error, setError] = useState(null);

  const handleManualSubmit = (values) => {
    const formData = {
      ...values,
      type: "manual",
    };
    try {
      onSubmit(formData, null);
      manualForm.resetFields();
      setError(null);
    } catch {
      setError("Failed to add lead. Please try again.");
    }
  };

  const handleImportSubmit = (values) => {
    const formData = {
      ...values,
      type: "import",
      name: "",
      email: "",
      phone: "",
      notes: "",
    };
    try {
      onSubmit(formData, file);
      importForm.resetFields();
      setFile(null);
      setError(null);
    } catch {
      setError("Failed to import leads. Please try again.");
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setError(null);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv,.xlsx",
    maxCount: 1,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null);
    },
  };

  const handleDownloadFormat = () => {
    message.success("Download format template initiated");
    // Implement actual download logic
  };

  const items = [
    {
      key: "manual",
      label: (
        <span>
          <PlusOutlined /> Manual Entry
        </span>
      ),
      children: (
        <Form
          form={manualForm}
          layout="vertical"
          onFinish={handleManualSubmit}
          requiredMark="optional"
          size="large"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter lead name" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter lead name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email address" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="email@example.com"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="+1 (555) 123-4567"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Category" name="category">
            <Select
              placeholder="Select a category"
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {category.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Notes" name="notes">
            <TextArea
              rows={4}
              placeholder="Enter any additional information about this lead"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "import",
      label: (
        <span>
          <UploadOutlined /> Import from File
        </span>
      ),
      children: (
        <Form
          form={importForm}
          layout="vertical"
          onFinish={handleImportSubmit}
          requiredMark="optional"
          size="large"
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text type="secondary">
                Upload CSV or Excel file with leads data
              </Text>
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={handleDownloadFormat}
              >
                Download Format
              </Button>
            </div>

            <Card variant="borderless" className="upload-card">
              <Dragger {...uploadProps} style={{ padding: "20px 0" }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined
                    style={{ color: "#1677ff", fontSize: "48px" }}
                  />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for CSV or Excel files containing lead information
                </p>
              </Dragger>

              {file && (
                <div style={{ marginTop: 16 }}>
                  <Text strong>Selected file:</Text> {file.name}
                </div>
              )}
            </Card>

            <Divider style={{ margin: "12px 0" }} />

            <Form.Item
              label="Category for Imported Leads"
              name="importCategory"
            >
              <Select
                placeholder="Select a category for all imported leads"
                allowClear
                showSearch
                optionFilterProp="children"
              >
                {category.map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      title={<Title level={4}>Add New Leads</Title>}
      open={isOpen}
      onCancel={onClose}
      width={700}
      footer={null}
      destroyOnClose
      className="leads-modal"
    >
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 24 }}
        />
      )}
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        size="large"
        items={items}
        animated={{ tabPane: true }}
        className="leads-tabs"
      />

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
        }}
      >
        <Button size="large" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            if (activeTab === "manual") {
              manualForm.submit();
            } else {
              importForm.submit();
            }
          }}
          loading={isLoading}
        >
          {activeTab === "manual" ? "Add Lead" : "Import Leads"}
        </Button>
      </div>
    </Modal>
  );
};

const styleElement = document.createElement("style");
styleElement.innerHTML = `
  .leads-modal .ant-modal-content {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .leads-modal .ant-modal-header {
    margin-bottom: 24px;
    padding: 24px 24px 0;
    border-bottom: none;
  }
  
  .leads-modal .ant-modal-body {
    padding: 0 24px 24px;
  }
  
  .leads-tabs .ant-tabs-nav {
    margin-bottom: 24px;
  }
  
  .leads-tabs .ant-tabs-tab {
    padding: 12px 16px;
    font-size: 15px;
  }
  
  .leads-modal .ant-form-item-label > label {
    font-weight: 500;
  }
  
  .upload-card {
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    transition: all 0.3s;
  }
  
  .upload-card:hover {
    border-color: #1677ff;
  }
  
  .leads-modal .ant-form-item-label > label {
    height: 28px;
  }
  
  .ant-upload-drag {
    border: none !important;
    background: transparent !important;
  }
`;
document.head.appendChild(styleElement);

export default AddLeadsPopup;

AddLeadsPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
