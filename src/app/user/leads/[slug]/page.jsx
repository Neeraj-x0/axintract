"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Space,
  Statistic,
  Progress,
  Row,
  Col,
  Alert,
  Spin,
  Typography,
  Tabs,
  Timeline,
  Button,
  Divider,
  Badge,
  ConfigProvider,
  Flex
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
  EditOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import { useParams } from "next/navigation";
import useAxios from "../../../../lib";
import Axios from "axios";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const LeadManagement = () => {
  const axios = useAxios();
  const [lead, setLead] = useState({
    id: "",
    name: "",
    status: "",
    category: "",
    email: "",
    phone: "",
    company: "",
    createdAt: "2024-12-15T13:45:00Z",
    lastUpdated: "2025-03-01T18:21:00Z",
    source: "Website Contact Form",
    assignedTo: "Alex Johnson"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("activities");
  const [isMobile, setIsMobile] = useState(false);

  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  // Sample data for recent activities
  const activityData = [
    { 
      id: 1, 
      type: "email",
      title: "Email Sent",
      description: "Follow-up about product pricing",
      timestamp: "2025-03-01T16:30:00Z",
      user: "Alex Johnson"
    },
    { 
      id: 2, 
      type: "call",
      title: "Call Completed",
      description: "Discussed product features",
      timestamp: "2025-02-28T14:15:00Z", 
      user: "Alex Johnson"
    },
    { 
      id: 3, 
      type: "meeting",
      title: "Demo Scheduled",
      description: "Product demonstration call",
      timestamp: "2025-03-05T10:00:00Z", 
      user: "Maria Garcia"
    }
  ];

  const taskData = [
    { 
      id: 1, 
      title: "Send pricing proposal",
      dueDate: "2025-03-04T17:00:00Z",
      status: "pending"
    },
    { 
      id: 2, 
      title: "Schedule follow-up call",
      dueDate: "2025-02-28T15:00:00Z",
      status: "completed"
    },
    { 
      id: 3, 
      title: "Prepare demo environment",
      dueDate: "2025-03-04T09:00:00Z",
      status: "pending"
    }
  ];

  // Add responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch this data from the API
        // Simulating API response with timeout
        setTimeout(() => {
          setLead(prevLead => ({
            ...prevLead,
            id: slug || "lead-123456",
            name: "Robert Maxwell",
            status: "Qualified",
            category: "Enterprise",
            email: "robert.maxwell@company.com",
            phone: "+1 (555) 123-4567",
            company: "Maxwell Industries"
          }));
          setIsLoading(false);
        }, 800);
        
      } catch (error) {
        if (Axios.isAxiosError(error) && error.response?.status === 400) {
          setIsNotFound(true);
        } else {
          setError("Failed to fetch data. Please try again.");
        }
        setIsLoading(false);
      }
    };

    initializeData();
  }, [slug, axios]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date("2025-03-02T06:52:05");
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return formatDate(dateString);
    }
  };

  const getStatusTag = (status) => {
    return (
      <Badge
        count={status}
        style={{
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 'normal',
          padding: '0 8px',
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 148px)',
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 148px)',
        padding: '0',
      }}>
        <Alert
          message="Lead Not Found"
          description="The lead you're looking for doesn't exist."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBgContainer: '#ffffff',
          },
          Progress: {
            defaultColor: '#000',
          },
        },
      }}
    >
      <div style={{ background: '#ffffff', padding: '0 8px' }}>
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginBottom: '24px' }} 
          />
        )}

        {/* Lead Details */}
        <Card 
          title={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span>Lead Details</span>
              <Button icon={<EditOutlined />} type="text">Edit</Button>
            </div>
          }
          style={{ 
            marginBottom: '24px', 
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            background: 'transparent'
          }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start', 
            gap: '24px' 
          }}>
            <Avatar 
              size={80} 
              style={{ 
                backgroundColor: '#000', 
                flexShrink: 0,
                marginBottom: isMobile ? '16px' : '0'
              }}
              icon={<UserOutlined />}
            >
              {lead.name.charAt(0)}
            </Avatar>
            <div style={{ 
              flex: 1,
              width: isMobile ? '100%' : 'auto',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <Title level={3} style={{ marginTop: 0, marginBottom: '8px' }}>
                {lead.name}
              </Title>
              <Flex 
                wrap="wrap" 
                gap="small" 
                justify={isMobile ? "center" : "start"}
                align="center" 
                style={{ marginBottom: '16px' }}
              >
                {getStatusTag(lead.status)}
                <Text type="secondary">{lead.category}</Text>
                <Text type="secondary">•</Text>
                <Text type="secondary">{lead.company}</Text>
              </Flex>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                  <Space>
                    <MailOutlined style={{ color: '#8c8c8c' }} />
                    <Text ellipsis>{lead.email}</Text>
                  </Space>
                </Col>
                <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                  <Space>
                    <PhoneOutlined style={{ color: '#8c8c8c' }} />
                    <Text>{lead.phone}</Text>
                  </Space>
                </Col>
                <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                  <Space>
                    <BankOutlined style={{ color: '#8c8c8c' }} />
                    <Text>{lead.company}</Text>
                  </Space>
                </Col>
                <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                  <Space>
                    <CalendarOutlined style={{ color: '#8c8c8c' }} />
                    <Text>Added: {formatDate(lead.createdAt)}</Text>
                  </Space>
                </Col>
                <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                  <Space>
                    <UserOutlined style={{ color: '#8c8c8c' }} />
                    <Text>Assigned: {lead.assignedTo}</Text>
                  </Space>
                </Col>
              </Row>
            </div>
          </div>
        </Card>

        {/* Core Analytics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={24} md={8}>
            <Card 
              style={{ 
                height: '100%', 
                borderColor: '#f0f0f0', 
                background: 'transparent' 
              }}
              styles={{body: {padding: isMobile ? 12 : 16 }}}
            >
              <Statistic
                title="Engagement Score"
                value={85}
                suffix="/100"
              />
              <Progress 
                percent={85} 
                strokeColor="#000" 
                style={{ marginTop: '12px' }} 
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              style={{ 
                height: '100%', 
                borderColor: '#f0f0f0', 
                background: 'transparent' 
              }}
              styles={{body: {padding: "12px" }}}
            >
              <Statistic
                title="Response Rate"
                value={92}
                suffix="%"
              />
              <Progress 
                percent={92} 
                strokeColor="#000" 
                style={{ marginTop: '12px' }} 
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              style={{ 
                height: '100%', 
                borderColor: '#f0f0f0', 
                background: 'transparent' 
              }}
              styles={{body: {padding: "12px" }}}
            >
              <Statistic
                title="Conversion Probability"
                value={78}
                suffix="%"
              />
              <Progress 
                percent={78} 
                strokeColor="#000" 
                style={{ marginTop: '12px' }} 
              />
            </Card>
          </Col>
        </Row>

        {/* Tabs for different sections */}
        <Card 
          style={{ 
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)', 
            borderColor: '#f0f0f0',
            background: 'transparent'
          }}
         styles={{body: {padding: 0 }}}
        >
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ padding: '0 16px' }}
            tabPosition={isMobile ? 'top' : 'top'}
            size={isMobile ? 'small' : 'middle'}
          >
            <TabPane tab="Recent Activities" key="activities">
              <div style={{ padding: '16px 8px' }}>
                <Timeline
                  items={activityData.map(item => ({
                    color: 'black',
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    children: (
                      <div>
                        <Flex wrap="wrap" gap="small" align="baseline">
                          <Text strong>{item.title}</Text>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {getTimeAgo(item.timestamp)}
                          </Text>
                        </Flex>
                        <div style={{ marginTop: '4px' }}>
                          <Text>{item.description}</Text>
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>by {item.user}</Text>
                        </div>
                      </div>
                    ),
                  }))}
                />
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Button type="text">View All Activities</Button>
                </div>
              </div>
            </TabPane>
            
            <TabPane tab="Pending Tasks" key="tasks">
              <div style={{ padding: '16px 0' }}>
                {taskData.map(task => (
                  <div 
                    key={task.id} 
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #f0f0f0',
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: 'space-between',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      gap: isMobile ? '8px' : '0'
                    }}
                  >
                    <Space align="center">
                      <Badge status={task.status === 'completed' ? 'success' : 'processing'} />
                      <Text style={{ 
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                        wordBreak: 'break-word'
                      }}>
                        {task.title}
                      </Text>
                    </Space>
                    <Text type="secondary">{formatDate(task.dueDate)}</Text>
                  </div>
                ))}
                <div style={{ textAlign: 'center', marginTop: '16px', padding: '0 0 8px' }}>
                  <Button type="text">View All Tasks</Button>
                </div>
              </div>
            </TabPane>
            
            <TabPane tab="Communication" key="communication">
              <div style={{ padding: '16px' }}>
                <Flex 
                  gap="small" 
                  wrap="wrap"
                  style={{ marginBottom: '16px' }}
                >
                  <Button icon={<MessageOutlined />}>Send Message</Button>
                  <Button icon={<MailOutlined />}>Send Email</Button>
                  <Button icon={<FileTextOutlined />}>Add Note</Button>
                </Flex>
                
                <Divider plain style={{ margin: '16px 0' }}>Recent Communications</Divider>
                
                <Timeline
                  style={{ padding: '8px 0 0' }}
                  items={[
                    {
                      color: 'black',
                      dot: <MailOutlined />,
                      children: (
                        <div>
                          <Flex wrap="wrap" gap="small" align="baseline">
                            <Text strong style={{ wordBreak: 'break-word' }}>
                              Email Sent: Follow-up about product pricing
                            </Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              Yesterday
                            </Text>
                          </Flex>
                        </div>
                      ),
                    },
                    {
                      color: 'black',
                      dot: <PhoneOutlined />,
                      children: (
                        <div>
                          <Flex wrap="wrap" gap="small" align="baseline">
                            <Text strong style={{ wordBreak: 'break-word' }}>
                              Call Completed: Discussed product features
                            </Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              3 days ago
                            </Text>
                          </Flex>
                        </div>
                      ),
                    },
                  ]}
                />
                
                <div style={{ textAlign: 'center', marginTop: '16px', padding: '8px 0 0' }}>
                  <Button type="text">View All Communications</Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
      
      <style jsx global>{`
        .ant-tabs-nav {
          margin-bottom: 0 !important;
          background: transparent !important;
        }
        .ant-card {
          background: transparent !important;
        }
        .ant-card-head {
          border-bottom-color: #f0f0f0 !important;
          padding: 0 16px !important;
          background: transparent !important;
        }
        .ant-card-body {
          padding: 16px !important;
          background: transparent !important;
        }
        .ant-statistic-title {
          font-size: 14px !important;
          margin-bottom: 8px !important;
        }
        .ant-tabs-content {
          background: transparent !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .ant-card-head-title {
            font-size: 16px !important;
          }
          .ant-tabs-tab {
            padding: 8px 12px !important;
          }
          .ant-statistic-content {
            font-size: 24px !important;
          }
          .ant-card-body {
            padding: 12px !important;
          }
          .ant-space {
            flex-wrap: wrap;
          }
          .ant-space-item {
            margin-right: 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          .ant-tabs-tab {
            padding: 6px 10px !important;
            font-size: 14px !important;
          }
          .ant-card-head {
            padding: 0 12px !important;
            min-height: 40px !important;
          }
          .ant-timeline-item-content {
            font-size: 14px !important;
          }
        }
      `}</style>
    </ConfigProvider>
  );
};

export default LeadManagement;