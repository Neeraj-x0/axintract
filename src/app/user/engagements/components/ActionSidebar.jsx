import React, { useState } from "react";
import { Layout, Menu, Divider, Typography, Space, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setActiveKey } from "../../../../redux/features/sidebarSlice";
import {
  WhatsAppOutlined,
  MailOutlined,
  BellOutlined,
  HomeOutlined,
  CheckSquareOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { Text, Title } = Typography;

const ActionSidebar = ({ collapsed, onCollapse }) => {
  const activeKey = useSelector((state) => state.sidebar.activeKey);
  const dispatch = useDispatch();

  const handleClick = (key) => {
    dispatch(setActiveKey(key));
  };

  // Main menu items with categories
  const actionItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      type: "divider",
    },
    {
      key: "communication",
      label: "COMMUNICATION",
      type: "group",
      children: [
        {
          key: "whatsapp",
          icon: <WhatsAppOutlined />,
          label: (
            <Space>
              <span>WhatsApp</span>
              {!collapsed && <Badge count={3} size="small" />}
            </Space>
          ),
        },
        {
          key: "email",
          icon: <MailOutlined />,
          label: "Send Email",
        },
      ],
    },
    {
      key: "management",
      label: "MANAGEMENT",
      type: "group",
      children: [
        {
          key: "add-reminder",
          icon: <BellOutlined />,
          label: (
            <Space>
              <span>Add Reminder</span>
              {!collapsed && <Badge count={2} size="small" />}
            </Space>
          ),
        },
        {
          key: "actions-tasks",
          icon: <CheckSquareOutlined />,
          label: "Actions & Tasks",
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
        borderRight: "1px solid #f0f0f0",
        height: "calc(100vh - 64px)",
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 0,
        overflowY: "auto",
        backgroundColor: "#ffffff",
        zIndex: 999,
        boxShadow: "1px 0 5px rgba(0, 0, 0, 0.03)",
      }}
      trigger={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "48px",
            transition: "all 0.3s ease",
          }}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>
      }
    >
      <Divider
        style={{
          margin: collapsed ? "8px 0" : "4px 0",
          transition: "margin 0.3s ease",
        }}
      />

      {/* Main navigation menu */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        minHeight: 0,
      }}>
        <Menu
          mode="inline"
          style={{
            borderRight: "none",
            padding: collapsed ? "8px 0" : "8px 0 24px 0",
            transition: "padding 0.3s ease",
          }}
          selectedKeys={[activeKey]}
          items={actionItems}
          onClick={({ key }) => handleClick(key)}
          defaultOpenKeys={collapsed ? [] : ["communication"]}
        />
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        /* Custom styling for menu items */
        .ant-menu-item-group-title {
          color: #8c8c8c !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          letter-spacing: 0.5px !important;
          padding: 16px 16px 8px !important;
        }

        .ant-menu-inline .ant-menu-item {
          height: 40px !important;
          line-height: 40px !important;
          margin-bottom: 4px !important;
          margin-top: 4px !important;
          width: calc(100% - 16px) !important;
          margin-left: 8px !important;
          border-radius: 4px !important;
        }

        .ant-menu-inline .ant-menu-item:hover {
          background-color: #fafafa !important;
        }

        .ant-menu-item-selected {
          background-color: rgba(0, 0, 0, 0.04) !important;
          color: #000000 !important;
        }

        .ant-menu-inline .ant-menu-item::after {
          border-right: 3px solid #000000 !important;
          transition: transform 0.3s ease !important;
        }

        /* Smooth transition for collapsing */
        .ant-layout-sider {
          transition: all 0.3s ease !important;
        }

        .ant-layout-sider-children {
          transition: all 0.3s ease !important;
        }

        .ant-menu {
          transition: all 0.3s ease !important;
        }

        .ant-menu-item {
          transition: all 0.3s ease !important;
        }

        .ant-layout-sider-trigger {
          transition: all 0.3s ease !important;
        }

        .ant-layout-sider-collapsed {
          transition: all 0.3s ease !important;
        }

        .ant-menu-inline-collapsed {
          transition: all 0.3s ease !important;
        }
      `}</style>
    </Sider>
  );
};

export default ActionSidebar;
