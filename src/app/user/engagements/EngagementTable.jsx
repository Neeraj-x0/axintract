import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Checkbox,
  Badge,
  Avatar,
  Tooltip,
  Tag,
  Space,
  Button,
  Typography,
  List,
  Drawer,
  Divider,
  Grid,
} from "antd";
import {
  EyeOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  UserOutlined,
  InfoCircleOutlined,
  TagOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import Link from "next/link";

const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const EngagementTable = ({
  engagements,
  selectedIds,
  onSelectAll,
  onSelectOne,
  isAllSelected,
  selectedLeadIds,
  loading = false,
}) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedEngagement, setSelectedEngagement] = useState(null);
  const screens = useBreakpoint();
  
  // Determine if we're in mobile view
  const isMobileView = useMemo(() => !screens.md, [screens.md]);
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
 
  // Fix for the selection handler
  const handleChange = (e) => {
    // This prevents event propagation to avoid interfering with row click
    e.stopPropagation();
    onSelectAll(e.target.checked);
  };
  
  // Handler for single item selection
  const handleSelectOne = (id, e) => {
    if (e) e.stopPropagation();
    onSelectOne(id);
  };
  
  const showEngagementDetail = (record, e) => {
    if (e) e.stopPropagation();
    setSelectedEngagement(record);
    setDetailVisible(true);
  };

  // Utility functions for rendering components
  const utils = {
    // Status styling configuration
    getStatusConfig: (status) => {
      const configs = {
        Active: {
          color: "#059669",
          bg: "rgba(5, 150, 105, 0.08)",
          icon: <Badge status="success" />,
          text: "#065F46",
        },
        Pending: {
          color: "#D97706",
          bg: "rgba(217, 119, 6, 0.08)",
          icon: <Badge status="warning" />,
          text: "#92400E",
        },
        Closed: {
          color: "#4B5563",
          bg: "rgba(75, 85, 99, 0.08)",
          icon: <Badge status="default" />,
          text: "#1F2937",
        },
      };
      return (
        configs[status] || {
          color: "#6B7280",
          bg: "rgba(107, 114, 128, 0.08)",
          icon: <Badge status="processing" />,
          text: "#374151",
        }
      );
    },

    // Category color mapping
    getCategoryColor: (category) => {
      const colors = {
        Sales: "#3B82F6",
        Marketing: "#8B5CF6",
        Support: "#EC4899",
        Technical: "#10B981",
        Financial: "#F59E0B",
        Legal: "#6366F1",
        Operations: "#EF4444",
      };
      return colors[category] || "#6B7280";
    },

    // Format time ago
    timeAgo: (dateString) => {
      if (!dateString) return "No activity";

      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours === 0) {
          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          return `${diffMinutes} min${diffMinutes !== 1 ? "s" : ""} ago`;
        }
        return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ago`;
      } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    // Response metrics (simplified)
    getResponseMetrics: (record) => {
      if (!record.totalMessages || record.totalMessages === 0) return null;

      const avg = record.avgResponseTimeHours || Math.random() * 24;

      if (avg < 1) {
        return { value: Math.round(avg * 60), unit: "min", color: "#10B981" };
      } else if (avg < 4) {
        return { value: Math.round(avg), unit: "hrs", color: "#3B82F6" };
      } else if (avg < 24) {
        return { value: Math.round(avg), unit: "hrs", color: "#F59E0B" };
      } else {
        return { value: Math.round(avg / 24), unit: "days", color: "#EF4444" };
      }
    },

    // Format name initials for avatar
    getInitials: (name) => {
      if (!name) return "";
      return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    },

    // Generate random color for avatar based on name
    getAvatarColor: (name) => {
      if (!name) return "#1677ff";
      const colors = [
        "#1677ff",
        "#52c41a",
        "#faad14",
        "#eb2f96",
        "#722ed1",
        "#13c2c2",
        "#fa541c",
        "#2f54eb",
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    },
  };

  const columns = [
    {
      title: (
        <div className="flex justify-center items-center w-full">
          <Checkbox 
            checked={isAllSelected} 
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()} // Prevent row click event
          />
        </div>
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: 60,
      fixed: windowWidth <= 768 ? false : "left",
      render: (_, record) => (
        <div className="flex justify-center items-center">
          <Checkbox
            checked={selectedLeadIds?.includes(record.id || record._id)}
            onChange={(e) => handleSelectOne(record.id || record._id, e)}
            onClick={(e) => e.stopPropagation()} // Prevent row click event
          />
        </div>
      ),
    },
    {
      title: "Engagement",
      dataIndex: "name",
      key: "name",
      fixed: windowWidth <= 768 ? false : "left",
      width: windowWidth <= 640 ? 200 : 240,
      render: (name, record) => (
        <Space size={12}>
          <Avatar
            style={{ backgroundColor: utils.getAvatarColor(name) }}
            icon={!name ? <UserOutlined /> : null}
            size={windowWidth <= 640 ? 32 : 36}
          >
            {name ? utils.getInitials(name) : null}
          </Avatar>
          <Space direction="vertical" size={0}>
            <Text strong style={{ fontSize: windowWidth <= 640 ? '13px' : '14px' }}>{name || "Untitled"}</Text>
            <Text type="secondary" style={{ fontSize: windowWidth <= 640 ? '11px' : '12px' }}>
              {record.description || "No description"}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: windowWidth <= 640 ? 120 : 150,
      render: (status) => {
        const config = utils.getStatusConfig(status);
        return (
          <Badge
            status={config.icon.props.status}
            text={<Text style={{ fontWeight: 500, fontSize: windowWidth <= 640 ? '13px' : '14px' }}>{status || "Unknown"}</Text>}
          />
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      responsive: ['md'],
      render: (category) => (
        <Tag color={utils.getCategoryColor(category)}>{category || "Uncategorized"}</Tag>
      ),
    },
    {
      title: "Communication",
      dataIndex: "totalMessages",
      key: "communication",
      width: 200,
      responsive: ['lg'],
      render: (_, record) => {
        const metrics = utils.getResponseMetrics(record);
        return (
          <Space direction="vertical" size={4}>
            <Space>
              <MessageOutlined style={{ color: "#8c8c8c" }} />
              <Text strong>{record.totalMessages || 0}</Text>
              <Text type="secondary">messages</Text>
            </Space>
            {metrics && (
              <Space>
                <Text type="secondary">Response:</Text>
                <Text strong style={{ color: metrics.color }}>
                  {metrics.value} {metrics.unit}
                </Text>
              </Space>
            )}
          </Space>
        );
      },
    },
    {
      title: "Last Contact",
      dataIndex: "lastContactDate",
      key: "lastContact",
      width: 150,
      responsive: ['xl'],
      render: (date) => (
          <Space>
          <ClockCircleOutlined style={{ color: "#8c8c8c" }} />
            <Text>{utils.timeAgo(date)}</Text>
          </Space>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 200,
      responsive: ['xl'],
      ellipsis: true,
      render: (notes) => (
        <Tooltip title={notes || "No notes"}>
          <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
            {notes || "No notes"}
          </Paragraph>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: windowWidth <= 768 ? false : "right",
      width: 120,
      render: (_, record) => (
        <Space>
          {isMobileView ? null : (
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                showEngagementDetail(record, e);
              }}
            />
          )}
          <Link 
            href={`/user/engagements/${record.id || record._id}`}
            onClick={(e) => e.stopPropagation()} // Prevent row click event
          >
            <Button
              type="text"
              icon={<EyeOutlined />}
            >
              View
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Render mobile list view
  const renderMobileList = () => {
    if (!isMobileView) return null;
    
    return (
      <List
        className="engagement-mobile-list"
        itemLayout="horizontal"
        dataSource={engagements}
        loading={loading}
        renderItem={(engagement) => (
          <List.Item 
            className={selectedLeadIds?.includes(engagement.id || engagement._id) ? "mobile-list-item-selected" : ""}
            actions={[
              <Link 
                key="view" 
                href={`/user/engagements/${engagement.id || engagement._id}`}
              >
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  size="small"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderColor: "#cdd0cf",
                    padding: "10px 10px",
                  }}
                >
                  View
                </Button>
              </Link>,
              <Button
                key="info"
                icon={<InfoCircleOutlined />}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  showEngagementDetail(engagement, e);
                }}
              />
            ]}
          >
            <List.Item.Meta
              avatar={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={selectedLeadIds?.includes(engagement.id || engagement._id)}
                    onChange={(e) => handleSelectOne(engagement.id || engagement._id, e)}
                    onClick={(e) => e.stopPropagation()}
                    style={{ marginRight: 12 }}
                  />
                  <Avatar
                    style={{ backgroundColor: utils.getAvatarColor(engagement.name) }}
                    icon={!engagement.name ? <UserOutlined /> : null}
                  >
                    {engagement.name ? utils.getInitials(engagement.name) : null}
                  </Avatar>
                </div>
              }
              title={
                <div>
                  <Text strong>{engagement.name || "Untitled"}</Text>
                  <div style={{ marginTop: 4 }}>
                    {engagement.status && (
                      <Badge
                        status={utils.getStatusConfig(engagement.status).icon.props.status}
                        text={<Text style={{ fontWeight: 500, fontSize: 12 }}>{engagement.status}</Text>}
                      />
                    )}
                    {engagement.category && (
                      <Tag 
                        color={utils.getCategoryColor(engagement.category)}
                        style={{ marginLeft: 8 }}
                      >
                        {engagement.category}
                      </Tag>
                    )}
                  </div>
                </div>
              }
              description={
                <Space direction="vertical" size={2} style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {engagement.description || "No description"}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {utils.timeAgo(engagement.lastContactDate)}
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  // Mobile engagement details drawer
  const renderEngagementDetailDrawer = () => {
    if (!selectedEngagement) return null;
    
    const metrics = utils.getResponseMetrics(selectedEngagement);
    const engagementId = selectedEngagement.id || selectedEngagement._id;
    
    return (
      <Drawer
        title={
          <div style={{ fontSize: '18px', fontWeight: 600 }}>
            Engagement Details
          </div>
        }
        placement="right"
        onClose={() => setDetailVisible(false)}
        open={detailVisible}
        width={isMobileView ? "100%" : 400}
      >
        <div className="engagement-detail-container">
          <div className="flex items-center mb-4">
            <Avatar
              size={64}
              style={{ backgroundColor: utils.getAvatarColor(selectedEngagement.name) }}
              icon={!selectedEngagement.name ? <UserOutlined /> : null}
            >
              {selectedEngagement.name ? utils.getInitials(selectedEngagement.name) : null}
            </Avatar>
            <div className="ml-4">
              <Text strong style={{ fontSize: '18px', display: 'block' }}>
                {selectedEngagement.name || "Untitled Engagement"}
              </Text>
              {selectedEngagement.status && (
                <Badge
                  status={utils.getStatusConfig(selectedEngagement.status).icon.props.status}
                  text={selectedEngagement.status}
                  style={{ fontSize: '14px' }}
                />
              )}
            </div>
          </div>
          
          <Divider style={{ margin: '16px 0' }} />
          
          <div className="engagement-info-section">
            <h4 className="section-title">General Information</h4>
            
            <div className="info-item">
              <TagOutlined style={{ color: '#8c8c8c', marginRight: 8 }} />
              <Text>Category: </Text>
              {selectedEngagement.category ? (
                <Tag color={utils.getCategoryColor(selectedEngagement.category)}>
                  {selectedEngagement.category}
                </Tag>
              ) : (
                <Text type="secondary">Not assigned</Text>
              )}
            </div>
            
            <div className="info-item">
              <ClockCircleOutlined style={{ color: '#8c8c8c', marginRight: 8 }} />
              <Text>Last Contact: {utils.timeAgo(selectedEngagement.lastContactDate)}</Text>
            </div>
            
            <Divider style={{ margin: '16px 0' }} />
            
            <h4 className="section-title">Communication</h4>
            <div className="info-item">
              <MessageOutlined style={{ color: '#8c8c8c', marginRight: 8 }} />
              <Text>{selectedEngagement.totalMessages || 0} total messages</Text>
            </div>
            
            {metrics && (
              <div className="info-item">
                <InfoCircleOutlined style={{ color: '#8c8c8c', marginRight: 8 }} />
                <Text>Average response time: </Text>
                <Text 
                  strong 
                  style={{ 
                    color: metrics.color 
                  }}
                >
                  {metrics.value} {metrics.unit}
                </Text>
              </div>
            )}
            
            <Divider style={{ margin: '16px 0' }} />
            
            <h4 className="section-title">Description</h4>
            <Paragraph style={{ whiteSpace: 'pre-line' }}>
              {selectedEngagement.description || "No description available."}
            </Paragraph>
            
            <Divider style={{ margin: '16px 0' }} />
            
            <h4 className="section-title">Notes</h4>
            <Paragraph style={{ whiteSpace: 'pre-line' }}>
              {selectedEngagement.notes || "No notes available for this engagement."}
            </Paragraph>
          </div>
          
          <div className="drawer-actions" style={{ marginTop: '24px' }}>
            <Link href={`/user/engagements/${engagementId}`}>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                block
                onClick={() => {
                  setDetailVisible(false);
                }}
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#cdd0cf",
                  color: "#000000",
                  height: '40px'
                }}
              >
                View Complete Details
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    );
  };

  return (
    <div className="engagement-table-container">
      {isMobileView ? (
        renderMobileList()
      ) : (
      <Table
          dataSource={engagements}
          columns={columns}
          rowKey={(record) => record.id || record._id}
          pagination={false}
          loading={loading}
          scroll={{
            x: windowWidth <= 640 ? 500 : windowWidth <= 768 ? 800 : 1200,
            y: windowWidth <= 640 ? '50vh' : windowWidth <= 1024 ? '60vh' : '65vh'
          }}
          style={{
            maxWidth: '100%',
            overflowX: 'auto',
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          }}
          className="engagement-table"
          onRow={(record) => ({
            onClick: () => {
              if (isMobileView) return;
              handleSelectOne(record.id || record._id);
            },
            style: { cursor: 'pointer' }
          })}
          rowClassName={(record) =>
            selectedLeadIds?.includes(record.id || record._id) ? "selected-table-row" : ""
          }
      />
      )}

      {/* Render detail drawer for both mobile and desktop */}
      {renderEngagementDetailDrawer()}
         
      <style jsx global>{`
        .engagement-table-container {
          width: 100%;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .engagement-table .ant-table {
          background: transparent;
        }

        .engagement-table .ant-table-thead > tr > th {
          background: #fafafa;
          font-weight: 600;
          padding: ${windowWidth <= 640 ? '8px 12px' : '12px 16px'};
          font-size: ${windowWidth <= 640 ? '13px' : '14px'};
        }

        .engagement-table .ant-table-tbody > tr > td {
          padding: ${windowWidth <= 640 ? '8px 12px' : '12px 16px'};
          font-size: ${windowWidth <= 640 ? '13px' : '14px'};
        }

        .engagement-table .ant-table-tbody > tr:hover > td {
          background: #fafafa;
        }

        .engagement-table .selected-table-row > td {
          background-color: #e6f7ff;
        }

        .engagement-table .ant-table-cell {
          vertical-align: middle;
        }

        /* Mobile list styles */
        .engagement-mobile-list {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #f0f0f0;
          overflow: hidden;
        }
        
        .engagement-mobile-list .ant-list-item {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .mobile-list-item-selected {
          background-color: #e6f7ff !important;
        }
        
        .engagement-mobile-list .ant-list-item:hover {
          background-color: #fafafa;
        }
        
        .engagement-mobile-list .ant-list-item-meta {
          align-items: center;
        }
        
        /* Drawer styles */
        .engagement-detail-container {
          padding: 0 4px;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #262626;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .drawer-actions {
          position: sticky;
          bottom: 0;
          padding-bottom: 8px;
          background-color: white;
        }

        @media (max-width: 640px) {
          .engagement-table .ant-table-thead > tr > th,
          .engagement-table .ant-table-tbody > tr > td {
            white-space: nowrap;
          }
        }

        @media (max-width: 768px) {
          .engagement-table-container {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

EngagementTable.propTypes = {
  onSelectAll: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
  engagements: PropTypes.array.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  selectedLeadIds: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default React.memo(EngagementTable);