"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Spin,
  Typography,
  Space,
  message,
  Tooltip,
} from "antd";
import {
  MessageOutlined,
  SaveOutlined,
  SyncOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import usAxios from "../lib";
import styled from "@emotion/styled";

const { TextArea } = Input;
const { Title, Text } = Typography;

// Styled Components for better responsiveness
const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: none;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .ant-card-body {
    padding: 24px;
    
    @media (max-width: 576px) {
      padding: 16px;
    }
  }
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    margin-bottom: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  
  svg {
    margin-right: 8px;
    font-size: 18px;
    color: #1890ff;
  }
  
  .ant-typography {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

const HeaderRight = styled.div`
  @media (max-width: 576px) {
    width: 100%;
    margin-top: 8px;
    
    .ant-typography {
      font-size: 12px;
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    width: 100%;
    gap: 12px;
    
    .ant-btn {
      width: 100%;
    }
    
    .ant-space {
      width: 100%;
      flex-direction: column;
    }
    
    .ant-space-item {
      width: 100%;
      margin-right: 0 !important;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  
  .ant-spin {
    margin-bottom: 16px;
  }
`;

const SystemPromptForm = () => {
  const axios = usAxios();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Enhanced message feedback
  const showMessage = (type, content) => {
    messageApi[type]({
      content,
      duration: 3,
      style: {
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    });
  };

  // Fetch current system prompt
  const fetchCurrentPrompt = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/chatbot/prompt");
      const data = response.data;
      form.setFieldsValue({ prompt: data });
      showMessage('success', 'Prompt refreshed successfully');
    } catch (error) {
      console.error("Failed to fetch prompt:", error);
      showMessage('error', 'Failed to fetch prompt');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPrompt();
  }, []);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      await axios.post("/api/chatbot/prompt", { prompt: values.prompt });
      await fetchCurrentPrompt(); // Refresh data after update
      showMessage('success', 'System prompt updated successfully');
    } catch (error) {
      console.error("Failed to update prompt:", error);
      showMessage('error', 'Failed to update system prompt');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !form.getFieldValue("prompt")) {
    return (
      <LoadingContainer>
        <Spin size="large" />
        <Text type="secondary">Loading system prompt...</Text>
      </LoadingContainer>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {contextHolder}
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          variant="outlined"
          className="space-y-6"
        >
          <FormHeader>

            <HeaderRight>
              <Space align="center">
                <InfoCircleOutlined />
                <Text type="secondary" className=" sm:inline text-sm">
                  Define how your AI assistant will behave and respond
                </Text>
              </Space>
            </HeaderRight>
          </FormHeader>
          
          <div className="mb-4">
            <Text type="secondary">
              This prompt will set the behavior, tone, and capabilities of your chatbot.
              Be specific about what your chatbot should and shouldn't do.
            </Text>
          </div>
          
          <Form.Item
            name="prompt"
            rules={[
              {
                required: true,
                message: "Please enter the system prompt",
              },
            ]}
          >
            <TextArea
              placeholder="Enter the system prompt that defines your chatbot's behavior..."
              autoSize={{ minRows: 8, maxRows: 20 }}
              className="resize-none rounded-lg"
              disabled={loading || saving}
              showCount
              maxLength={4000}
            />
          </Form.Item>

          <FormActions>
            <Space direction="horizontal" size="middle">
              <Tooltip title="Reload the current prompt from the server">
                <Button
                  icon={<SyncOutlined spin={loading} />}
                  onClick={fetchCurrentPrompt}
                  disabled={loading || saving}

                  className="rounded-lg"
                >
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </Tooltip>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
                htmlType="submit"
                loading={saving}
                disabled={loading}
                className="rounded-lg bg-black hover:bg-gray-800"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Space>
          </FormActions>
        </Form>
    </div>
  );
};

export default SystemPromptForm;