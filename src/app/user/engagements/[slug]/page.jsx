"use client";
import React from "react";
import { useParams } from "next/navigation";
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Spin, 
  Alert, 
  Statistic, 
  Descriptions, 
  Tag, 
  Divider,
  Space
} from "antd";
import { 
  MessageOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
} from "@ant-design/icons";
import NotFound from "@/app/not-found";
import { useEngagement } from "../hooks/useEngagement";

const { Title, Text } = Typography;

export default function EngagementDetails() {
  const { slug } = useParams() ?? {};
  
  console.log('Current slug:', slug); // For debugging

  const {
    engagement,
    isLoading,
    error,
    isNotFound,
  } = useEngagement(slug);

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading engagement details..." />
      </div>
    );
  }

  if (isNotFound) {
    return <NotFound />;
  }

  const getStatusTag = (status) => {
    switch(status) {
      case 'Active':
        return <Tag color="success">Active</Tag>;
      case 'Pending':
        return <Tag color="warning">Pending</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header Section */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>{engagement?.name}</Title>
            <Space size={12} style={{ marginTop: 8 }}>
              {engagement?.category && (
                <Tag color="blue" style={{ marginRight: 0 }}>
                  {engagement.category}
                </Tag>
              )}
              {getStatusTag(engagement?.status)}
              {engagement?.createdAt && (
                <Text type="secondary">
                  Created on {new Date(engagement.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              )}
            </Space>
          </Col>
        </Row>

        {/* Analytics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Statistic
                title="Total Messages"
                value={engagement?.totalMessages || 0}
                prefix={<MessageOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Statistic
                title="Response Rate"
                value={engagement?.responseRate || 0}
                suffix="%"
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Statistic
                title="Avg Response Time"
                value={engagement?.avgResponseTimeHours || 0}
                suffix="h"
                prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
                valueStyle={{ color: '#722ed1' }}
                precision={1}
              />
            </Card>
          </Col>
        </Row>

        {/* Engagement Details Card */}
        <Card 
          title={<Title level={4} style={{ margin: 0 }}>Engagement Details</Title>}
          bordered={false}
        >
          <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item label="Category">{engagement?.category || '-'}</Descriptions.Item>
            <Descriptions.Item label="Status">{getStatusTag(engagement?.status)}</Descriptions.Item>
            <Descriptions.Item label="Created">
              {engagement?.createdAt ? new Date(engagement.createdAt).toLocaleDateString() : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Last Contact">
              {engagement?.lastMessage ? new Date(engagement.lastMessage).toLocaleDateString() : '-'}
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
        </Card>

        {/* Activity Section */}
        {engagement?.activities && engagement.activities.length > 0 && (
          <Card 
            title={<Title level={4} style={{ margin: 0 }}>Recent Activity</Title>}
            bordered={false}
            style={{ marginTop: 24 }}
          >
            {/* Activity timeline could be added here */}
          </Card>
        )}
      </div>
    </div>
  );
}