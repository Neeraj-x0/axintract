import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  Typography,
  Row,
  Col,
  message,
  Space,
  Spin,
  Divider,
  Tooltip,
  Progress,
} from "antd";
import {
  PictureOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  DownloadOutlined,
  RedoOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useAxios from "@/lib";
import styled from "styled-components";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

// Styled components for black and white theme
const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .ant-modal-header {
    background-color: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 12px 12px 0 0;
    padding: 20px 24px;
  }

  .ant-modal-title {
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }

  .ant-modal-body {
    padding: 24px;
  }

  .ant-form-item-label > label {
    color: #000;
    font-weight: 500;
  }

  .ant-btn-primary {
    background-color: #000;
    border-color: #000;
    &:hover,
    &:focus {
      background-color: #333;
      border-color: #333;
    }
  }

  .ant-btn-default {
    border-color: #000;
    color: #000;
    &:hover,
    &:focus {
      border-color: #333;
      color: #333;
    }
  }
`;

const PreviewContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  min-height: 400px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const UploadCard = styled(Upload)`
  .ant-upload.ant-upload-select-picture-card {
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    background-color: #fafafa;
    transition: all 0.3s;

    &:hover {
      border-color: #000;
    }
  }
`;

const PosterModal = ({ visible, onCancel, onConfirm, username = "User" }) => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [iconFile, setIconFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedPosterBlob, setGeneratedPosterBlob] = useState(null);

  async function generatePoster() {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Validate required inputs
      if (!iconFile) {
        throw new Error("Icon image is required");
      }

      // Create FormData object for multipart/form-data request
      const formData = new FormData();
      formData.append("icon", iconFile);

      if (backgroundFile) {
        formData.append("background", backgroundFile);
      }

      formData.append("title", values.title);
      formData.append("note", values.note || "");

      // Current date for logging or tracking purposes
      const currentDate = new Date().toISOString();
      formData.append("generatedAt", currentDate);

      // Include username if available
      formData.append("name", username || "User");

      // Make the API request
      const response = await axios.post("/api/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      // Store blob for later download
      setGeneratedPosterBlob(response.data);

      // Create preview URL
      const imageUrl = URL.createObjectURL(response.data);
      setPreviewImage(imageUrl);
      setShowPreview(true);
      setLoading(false);

      message.success("Preview generated successfully!");
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error generating poster:", error);

      // Show more user-friendly error message
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate poster. Please try again."
      );

      // Enhance error with additional context
      const enhancedError = new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate poster"
      );
      enhancedError.original = error;
      enhancedError.status = error.response?.status;

      throw enhancedError;
    }
  }

  /**
   * Downloads the generated poster
   */
  function downloadPoster() {
    if (!generatedPosterBlob) {
      message.error("No poster available to download");
      return;
    }

    const url = URL.createObjectURL(generatedPosterBlob);
    const link = document.createElement("a");

    // Generate filename from title or use default
    const title = form.getFieldValue("title");
    const cleanTitle = title
      ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "poster";
    const filename = `${cleanTitle}_${new Date().getTime()}.png`;

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    message.success("Poster downloaded successfully!");
  }

  const handleIconChange = (info) => {
    if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      return;
    }

    // Reset preview if the user changes the icon
    if (showPreview) {
      setShowPreview(false);
      setPreviewImage(null);
      setGeneratedPosterBlob(null);
    }

    if (info.fileList.length > 0) {
      const file = info.fileList[info.fileList.length - 1];

      // Validate file size (max 5MB)
      if (file.originFileObj && file.originFileObj.size > 5 * 1024 * 1024) {
        message.warning("Image must be smaller than 5MB");
        return;
      }

      setIconFile(file.originFileObj);
      message.success(`${file.name} uploaded successfully`);
    } else {
      setIconFile(null);
    }
  };

  const handleBackgroundChange = (info) => {
    if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      return;
    }

    // Reset preview if the user changes the background
    if (showPreview) {
      setShowPreview(false);
      setPreviewImage(null);
      setGeneratedPosterBlob(null);
    }

    if (info.fileList.length > 0) {
      const file = info.fileList[info.fileList.length - 1];

      // Validate file size (max 10MB)
      if (file.originFileObj && file.originFileObj.size > 10 * 1024 * 1024) {
        message.warning("Background image must be smaller than 10MB");
        return;
      }

      setBackgroundFile(file.originFileObj);
      message.success(`${file.name} uploaded successfully`);
    } else {
      setBackgroundFile(null);
    }
  };

  const handleConfirm = () => {

    if (!previewImage) {
      message.error("Please generate a preview first");
      return;
    }

    const values = form.getFieldsValue();

    // Call the onConfirm callback with all the necessary data
    onConfirm({
      title: values.title,
      note: values.note,
      iconFile,
      backgroundFile,
      previewImage,
      posterBlob: generatedPosterBlob,
      
    });

    // Reset form and state
    resetState();
    onCancel();

    message.success("Poster created successfully!");
  };

  const resetState = () => {
    form.resetFields();
    setIconFile(null);
    setBackgroundFile(null);
    setPreviewImage(null);
    setShowPreview(false);
    setGeneratedPosterBlob(null);
  };

  const handleCancel = () => {
    Modal.confirm({
      title: "Discard changes?",
      content: "You have unsaved changes. Are you sure you want to cancel?",
      okText: "Yes, discard",
      cancelText: "No, continue editing",
      okButtonProps: { style: { background: "#000", borderColor: "#000" } },
      onOk: () => {
        resetState();
        onCancel();
      },
    });
  };

  // Get a readable file name for display
  const getDisplayFileName = (file) => {
    if (!file) return "";

    const name = file.name || "";
    if (name.length <= 20) return name;

    const extension = name.split(".").pop();
    return `${name.substring(0, 15)}...${extension}`;
  };

  return (
    <StyledModal
      title={
        <Space>
          <span>Create Poster</span>
          <Tooltip title="Create a custom poster with your own images and text">
            <InfoCircleOutlined style={{ fontSize: "16px", color: "#999" }} />
          </Tooltip>
        </Space>
      }
      open={visible}
      onCancel={handleCancel}
      width={1000}
      footer={null}
      destroyOnClose
      centered
    >
      <Row gutter={24}>
        <Col xs={24} md={showPreview ? 12 : 24}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ title: `${username}'s Awesome Poster`, note: "" }}
            requiredMark="optional"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter a title" }]}
              tooltip="This will be the main heading of your poster"
            >
              <Input
                placeholder={`${username}'s Awesome Poster`}
                maxLength={75}
                showCount
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="note"
              label="Note"
              rules={[{ required: true, message: "Please enter a note" }]}
              tooltip="Add a personal message or description for your poster"
            >
              <TextArea
                placeholder="Enter your message here..."
                autoSize={{ minRows: 3, maxRows: 5 }}
                maxLength={200}
                showCount
                size="large"
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={
                    <Space>
                      <span>Icon Image</span>
                      <Tooltip title="This will be the main focus of your poster (Required)">
                        <InfoCircleOutlined style={{ color: "#999" }} />
                      </Tooltip>
                    </Space>
                  }
                  required
                >
                  <UploadCard
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleIconChange}
                    maxCount={1}
                    accept="image/*"
                  >
                    {!iconFile ? (
                      <div>
                        <PictureOutlined style={{ fontSize: "24px" }} />
                        <div style={{ marginTop: 8 }}>Upload Icon</div>
                        <div style={{ fontSize: "12px", color: "#999" }}>
                          Max: 5MB
                        </div>
                      </div>
                    ) : (
                      <div style={{ position: "relative", width: "100%" }}>
                        <img
                          src={URL.createObjectURL(iconFile)}
                          alt="Icon preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            background: "rgba(0,0,0,0.65)",
                            padding: "4px",
                            color: "white",
                            fontSize: "11px",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getDisplayFileName(iconFile)}
                        </div>
                      </div>
                    )}
                  </UploadCard>
                  {iconFile && (
                    <Text
                      type="secondary"
                      style={{ display: "block", marginTop: "4px" }}
                    >
                      {Math.round(iconFile.size / 1024)} KB
                    </Text>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Space>
                      <span>Background Image</span>
                      <Tooltip title="Custom background for your poster (Optional)">
                        <InfoCircleOutlined style={{ color: "#999" }} />
                      </Tooltip>
                    </Space>
                  }
                >
                  <UploadCard
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleBackgroundChange}
                    maxCount={1}
                    accept="image/*"
                  >
                    {!backgroundFile ? (
                      <div>
                        <UploadOutlined style={{ fontSize: "24px" }} />
                        <div style={{ marginTop: 8 }}>Upload Background</div>
                        <div style={{ fontSize: "12px", color: "#999" }}>
                          Max: 10MB
                        </div>
                      </div>
                    ) : (
                      <div style={{ position: "relative", width: "100%" }}>
                        <img
                          src={URL.createObjectURL(backgroundFile)}
                          alt="Background preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            background: "rgba(0,0,0,0.65)",
                            padding: "4px",
                            color: "white",
                            fontSize: "11px",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {getDisplayFileName(backgroundFile)}
                        </div>
                      </div>
                    )}
                  </UploadCard>
                  {backgroundFile && (
                    <Text
                      type="secondary"
                      style={{ display: "block", marginTop: "4px" }}
                    >
                      {Math.round(backgroundFile.size / 1024)} KB
                    </Text>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                onClick={generatePoster}
                loading={loading}
                disabled={!iconFile}
                block
                size="large"
                icon={showPreview ? <RedoOutlined /> : <EyeOutlined />}
              >
                {showPreview ? "Regenerate Preview" : "Generate Preview"}
              </Button>
            </Form.Item>
          </Form>
        </Col>

        {showPreview && (
          <Col xs={24} md={12}>
            <PreviewContainer>
              <div
                style={{ textAlign: "center", marginBottom: 24, width: "100%" }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Preview
                </Title>
                <Divider style={{ margin: "12px 0" }} />
              </div>

              {loading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                  }}
                >
                  <Spin size="large" />
                  <Text style={{ marginTop: 16 }}>
                    Generating your poster...
                  </Text>
                  <Progress
                    percent={75}
                    status="active"
                    style={{ width: "80%", marginTop: 16 }}
                  />
                </div>
              ) : previewImage ? (
                <>
                  <ImagePreview src={previewImage} alt="Poster Preview" />

                  <div
                    style={{
                      marginTop: 16,
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Title level={4} style={{ margin: 0 }}>
                      {form.getFieldValue("title")}
                    </Title>
                    <Paragraph type="secondary" style={{ marginTop: 8 }}>
                      {form.getFieldValue("note")}
                    </Paragraph>
                  </div>

                  <Space style={{ marginTop: 24 }}>
                    <Button
                      type="primary"
                      onClick={handleConfirm}
                      icon={<CheckCircleOutlined />}
                      size="large"
                    >
                      Confirm & Save
                    </Button>
                    <Button
                      onClick={downloadPoster}
                      icon={<DownloadOutlined />}
                      size="large"
                    >
                      Download
                    </Button>
                  </Space>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                  }}
                >
                  <PictureOutlined
                    style={{ fontSize: "48px", color: "#d9d9d9" }}
                  />
                  <Text type="secondary" style={{ marginTop: 16 }}>
                    Preview will appear here
                  </Text>
                </div>
              )}
            </PreviewContainer>
          </Col>
        )}
      </Row>
    </StyledModal>
  );
};

export default PosterModal;
