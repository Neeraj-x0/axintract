"use client";
import React, { useState } from 'react';
import { Layout } from 'antd';
import ActionSidebar from '../components/ActionSidebar';

const { Content } = Layout;

export default function EngagementLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ActionSidebar 
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      />
      <Layout>
        <Content
          style={{
            margin: '0 24px',
            padding: '24px',
            minHeight: '100vh',
            marginLeft: collapsed ? '80px' : '280px',
            transition: 'all 0.2s',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
} 