"use client";
import React, { useState } from 'react';
import { Layout } from 'antd';
import ActionSidebar from './SideBar';

const { Content } = Layout;

export default function LeadLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100%', background: '#ffffff' }}>
      <ActionSidebar 
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      />
      <Layout style={{ background: '#ffffff' }}>
        <Content
          style={{
            margin: '0 24px',
            marginLeft: collapsed ? '80px' : '280px',
            transition: 'all 0.3s ease',
            background: '#ffffff',
            padding: '24px',
            minHeight: 'auto'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
} 