import React, { useState } from "react";
import { Button, Select, Input, Space, Popover, Row, Col } from "antd";
import {
  PlusOutlined,
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
  const [filterVisible, setFilterVisible] = useState(false);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const FilterContent = () => (
    <div style={{ width: 250, padding: "12px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          placeholder="Filter by Status"
          style={{ width: "100%" }}
          value={statusFilter || undefined}
          onChange={(value) => {
            onStatusFilterChange(value);
            setFilterVisible(false);
          }}
          allowClear
        >
          {statuses.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Category"
          style={{ width: "100%" }}
          value={categoryFilter || undefined}
          onChange={(value) => {
            onCategoryFilterChange(value);
            setFilterVisible(false);
          }}
          allowClear
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>

        <Input
          placeholder="Search engagements..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          style={{ width: "100%" }}
          allowClear
        />
      </Space>
    </div>
  );

  const BulkActionControls = () => (
    <Space>
      <Select
        placeholder="Change Status"
        style={{ width: isMobile ? "100%" : 160 }}
        onChange={(value) => onBulkAction("status", value, selectedIds)}
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
        style={{ width: isMobile ? "100%" : 160 }}
        onChange={(value) => onBulkAction("category", value, selectedIds)}
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
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onBulkDelete}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          Delete
        </Button>
      )}
    </Space>
  );

  return (
    <div style={{ marginBottom: 16, width: '100%' }} >
      <Row gutter={[16, 16]} align="top" justify="space-between" style={{ width: '100%' }}>
        <Col>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: "100%",
              alignItems: "flex-start", // Critical constraint: Always start-aligned
            }}
          >
            <Space 
  style={{ 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',  // Critical: full width occupation
    alignItems: 'center'  // Vertical centering
  }}
>
  <Button
    icon={<PlusOutlined />}
    onClick={onAddEngagement}
    style={{
      fontWeight: "bold",
      alignSelf: "flex-start"
    }}
  >
    Add
  </Button>

  <Popover
    content={<FilterContent />}
    title="Filters"
    trigger="click"
    open={filterVisible}
    onOpenChange={setFilterVisible}
    placement="bottomRight"
  >
    <Button
      icon={<FilterOutlined />}
      style={{
        color: statusFilter || categoryFilter || searchQuery ? "#000" : undefined,
        fontWeight: statusFilter || categoryFilter || searchQuery ? "bold" : "normal",
      }}
    >
      {statusFilter || categoryFilter || searchQuery ? "Filtered" : "Filter"}
    </Button>
  </Popover>
</Space>

            {selectedIds.length > 0 && <BulkActionControls />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EngagementControls;
