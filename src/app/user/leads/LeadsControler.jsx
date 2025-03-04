import React, { useState, useEffect } from "react";
import { Button, Select, Input, Space, Divider, Row, Col, Tooltip, Drawer, Grid, Typography } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
  TagOutlined,
  CheckCircleOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const { Option } = Select;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const LeadsControls = ({
  selectedLeads,
  onAddLeads,
  onBulkAction,
  onBulkDelete,
  statusOptions,
  categoryOptions,
  statusFilter,
  categoryFilter,
  searchQuery,
  onStatusFilterChange,
  onCategoryFilterChange,
  onSearchQueryChange,
  isMobile,
}) => {
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  
  // Determine if layout should be compact based on screen size
  const isCompactView = !screens.lg;
  const isMobileView = !screens.md;
  const isSmallMobile = !screens.sm;

  // Selected count badge for mobile view
  const selectedCount = selectedLeads.length;

  const openFiltersDrawer = () => {
    setFiltersDrawerVisible(true);
  };

  const closeFiltersDrawer = () => {
    setFiltersDrawerVisible(false);
  };

  // Mobile filters drawer content
  const renderFilterDrawerContent = () => (
    <div className="p-4">
      <div className="mb-6">
        <Text strong className="mb-2 block">Search Leads</Text>
        <Input
          placeholder="Search by name, email, phone..."
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          style={{ width: '100%' }}
          allowClear
          size="large"
        />
      </div>

      <div className="mb-6">
        <Text strong className="mb-2 block">Filter by Status</Text>
        <Select
          placeholder="Select Status"
          style={{ width: '100%' }}
          value={statusFilter || undefined}
          onChange={(val) => {
            onStatusFilterChange(val);
          }}
          allowClear
          size="large"
          suffixIcon={<FilterOutlined />}
        >
          <Option value="">All Status</Option>
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mb-6">
        <Text strong className="mb-2 block">Filter by Category</Text>
        <Select
          placeholder="Select Category"
          style={{ width: '100%' }}
          value={categoryFilter || undefined}
          onChange={(val) => {
            onCategoryFilterChange(val);
          }}
          allowClear
          size="large"
          suffixIcon={<FilterOutlined />}
        >
          <Option value="">All Categories</Option>
          {categoryOptions.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </div>

      {selectedCount > 0 && (
        <>
          <Divider />
          
          <div className="mb-6">
            <Text strong className="mb-2 block">
              Bulk Actions ({selectedCount} selected)
            </Text>
            <div className="space-y-4">
              <Select
                placeholder="Change Status"
                style={{ width: '100%' }}
                onChange={(value) => onBulkAction("status", value)}
                suffixIcon={<CheckCircleOutlined />}
                size="large"
              >
                {statusOptions.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>

              <Select
                placeholder="Change Category"
                style={{ width: '100%' }}
                onChange={(value) => onBulkAction("category", value)}
                suffixIcon={<TagOutlined />}
                size="large"
              >
                {categoryOptions.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  onBulkDelete();
                  closeFiltersDrawer();
                }}
                block
                size="large"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t">
        <Button 
          type="primary" 
          size="large" 
          block
          onClick={closeFiltersDrawer}
          style={{ 
            backgroundColor: "#000000", 
            borderColor: "#000000" 
          }}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="leads-controls">
      {/* Mobile and Tablet View */}
      {isCompactView && (
        <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: "16px" }}>
          <Col>
            <Space size={8}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAddLeads}
                style={{
                  backgroundColor: "#000000",
                  borderColor: "#000000",
                }}
              >
                {!isSmallMobile && "Add Leads"}
              </Button>
              
              {selectedCount > 0 && !isSmallMobile && (
                <Text>{selectedCount} selected</Text>
              )}
            </Space>
          </Col>
          
          <Col>
            <Space size={8}>
              {isSmallMobile ? (
                // Very small mobile - only search
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  style={{ width: 120 }}
                  allowClear
                />
              ) : (
                // Regular mobile - search and some filters
                <Space size={8}>
                  <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    style={{ width: 150 }}
                    allowClear
                  />
                </Space>
              )}
              
              <Button 
                icon={<FilterOutlined />} 
                onClick={openFiltersDrawer}
                badge={selectedCount ? { count: selectedCount } : null}
              >
                {!isSmallMobile && "Filters"}
              </Button>
            </Space>
          </Col>
        </Row>
      )}

      {/* Desktop View */}
      {!isCompactView && (
        <Row gutter={[16, 16]} align="middle" style={{ marginBottom: "16px" }}>
          <Col xs={24}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <button 
                  onClick={onAddLeads}
                  className="px-8 py-2 bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg"
                >
                  Add Leads
                </button>

                {selectedLeads.length > 0 && (
                  <>
                    <Select
                      placeholder="Change Status"
                      style={{ width: 160 }}
                      onChange={(value) => onBulkAction("status", value)}
                      suffixIcon={<CheckCircleOutlined />}
                      disabled={selectedLeads.length === 0}
                    >
                      {statusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>

                    <Select
                      placeholder="Change Category"
                      style={{ width: 160 }}
                      onChange={(value) => onBulkAction("category", value)}
                      suffixIcon={<TagOutlined />}
                      disabled={selectedLeads.length === 0}
                    >
                      {categoryOptions.map((category) => (
                        <Option key={category} value={category}>
                          {category}
                        </Option>
                      ))}
                    </Select>

                    <Tooltip title="Delete selected leads">
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={onBulkDelete}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Select
                  placeholder="Filter by Status"
                  style={{ width: 140 }}
                  value={statusFilter || undefined}
                  onChange={onStatusFilterChange}
                  allowClear
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="">All Status</Option>
                  {statusOptions.map((status) => (
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
                  {categoryOptions.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>

                <Input
                  placeholder="Search leads..."
                  prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  style={{ width: 200 }}
                  allowClear
                />
              </div>
            </div>
          </Col>
        </Row>
      )}

      <Divider style={{ margin: "0 0 16px 0" }} />

      {/* Mobile Filters Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span>Filter & Actions</span>
            {selectedCount > 0 && (
              <Tag color="blue">{selectedCount} leads selected</Tag>
            )}
          </div>
        }
        
        placement="right"
        onClose={closeFiltersDrawer}
        open={filtersDrawerVisible}
        width={isSmallMobile ? '100%' : 320}
        styles={{body: {padding: 0, paddingBottom: '76px'},wrapper:{height : '100%'}}}
      >
        {renderFilterDrawerContent()}
      </Drawer>
      
      {/* Global styles */}
      <style jsx global>{`
        .leads-controls .ant-select-selector,
        .leads-controls .ant-input {
          border-radius: 6px;
        }
        
        .leads-controls .ant-btn {
          border-radius: 6px;
          display: flex;
          align-items: center;
        }
        
        .leads-controls .ant-badge-count {
          border-radius: 10px;
          box-shadow: none;
          padding: 0 8px;
          height: 22px;
          line-height: 22px;
          font-weight: normal;
        }

        @media (max-width: 767px) {
          .leads-controls .ant-select {
            width: 100% !important;
          }
          
          .leads-controls .ant-input {
            width: 100% !important;
          }
          
          .leads-controls .ant-space {
            flex-wrap: wrap;
          }
        }
        
        /* Fix for badge positioning in buttons */
        .ant-badge {
          display: inline-flex;
        }
        
        /* Fix drawer height on mobile */
        @media (max-width: 576px) {
          .ant-drawer-content-wrapper {
            height: 100% !important;
          }
        }
        
        /* Improved touch targets for mobile */
        @media (max-width: 768px) {
          .ant-select-selector,
          .ant-btn {
            min-height: 40px !important;
          }
          
          .ant-input {
            min-height: 40px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LeadsControls;

LeadsControls.propTypes = {
  selectedLeads: PropTypes.array.isRequired,
  onAddLeads: PropTypes.func.isRequired,
  onBulkAction: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  statusOptions: PropTypes.array.isRequired,
  categoryOptions: PropTypes.array.isRequired,
  statusFilter: PropTypes.string,
  categoryFilter: PropTypes.string,
  searchQuery: PropTypes.string,
  onStatusFilterChange: PropTypes.func,
  onSearchQueryChange: PropTypes.func,
  onCategoryFilterChange: PropTypes.func,
  isMobile: PropTypes.bool,
};

LeadsControls.defaultProps = {
  isMobile: false,
};