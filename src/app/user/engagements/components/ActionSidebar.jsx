import React from 'react';
import { Layout, Menu, Button, Divider } from 'antd';
import {
  PhoneOutlined,
  WhatsAppOutlined,
  MailOutlined,
  BellOutlined,
  CheckSquareOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  ExportOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const ActionSidebar = ({ collapsed, onCollapse }) => {
  const actionItems = [
    {
      key: 'communication',
      label: 'Communication',
      type: 'group',
      children: [
        {
          key: 'schedule-call',
          icon: <PhoneOutlined />,
          label: 'Schedule Call',
        },
        {
          key: 'whatsapp',
          icon: <WhatsAppOutlined />,
          label: 'WhatsApp',
        },
        {
          key: 'send-email',
          icon: <MailOutlined />,
          label: 'Send Email',
        },
      ],
    },
    {
      key: 'management',
      label: 'Management',
      type: 'group',
      children: [
        {
          key: 'add-reminder',
          icon: <BellOutlined />,
          label: 'Add Reminder',
        },
        {
          key: 'actions-tasks',
          icon: <CheckSquareOutlined />,
          label: 'Actions & Tasks',
        },
      ],
    },
    {
      key: 'sales',
      label: 'Sales',
      type: 'group',
      children: [
        {
          key: 'schedule-demo',
          icon: <VideoCameraOutlined />,
          label: 'Schedule Demo',
        },
        {
          key: 'send-proposal',
          icon: <FileTextOutlined />,
          label: 'Send Proposal',
        },
        {
          key: 'send-invoice',
          icon: <DollarOutlined />,
          label: 'Send Invoice',
        },
      ],
    },
    {
      key: 'other',
      label: 'Other',
      type: 'group',
      children: [
        {
          key: 'assign-team',
          icon: <TeamOutlined />,
          label: 'Assign Team',
        },
        {
          key: 'view-analytics',
          icon: <BarChartOutlined />,
          label: 'View Analytics',
        },
        {
          key: 'export-data',
          icon: <ExportOutlined />,
          label: 'Export Data',
        },
      ],
    },
  ];

  return (
    <Sider
      width={280}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      style={{
        borderRight: '1px solid #f0f0f0',
        height: 'calc(100vh - 64px)',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        zIndex: 999
      }}
    >
      <div style={{ padding: '16px' }}>
        <Button type="primary" block style={{ marginBottom: '16px', backgroundColor: '#000000', borderColor: '#000000' }}>
          Quick Actions
        </Button>
      </div>
      <Menu
        mode="inline"
        style={{ borderRight: 'none' }}
        items={actionItems}
        onClick={({ key }) => console.log('Clicked:', key)}
      />
    </Sider>
  );
};

export default ActionSidebar; 