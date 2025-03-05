"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  Flex,
  Descriptions,
  Tag
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
  EnvironmentOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import NotFound from "@/app/not-found";
import { useEngagement } from "../useEngagement";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function EngagementDetails() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("activities");
  
  const { slug } = useParams() ?? {};
  
  console.log('Current slug:', slug); // For debugging

  const {
    engagement,
    isLoading,
    error,
    isNotFound,
  } = useEngagement(slug);

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

  if (!slug) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Error"
          description="No engagement ID provided"
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 148px)",
        backgroundColor: "#ffffff",
      }}
    >
      <Spin size="large" tip="Loading engagement details..." />
    </div>
    );
    }

  if (isNotFound) {
    return <NotFound />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusTag = (status) => {
    if (!status) return <Tag>Unknown</Tag>;
    
    switch(status) {
      case 'Active':
        return <Badge count={status} style={{
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 'normal',
          padding: '0 8px',
        }} />;
      case 'Pending':
        return <Badge count={status} style={{
          backgroundColor: '#faad14',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 'normal',
          padding: '0 8px',
        }} />;
      default:
        return <Badge count={status} style={{
          backgroundColor: '#d9d9d9',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 'normal',
          padding: '0 8px',
        }} />;
    }
  };

  // Sample activity data based on engagement
  const activityData = [
    { 
      id: 1, 
      type: "email",
      title: "Email Sent",
      description: "Follow-up about product specifications",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      user: engagement?.assignee || "Team Member"
    },
    { 
      id: 2, 
      type: "call",
      title: "Call Completed",
      description: "Discussed next steps",
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      user: engagement?.assignee || "Team Member"
    }
  ];

  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
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
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '24px' }}
          />
        )}

        {/* Engagement Details Header */}
        <Card 
          title={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span>Engagement Details</span>
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
              {engagement?.name ? engagement.name.charAt(0) : 'E'}
            </Avatar>
            <div style={{ 
              flex: 1,
              width: isMobile ? '100%' : 'auto',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <Title level={3} style={{ marginTop: 0, marginBottom: '8px' }}>
                {engagement?.name || "Engagement"}
              </Title>
              <Flex 
                wrap="wrap" 
                gap="small" 
                justify={isMobile ? "center" : "start"}
                align="center" 
                style={{ marginBottom: '16px' }}
              >
                {getStatusTag(engagement?.status)}
                <Text type="secondary">{engagement?.category}</Text>
                {engagement?.client && (
                  <>
                    <Text type="secondary">•</Text>
                    <Text type="secondary">{engagement.client}</Text>
                  </>
                )}
              </Flex>
              
              <Row gutter={[16, 16]}>
                {engagement?.assignee && (
                  <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                    <Space>
                      <UserOutlined style={{ color: '#8c8c8c' }} />
                      <Text>Assigned to: {engagement.assignee}</Text>
                    </Space>
                  </Col>
                )}
                {engagement?.client && (
                  <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                    <Space>
                      <BankOutlined style={{ color: '#8c8c8c' }} />
                      <Text>Client: {engagement.client}</Text>
                    </Space>
                  </Col>
                )}
                {engagement?.createdAt && (
                  <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                    <Space>
                      <CalendarOutlined style={{ color: '#8c8c8c' }} />
                      <Text>Created: {formatDate(engagement.createdAt)}</Text>
                    </Space>
                  </Col>
                )}
                {engagement?.lastMessage && (
                  <Col xs={24} sm={isMobile ? 24 : 12} md={8}>
                    <Space>
                      <MessageOutlined style={{ color: '#8c8c8c' }} />
                      <Text>Last Contact: {formatDate(engagement.lastMessage)}</Text>
                    </Space>
                  </Col>
                )}
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
                title="Total Messages"
                value={engagement?.totalMessages || 0}
                prefix={<MessageOutlined style={{ color: '#1890ff' }} />}
              />
              <Progress 
                percent={(engagement?.totalMessages || 0) > 100 ? 100 : (engagement?.totalMessages || 0)} 
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
                value={engagement?.responseRate || 0}
                suffix="%"
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              />
              <Progress 
                percent={engagement?.responseRate || 0} 
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
                title="Avg Response Time"
                value={engagement?.avgResponseTimeHours || 0}
                suffix="h"
                prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
                precision={1}
              />
              <Progress 
                percent={((engagement?.avgResponseTimeHours || 0) / 24) * 100 > 100 ? 100 : ((engagement?.avgResponseTimeHours || 0) / 24) * 100} 
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
            <TabPane tab="Recent Activity" key="activities">
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
            
            <TabPane tab="Engagement Details" key="details">
              <div style={{ padding: '16px' }}>
                <Descriptions 
                  bordered 
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                  style={{ marginBottom: '16px' }}
                >
                  <Descriptions.Item label="Category">{engagement?.category || '-'}</Descriptions.Item>
                  <Descriptions.Item label="Status">{getStatusTag(engagement?.status)}</Descriptions.Item>
                  <Descriptions.Item label="Created">
                    {engagement?.createdAt ? formatDate(engagement.createdAt) : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Contact">
                    {engagement?.lastMessage ? formatDate(engagement.lastMessage) : '-'}
                  </Descriptions.Item>
                  {engagement?.assignee && (
                    <Descriptions.Item label="Assigned To">{engagement.assignee}</Descriptions.Item>
                  )}
                  {engagement?.client && (
                    <Descriptions.Item label="Client">{engagement.client}</Descriptions.Item>
                  )}
                                </Descriptions>

                {engagement?.notes && (
                  <>
                    <Divider orientation="left">Notes</Divider>
                    <p>{engagement.notes}</p>
                  </>
                )}
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
                              Email Sent: Follow-up about project timeline
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
                              Call Completed: Discussed project requirements
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
}