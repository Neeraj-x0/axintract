import React, { useState, useMemo } from "react";
import { 
  Form, 
  Input, 
  Button, 
  Upload, 
  Space, 
  Typography, 
  Card, 
  message, 
  Alert,
  Modal,
  Progress,
  Row,
  Col,
  theme
} from "antd";
import { 
  SendOutlined, 
  PictureOutlined,
  CheckCircleFilled,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

const PosterGenerator = ({ onGenerate }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  
  const [state, setState] = useState({
    title: "Celebrate the Festival of Lights",
    note: "Wishing you prosperity and positivity!",
    iconFile: null,
    backgroundFile: null,
    iconFileList: [],
    backgroundFileList: [],
    isGenerating: false,
    generationProgress: 0,
    error: null,
    previewUrl: null,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  });

  const deviceType = useMemo(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      return width <= 768 ? 'mobile' : width <= 992 ? 'tablet' : 'desktop';
    };

    return checkDeviceType();
  }, [window.innerWidth]);

  const updateState = (newState) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const handleGeneratePoster = async (values) => {
    const { iconFile } = state;
    
    if (!iconFile) {
      updateState({ error: "Please upload an icon image" });
      return;
    }

    updateState({ 
      isGenerating: true, 
      error: null, 
      generationProgress: 5 
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const previewUrl = URL.createObjectURL(iconFile);
      
      updateState({ previewUrl });

      if (onGenerate && typeof onGenerate === 'function') {
        const posterData = {
          imageUrl: previewUrl,
          title: values.title || state.title,
          note: values.note || state.note,
          timestamp: new Date().toISOString()
        };
        
        onGenerate(posterData);
        message.success({
          content: "Poster generated successfully!",
          icon: <CheckCircleFilled style={{ color: token.colorSuccess }} />
        });
      }
    } catch (err) {
      console.error("Error generating poster:", err);
      updateState({ error: "Failed to generate poster. Please try again." });
    } finally {
      updateState({ 
        isGenerating: false, 
        generationProgress: 0 
      });
    }
  };

  const handleFileUpload = (type, { fileList }) => {
    updateState({
      [`${type}FileList`]: fileList,
      [`${type}File`]: fileList.length > 0 ? fileList[0].originFileObj : null
    });
  };

  const uploadProps = {
    beforeUpload: () => false,
    accept: "image/*",
    listType: "picture-card",
  };

  return (
    <Card 
      bordered={false}
      style={{ 
        background: token.colorBgContainer, 
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        overflow: "hidden"
      }}
      bodyStyle={{ 
        padding: deviceType === 'mobile' ? "16px" : "24px",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: state.title, note: state.note }}
        onFinish={handleGeneratePoster}
        requiredMark={false}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={state.previewUrl ? 12 : 24}>
            <div style={{ marginBottom: deviceType === 'mobile' ? "12px" : "16px" }}>
              <Title level={deviceType === 'mobile' ? 4 : 3} style={{ marginBottom: "8px", color: token.colorText }}>
                Create Your Poster
              </Title>
              <Paragraph type="secondary" style={{ marginBottom: "16px" }}>
                Upload an image and customize your poster.
              </Paragraph>
            </div>
            
            {state.error && (
              <Alert
                message={state.error}
                type="error"
                showIcon
                style={{ marginBottom: "16px", borderRadius: token.borderRadius }}
              />
            )}

            <Form.Item
              label={<Text strong>Poster Title</Text>}
              name="title"
              initialValue={state.title}
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input
                placeholder="Enter a captivating title"
                onChange={(e) => updateState({ title: e.target.value.substring(0, 75) })}
                maxLength={75}
                style={{ borderRadius: token.borderRadius }}
                suffix={
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {state.title.length}/75
                  </Text>
                }
              />
            </Form.Item>

            <Form.Item
              label={<Text strong>Message</Text>}
              name="note"
              initialValue={state.note}
            >
              <TextArea
                placeholder="Add a personalised message"
                onChange={(e) => updateState({ note: e.target.value.substring(0, 200) })}
                autoSize={{ minRows: 2, maxRows: 4 }}
                maxLength={200}
                style={{ borderRadius: token.borderRadius }}
                showCount
              />
            </Form.Item>

            <Form.Item
              label={<Text strong>Main Icon</Text>}
              required
              tooltip="This will be the main focus of your poster"
            >
              <Upload
                {...uploadProps}
                fileList={state.iconFileList}
                onChange={(info) => handleFileUpload('icon', info)}
              >
                {state.iconFileList.length >= 1 ? null : (
                  <div style={{ 
                    padding: "12px", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: token.colorTextSecondary
                  }}>
                    <PictureOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
                    <div>Upload Icon</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item style={{ marginTop: "16px" }}>
              <Space size={12} style={{ width: "100%", justifyContent: deviceType === 'mobile' ? "center" : "flex-start" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  loading={state.isGenerating}
                  disabled={!state.iconFile || state.isGenerating}
                  style={{ 
                    borderRadius: token.borderRadius,
                    minWidth: "120px",
                  }}
                >
                  {state.isGenerating ? "Generating..." : "Generate Poster"}
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    updateState({
                      iconFileList: [],
                      backgroundFileList: [],
                      iconFile: null,
                      backgroundFile: null,
                      previewUrl: null,
                      error: null
                    });
                  }}
                  style={{ borderRadius: token.borderRadius }}
                  disabled={state.isGenerating}
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
            
            {state.isGenerating && (
              <div style={{ marginTop: "16px" }}>
                <Progress 
                  percent={state.generationProgress} 
                  status="active" 
                  strokeColor={{
                    from: token.colorPrimaryActive,
                    to: token.colorPrimary,
                  }} 
                  style={{ borderRadius: token.borderRadius }}
                />
                <Text type="secondary" style={{ display: "block", textAlign: "center", marginTop: "8px" }}>
                  Processing and generating your poster...
                </Text>
              </div>
            )}
          </Col>
          
          {state.previewUrl && (
            <Col xs={24} md={12}>
              <Card 
                bordered 
                style={{ 
                  borderRadius: token.borderRadiusLG,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: `1px dashed ${token.colorPrimary}`,
                  backgroundColor: token.colorBgContainerDisabled,
                  position: "relative"
                }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  flex: 1
                }}
              >
                <Text 
                  type="secondary" 
                  style={{ 
                    position: "absolute", 
                    top: "10px", 
                    left: "12px", 
                    fontSize: "12px",
                    fontWeight: "500",
                    padding: "4px 8px",
                    background: "rgba(0,0,0,0.05)",
                    borderRadius: "4px"
                  }}
                >
                  Preview
                </Text>
                
                <div style={{ textAlign: "center", width: "100%", maxWidth: "100%" }}>
                  <img
                    src={state.previewUrl}
                    alt="Poster Preview"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: token.borderRadiusLG,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      marginBottom: "16px"
                    }}
                  />
                  
                  <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <Title level={4} style={{ margin: "0 0 4px 0" }}>
                      {state.title}
                    </Title>
                    {state.note && (
                      <Paragraph 
                        style={{ 
                          margin: 0, 
                          color: token.colorTextSecondary,
                          fontSize: "14px"
                        }}
                      >
                        {state.note}
                      </Paragraph>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </Form>
    </Card>
  );
};

export default PosterGenerator;