import React, { useMemo, useState, useEffect } from "react";
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
  Drawer,
  List,
  Divider,
  Grid,
  Skeleton,
} from "antd";
import {
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  UserOutlined,
  InfoCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LeadsTable = ({
  onSelectAll,
  isAllSelected,
  leads,
  onSelect,
  selectedLeadIds,
  loading = false,
}) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Use Ant Design's responsive breakpoints
  const screens = useBreakpoint();

  // Update view state based on screen size
  useEffect(() => {
    setIsMobileView(screens.xs);
    setIsTabletView(!screens.md);
  }, [screens]);

  const handleChange = (e) => {
    onSelectAll(e.target.checked);
  };

  const showLeadDetail = (record) => {
    setSelectedLead(record);
    setDetailVisible(true);
  };

  // Status badge colors
  const getStatusColor = (status) => {
    const statusMap = {
      New: "blue",
      Contacted: "processing",
      "Meeting Scheduled": "gold",
      Qualified: "cyan",
      Proposal: "purple",
      Negotiation: "orange",
      Won: "success",
      Lost: "error",
      "On Hold": "default",
      Active: "success",
      Inactive: "default",
      Closed: "default",
      Prospect: "default",
      Lead: "default",
      Customer: "default",
    };
    return statusMap[status] || "default";
  };

  // Category tag colors
  const getCategoryColor = (category) => {
    const categoryMap = {
      cold: "default",
      warm: "blue",
      hot: "volcano",
      vip: "gold",
    };
    return categoryMap[category?.toLowerCase()] || "default";
  };

  // Format name initials for avatar
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate random color for avatar based on name
  const getAvatarColor = (name) => {
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
  };

  // Dynamically adjust columns based on screen size
  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: (
          <div className="flex justify-center items-center w-full">
            <Checkbox checked={isAllSelected} onChange={handleChange} />
          </div>
        ),
        dataIndex: "checkbox",
        key: "checkbox",
        width: 50,
        fixed: "left",
        render: (_, record) => (
          <div className="flex justify-center items-center">
            <Checkbox
              checked={selectedLeadIds.includes(record.id)}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(record.id);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ),
      },
      {
        title: "Lead",
        dataIndex: "name",
        key: "name",
        fixed: "left",
        width: screens.sm ? 240 : 160,
        render: (name, record) => (
          <Space size={12}>
            <Avatar
              style={{ backgroundColor: getAvatarColor(name) }}
              icon={!name ? <UserOutlined /> : null}
              size={screens.sm ? "default" : "small"}
            >
              {name ? getInitials(name) : null}
            </Avatar>
            <Space direction="vertical" size={0}>
              <Text strong className="text-sm sm:text-base">
                {name || "Unknown"}
              </Text>
            </Space>
          </Space>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 140,
        render: (status) => (
          <Badge
            status={getStatusColor(status)}
            text={<Text style={{ fontWeight: 500 }}>{status || "No status"}</Text>}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          />
        ),
      },
    ];

    // Only add these columns if screen is MD or larger (tablet+)
    if (screens.md) {
      baseColumns.push(
        {
          title: "Contact",
          dataIndex: "contact",
          key: "contact",
          width: 280,
          render: (_, record) => (
            <Space direction="vertical" size={4}>
              <Space>
                <PhoneOutlined style={{ color: "#8c8c8c" }} />
                <Text>{record.phone || "N/A"}</Text>
              </Space>
            </Space>
          ),
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
          width: 120,
          render: (category) =>
            category ? (
              <Tag color={getCategoryColor(category)}>
                {category.toUpperCase()}
              </Tag>
            ) : (
              "-"
            ),
        }
      );
    }

    // Only add these columns if screen is LG or larger
    if (screens.lg) {
      baseColumns.push(
        {
          title: "Last Activity",
          dataIndex: "lastActive",
          key: "lastActive",
          width: 160,
          render: (date) => (
            <Space>
              <CalendarOutlined style={{ color: "#8c8c8c" }} />
              <Text>{date || "No activity"}</Text>
            </Space>
          ),
        },
        {
          title: "Score",
          dataIndex: "score",
          key: "score",
          width: 100,
          render: (score) => {
            let color = "default";
            if (score >= 80) color = "success";
            else if (score >= 50) color = "processing";
            else if (score >= 30) color = "warning";
            else if (score > 0) color = "error";

            return score ? <Tag color={color}>{score}</Tag> : "-";
          },
          sorter: (a, b) => (a.score || 0) - (b.score || 0),
        }
      );
    }

    // Only add notes column if screen is XL (very large screens)
    if (screens.xl) {
      baseColumns.push({
        title: "Notes",
        dataIndex: "note",
        key: "note",
        width: 200,
        ellipsis: {
          showTitle: false,
        },
        render: (note) => (
          <Tooltip placement="topLeft" title={note}>
            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
              {note || "No notes"}
            </Paragraph>
          </Tooltip>
        ),
      });
    }

    // Action column for all screen sizes
    baseColumns.push({
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: screens.sm ? 100 : 80,
      fixed: "right",
      render: (_, record) => (
        <Space>
          {isTabletView ? (
            <Button
              icon={<InfoCircleOutlined />}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                showLeadDetail(record);
              }}
              shape="circle"
            />
          ) : null}
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            href={`/user/leads/${record.id}`}
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#cdd0cf",
              color: "#000000",
              padding: "10px 10px",
            }}
          >
            {screens.sm ? "View" : ""}
          </Button>
        </Space>
      ),
    });

    return baseColumns;
  }, [
    screens,
    isAllSelected,
    handleChange,
    selectedLeadIds,
    onSelect,
    isTabletView,
  ]);

  // Mobile view uses List component instead of Table
  const renderMobileList = () => {
    if (!isMobileView) return null;

    return (
      <List
        className="leads-mobile-list"
        itemLayout="horizontal"
        dataSource={leads}
        renderItem={(lead) => (
          <List.Item
            className={
              selectedLeadIds.includes(lead.id)
                ? "mobile-list-item-selected"
                : ""
            }
            actions={[
              <Button
                type="primary"
                icon={<EyeOutlined />}
                size="small"
                href={`/user/leads/${lead.id}`}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderColor: "#cdd0cf",
                  padding: "10px 10px",
                }}
              >
                View
              </Button>,
              <Button
                key="info"
                icon={<InfoCircleOutlined />}
                size="small"
                onClick={() => showLeadDetail(lead)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={selectedLeadIds.includes(lead.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelect(lead.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ marginRight: 12 }}
                  />
                  <Avatar
                    style={{ backgroundColor: getAvatarColor(lead.name) }}
                    icon={!lead.name ? <UserOutlined /> : null}
                  >
                    {lead.name ? getInitials(lead.name) : null}
                  </Avatar>
                </div>
              }
              title={
                <div>
                  <Text strong>{lead.name || "Unknown"}</Text>
                  <Badge
                    status={getStatusColor(lead.status)}
                    text={
                      <Text style={{ fontWeight: 500, fontSize: 12 }}>
                        {lead.status || "No status"}
                      </Text>
                    }
                    style={{ marginLeft: 8 }}
                  />
                </div>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  // Mobile lead details drawer
  const renderLeadDetailDrawer = () => {
    if (!selectedLead) return null;

    return (
      <Drawer
        title={
          <div style={{ fontSize: "18px", fontWeight: 600 }}>Lead Details</div>
        }
        placement="right"
        onClose={() => setDetailVisible(false)}
        open={detailVisible}
        width={isMobileView ? "100%" : 400}
      >
        <div className="lead-detail-container">
          <div className="flex items-center mb-4">
            <Avatar
              size={64}
              style={{ backgroundColor: getAvatarColor(selectedLead.name) }}
              icon={!selectedLead.name ? <UserOutlined /> : null}
            >
              {selectedLead.name ? getInitials(selectedLead.name) : null}
            </Avatar>
            <div className="ml-4">
              <Text strong style={{ fontSize: "18px", display: "block" }}>
                {selectedLead.name || "Unknown"}
              </Text>
              <Badge
                status={getStatusColor(selectedLead.status)}
                text={selectedLead.status || "No status"}
                style={{ fontSize: "14px" }}
              />
            </div>
          </div>

          <Divider style={{ margin: "16px 0" }} />

          <div className="lead-info-section">
            <h4 className="section-title">Contact Information</h4>
            <div className="info-item">
              <PhoneOutlined style={{ color: "#8c8c8c", marginRight: 8 }} />
              <Text>{selectedLead.phone || "N/A"}</Text>
            </div>
            <div className="info-item">
              <MailOutlined style={{ color: "#8c8c8c", marginRight: 8 }} />
              <Text>{selectedLead.email || "N/A"}</Text>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            <h4 className="section-title">Lead Details</h4>
            <div className="info-item">
              <TagOutlined style={{ color: "#8c8c8c", marginRight: 8 }} />
              <Text>Category: </Text>
              {selectedLead.category ? (
                <Tag color={getCategoryColor(selectedLead.category)}>
                  {selectedLead.category.toUpperCase()}
                </Tag>
              ) : (
                <Text type="secondary">Not assigned</Text>
              )}
            </div>

            <div className="info-item">
              <CalendarOutlined style={{ color: "#8c8c8c", marginRight: 8 }} />
              <Text>
                Last Activity: {selectedLead.lastActive || "No activity"}
              </Text>
            </div>

            {selectedLead.score !== undefined && (
              <div className="info-item">
                <InfoCircleOutlined
                  style={{ color: "#8c8c8c", marginRight: 8 }}
                />
                <Text>Score: </Text>
                <Tag
                  color={
                    selectedLead.score >= 80
                      ? "success"
                      : selectedLead.score >= 50
                      ? "processing"
                      : selectedLead.score >= 30
                      ? "warning"
                      : selectedLead.score > 0
                      ? "error"
                      : "default"
                  }
                >
                  {selectedLead.score}
                </Tag>
              </div>
            )}
            <Divider style={{ margin: "16px 0" }} />
            <h4 className="section-title">Notes</h4>
            <Paragraph style={{ whiteSpace: "pre-line" }}>
              {selectedLead.note || "No notes available for this lead."}
            </Paragraph>
          </div>

          <div className="drawer-actions" style={{ marginTop: "24px" }}>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              block
              href={`/user/leads/${selectedLead.id}`}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#cdd0cf",
                color: "#000000",
              }}
            >
              View Complete Profile
            </Button>
          </div>
        </div>
      </Drawer>
    );
  };

  const renderSkeletonList = () => (
    <List
      className="leads-mobile-list"
      itemLayout="horizontal"
      dataSource={[1, 2, 3, 4, 5]}
      renderItem={() => (
        <List.Item>
          <Skeleton
            active
            avatar
            paragraph={{ rows: 1 }}
            className="px-5 py-2"
          />
        </List.Item>
      )}
    />
  );

  const renderSkeletonTable = () => {
    const skeletonColumns = columns.map((col) => ({
      ...col,
      render: () => (
        <Skeleton.Input
          active
          size={screens.sm ? "default" : "small"}
          style={{ width: "100%", minWidth: 50, height: "20px" }}
        />
      ),
    }));

    return (
      <Table
        columns={skeletonColumns}
        dataSource={[...Array(5)].map((_, i) => ({ id: i }))}
        pagination={false}
        className="leads-custom-table"
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return isMobileView ? renderSkeletonList() : renderSkeletonTable();
    }
    return isMobileView ? (
      renderMobileList()
    ) : (
      <Table
        columns={columns}
        dataSource={leads}
        rowKey="id"
        className="leads-custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} leads`,
          size: "default",
          responsive: true,
        }}
        scroll={{ x: "max-content" }}
        rowClassName={(record) =>
          selectedLeadIds.includes(record.id) ? "ant-table-row-selected" : ""
        }
        onRow={(record) => ({
          onClick: () => onSelect(record.id),
          className: "custom-table-row",
        })}
        size={screens.sm ? "middle" : "small"}
      />
    );
  };

  return (
    <div className="leads-table-container">
      {renderContent()}
      {renderLeadDetailDrawer()}

      <style jsx global>{`
        .leads-table-container {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
            0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }

        .leads-custom-table {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .leads-custom-table .ant-table-thead > tr > th {
          font-weight: 600;
          padding: ${screens.sm ? "16px" : "12px 8px"};
          white-space: nowrap;
        }

        .leads-custom-table .ant-table-tbody > tr > td {
          padding: ${screens.sm ? "16px" : "12px 8px"};
          transition: all 0.2s;
        }

        .custom-table-row {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .custom-table-row:hover {
          background-color: #fafafa;
        }

        .ant-table-row-selected {
          background-color: #e6f4ff !important;
        }

        .leads-custom-table .ant-pagination {
          margin: 16px;
          padding: 14px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .leads-custom-table .ant-pagination-options {
            display: none;
          }
        }

        .leads-custom-table .ant-table-cell {
          vertical-align: middle;
        }

        /* Mobile list styles */
        .leads-mobile-list {
          background: #fff;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          overflow: hidden;
        }

        .leads-mobile-list .ant-list-item {
          padding: 12px 16px;
          transition: background-color 0.2s ease;
        }

        .mobile-list-item-selected {
          background-color: #e6f4ff !important;
        }

        .leads-mobile-list .ant-list-item:hover {
          background-color: #fafafa;
        }

        .leads-mobile-list .ant-list-item-meta {
          align-items: center;
        }

        /* Drawer styles */
        .lead-detail-container {
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

        /* Handle mobile pagination */
        @media (max-width: 576px) {
          .ant-pagination-item {
            display: none;
          }
          .ant-pagination-item-active {
            display: inline-block;
          }
          .ant-pagination-options {
            display: none;
          }
        }

        /* Skeleton styles */
        .ant-skeleton {
          width: 100%;
        }

        .ant-skeleton-element {
          width: 100%;
        }

        .ant-list-item .ant-skeleton {
          padding: 8px 0;
        }

        .ant-table .ant-skeleton-input {
          min-width: 50px;
        }
      `}</style>
    </div>
  );
};

export default LeadsTable;

LeadsTable.propTypes = {
  onSelectAll: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
  leads: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedLeadIds: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
