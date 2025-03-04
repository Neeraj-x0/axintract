import React from "react";
import { Button, Select, Input, Space, Divider, Row, Col, Tooltip } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
  TagOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const EngagementControls = ({
  selectedIds,
  onAddEngagement,
  onBulkAction, 
  onBulkDelete,
  statuses,
  categories,
  statusFilter,
  categoryFilter,
  searchQuery,
  onStatusFilterChange,
  onCategoryFilterChange,
  onSearchQueryChange,
}) => {
  return (
    <div className="engagement-controls">
      <Row
        gutter={[16, 16]}
        align="middle"
        justify="space-between"
        style={{ marginBottom: "16px" }}
      >
        <Col xs={24} md={24} lg={14} xl={16}>
          <Space size="middle" wrap>
             <button 
              onClick={onAddEngagement}
              className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg">
                Add Engagement
              </button>

            {selectedIds.length > 0 && (
              <>
                <Select
                  placeholder="Change Status"
                  style={{ width: 160 }}
                  onChange={(value) =>
                    onBulkAction("status", value, selectedIds)
                  }
                  suffixIcon={<CheckCircleOutlined />}
                  disabled={selectedIds.length === 0}
                >
                  {statuses.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>

                <Select
                  placeholder="Change Category"
                  style={{ width: 160 }}
                  onChange={(value) =>
                    onBulkAction("category", value, selectedIds)
                  }
                  suffixIcon={<TagOutlined />} 
                  disabled={selectedIds.length === 0}
                >
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>

                {onBulkDelete && (
                  <Tooltip title="Delete selected engagements">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={onBulkDelete}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </Space>
        </Col>

        <Col xs={24} md={24} lg={10} xl={8}>
          <Space
            size="middle"
            wrap
            style={{ width: "100%", justifyContent: "flex-end" }}
          >
            <Select
              placeholder="Filter by Status"
              style={{ width: 140 }}
              value={statusFilter || undefined}
              onChange={onStatusFilterChange}
              allowClear
              suffixIcon={<FilterOutlined />}
            >
              <Option value="">All Status</Option>
              {statuses.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Filter by Category"
              style={{ width: 140 }}
              value={categoryFilter || undefined}
              onChange={onCategoryFilterChange}
              allowClear
              suffixIcon={<FilterOutlined />}
            >
              <Option value="">All Categories</Option>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>

            <Input
              placeholder="Search engagements..."
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              style={{ width: 220 }}
              allowClear
            />
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "0 0 16px 0" }} />
    </div>
  );
};




export default EngagementControls;
