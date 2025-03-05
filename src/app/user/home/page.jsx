"use client";
import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Select,
  Button,
  Statistic,
  Table,
  Tag,
  Badge,
  Progress,
  Space,
  Divider,
  Drawer,
  Menu,
  Dropdown,
} from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EyeOutlined,
  MessageOutlined,
  MenuOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const LeadManagementDashboard = () => {
  // State to manage responsive behavior
  const [isMobile, setIsMobile] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [tableHeight, setTableHeight] = useState(400);

  // Sample data - would come from an API in production
  const engagementData = [
    { name: "Jan", whatsapp: 165, email: 139, manual: 98, total: 402 },
    { name: "Feb", whatsapp: 180, email: 150, manual: 87, total: 417 },
    { name: "Mar", whatsapp: 195, email: 143, manual: 105, total: 443 },
    { name: "Apr", whatsapp: 210, email: 167, manual: 120, total: 497 },
    { name: "May", whatsapp: 185, email: 172, manual: 110, total: 467 },
    { name: "Jun", whatsapp: 220, email: 189, manual: 132, total: 541 },
    { name: "Jul", whatsapp: 245, email: 201, manual: 145, total: 591 },
  ];

  const conversionData = [
    { name: "Jan", rate: 12 },
    { name: "Feb", rate: 14 },
    { name: "Mar", rate: 13 },
    { name: "Apr", rate: 17 },
    { name: "May", rate: 16 },
    { name: "Jun", rate: 19 },
    { name: "Jul", rate: 21 },
  ];

  const leadStatusData = [
    { name: "New", value: 120 },
    { name: "Engaged", value: 240 },
    { name: "Qualified", value: 180 },
    { name: "Proposal", value: 90 },
    { name: "Closed", value: 70 },
  ];

  const COLORS = [
    "#4F46E5", // Indigo - professional and clear
    "#0EA5E9", // Sky blue - clean and subtle
    "#0D9488", // Teal - distinctive but professional
    "#8B5CF6", // Purple - elegant and visible
    "#F97316", // Orange - warm but professional
  ];

  const leadSourceData = [
    { name: "Facebook Ads", value: 340 },
    { name: "Google Ads", value: 280 },
    { name: "Referrals", value: 150 },
    { name: "Direct", value: 120 },
    { name: "Other", value: 110 },
  ];

  const responseTimeData = [
    { name: "< 5 min", count: 240 },
    { name: "5-30 min", count: 180 },
    { name: "30-60 min", count: 120 },
    { name: "1-24 hrs", count: 60 },
    { name: "> 24 hrs", count: 40 },
  ];

  const recentLeads = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      status: "New",
      source: "Facebook Ads",
      created: "2025-03-03",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+2345678901",
      status: "Engaged",
      source: "Google Ads",
      created: "2025-03-02",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+3456789012",
      status: "Qualified",
      source: "Referral",
      created: "2025-03-02",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+4567890123",
      status: "New",
      source: "Direct",
      created: "2025-03-01",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert@example.com",
      phone: "+5678901234",
      status: "Engaged",
      source: "Facebook Ads",
      created: "2025-03-01",
    },
  ];

  const campaignData = [
    {
      key: 1,
      name: "March Promotion",
      sent: 450,
      opened: "382 (84.9%)",
      engaged: "210 (46.7%)",
      converted: "42 (9.3%)",
    },
    {
      key: 2,
      name: "New Product Launch",
      sent: 325,
      opened: "301 (92.6%)",
      engaged: "185 (56.9%)",
      converted: "54 (16.6%)",
    },
    {
      key: 3,
      name: "Follow-up Campaign",
      sent: 280,
      opened: "245 (87.5%)",
      engaged: "172 (61.4%)",
      converted: "38 (13.6%)",
    },
    {
      key: 4,
      name: "Special Offer",
      sent: 520,
      opened: "468 (90.0%)",
      engaged: "312 (60.0%)",
      converted: "78 (15.0%)",
    },
  ];

  const [periodFilter, setPeriodFilter] = useState("week");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Effect to handle responsive changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Adjust table height based on viewport
      if (window.innerHeight < 800) {
        setTableHeight(300);
      } else {
        setTableHeight(400);
      }
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Status tag renderer
  const getStatusTag = (status) => {
    const statusConfig = {
      New: { color: "blue" },
      Engaged: { color: "gold" },
      Qualified: { color: "green" },
      Proposal: { color: "purple" },
      Closed: { color: "default" },
    };
    return <Tag color={statusConfig[status]?.color}>{status}</Tag>;
  };

  // Create responsive columns for tables
  const getLeadsColumns = () => {
    const baseColumns = [
      { 
        title: "Name", 
        dataIndex: "name", 
        key: "name",
        ellipsis: true,
      },
    {
      title: "Contact",
      key: "contact",
        responsive: ["md"],
      render: (_, record) => (
        <Space direction="vertical" size={0}>
            <Text ellipsis>{record.email}</Text>
            <Text type="secondary" ellipsis>{record.phone}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
      { 
        title: "Source", 
        dataIndex: "source", 
        key: "source",
        responsive: ["lg"],
        ellipsis: true,
      },
      { 
        title: "Created", 
        dataIndex: "created", 
        key: "created",
        responsive: ["md"],
      },
    ];

    // Only add actions column if not mobile
    if (!isMobile) {
      baseColumns.push({
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small">
              {!isMobile && "View"}
          </Button>
          <Button type="text" icon={<MessageOutlined />} size="small">
              {!isMobile && "Engage"}
          </Button>
        </Space>
      ),
      });
    }

    return baseColumns;
  };

  // Campaign columns with responsive adjustments
  const campaignColumns = [
    { 
      title: "Campaign", 
      dataIndex: "name", 
      key: "name",
      ellipsis: true,
    },
    { 
      title: "Sent", 
      dataIndex: "sent", 
      key: "sent",
      responsive: ["sm"],
    },
    { 
      title: "Opened", 
      dataIndex: "opened", 
      key: "opened",
      responsive: ["md"],
    },
    { 
      title: "Engaged", 
      dataIndex: "engaged", 
      key: "engaged",
      responsive: ["lg"],
    },
    { 
      title: "Converted", 
      dataIndex: "converted", 
      key: "converted" 
    },
  ];

  // Menu items for mobile drawer
  const menuItems = [
    {
      key: "period",
      label: "Time Period",
      children: [
        { key: "today", label: "Today" },
        { key: "week", label: "This Week" },
        { key: "month", label: "This Month" },
        { key: "quarter", label: "This Quarter" },
        { key: "year", label: "This Year" },
      ],
    },
    {
      key: "export",
      label: "Export Report",
    },
  ];

  // Header content based on screen size
  const renderHeader = () => {
    if (isMobile) {
      return (
        <>
          <Title level={4} style={{ margin: 0, fontSize: "18px" }}>
            Leads Engager
          </Title>
          <Button type="text" icon={<MenuOutlined />} onClick={() => setMenuVisible(true)} />
          <Drawer
            title="Dashboard Options"
            placement="right"
            onClose={() => setMenuVisible(false)}
            open={menuVisible}
            width={250}
          >
            <Menu
              mode="inline"
              selectedKeys={[periodFilter]}
              onClick={(e) => {
                // Only close drawer and update filter for time period selections
                if (["today", "week", "month", "quarter", "year"].includes(e.key)) {
                  setPeriodFilter(e.key);
                  setMenuVisible(false);
                }
                // Handle export action separately
                else if (e.key === "export") {
                  // Handle export action
                  console.log("Exporting report...");
                  setMenuVisible(false);
                }
                // Parent menu items (like "period") should not close the drawer
              }}
              items={menuItems}
            />
          </Drawer>
        </>
      );
    }

    return (
      <>
        <Title level={4} style={{ margin: 0 }}>
          Leads Engager Dashboard
        </Title>
        <Space wrap>
          <Select
            defaultValue={periodFilter}
            onChange={setPeriodFilter}
            style={{ width: 120 }}
            options={[
              { value: "today", label: "Today" },
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
              { value: "quarter", label: "This Quarter" },
              { value: "year", label: "This Year" },
            ]}
          />
          <Button type="primary" icon={<DownloadOutlined />} style={{ background: "#000" }}>
            Export Report
          </Button>
        </Space>
      </>
    );
  };

  // Render a simplified card component with consistent margins
  const renderCard = (title, content, extra = null) => (
    <Card
      title={title}
      extra={extra}
      variant="borderless"
      className="dashboard-card"
      style={{ height: "100%", marginBottom: isMobile ? 16 : 0 }}
      styles={{body: {padding: isMobile ? 12 : 24, height: "calc(100% - 57px)", overflow: "auto"}}}
    >
      {content}
    </Card>
  );

  // Responsive chart heights
  const getChartHeight = (type) => {
    switch (type) {
      case "line":
      case "bar":
        return isMobile ? 220 : 300;
      case "pie":
      case "horizontal":
        return isMobile ? 200 : 250;
      default:
        return 300;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f7f7f7" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 16px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: isMobile ? 56 : 64,
        }}
      >
        {renderHeader()}
      </Header>

      <Content
        style={{
          padding: isMobile ? "8px" : "12px",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* Stats Cards */}
        <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
          <Col xs={12} sm={12} lg={6}>
            <Card variant="borderless" style={{ height: "100%" }}>
              <Statistic
                title="Total Leads"
                value={1247}
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    +8.4%
                  </Text>
                }
                valueStyle={{ color: "#000", fontSize: isMobile ? "20px" : "24px" }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                vs previous period
              </Text>
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card variant="borderless" style={{ height: "100%" }}>
              <Statistic
                title="Engagements"
                value={5928}
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    +12.7%
                  </Text>
                }
                valueStyle={{ color: "#000", fontSize: isMobile ? "20px" : "24px" }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                vs previous period
              </Text>
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card variant="outlined" style={{ height: "100%" }}>
              <Statistic
                title="Response Rate"
                value={94.3}
                suffix={
                  <Text type="success" style={{ fontSize: 14 }}>
                    +2.1%
                  </Text>
                }
                valueStyle={{ color: "#000", fontSize: isMobile ? "20px" : "24px" }}
                precision={1}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                vs previous period
              </Text>
            </Card>
          </Col>
          <Col xs={12} sm={12} lg={6}>
            <Card variant="outlined" style={{ height: "100%" }}>
              <Statistic
                title="Conversion"
                value={18.2}
                suffix={
                  <Text type="danger" style={{ fontSize: 14 }}>
                    -1.5%
                  </Text>
                }
                valueStyle={{ color: "#000", fontSize: isMobile ? "20px" : "24px" }}
                precision={1}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                vs previous period
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Charts - Row 1 */}
        <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={12}>
            {renderCard(
              "Engagement Trends",
              <ResponsiveContainer width="100%" height={getChartHeight("line")}>
                <LineChart
                  data={engagementData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    interval={isMobile ? 1 : "preserveStartEnd"}
                  />
                  <YAxis tick={{ fontSize: 12 }} width={30} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line dataKey="whatsapp" stroke="#4F46E5" strokeWidth={2} />
                  <Line dataKey="email" stroke="#0EA5E9" strokeWidth={2} />
                  <Line dataKey="manual" stroke="#0D9488" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Col>
          <Col xs={24} lg={12}>
            {renderCard(
              "Conversion Rate",
              <ResponsiveContainer width="100%" height={getChartHeight("bar")}>
                <BarChart
                  data={conversionData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    interval={isMobile ? 1 : "preserveStartEnd"}
                  />
                  <YAxis tick={{ fontSize: 12 }} width={30} />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Col>
        </Row>

        {/* Charts - Row 2 */}
        <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12} lg={8}>
            {renderCard(
              "Lead Status",
              <ResponsiveContainer width="100%" height={getChartHeight("pie")}>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={leadStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={isMobile ? "70%" : "80%"}
                    dataKey="value"
                    label={({ name, percent }) =>
                      isMobile
                        ? `${(percent * 100).toFixed(0)}%`
                        : `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {leadStatusData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  {isMobile && <Legend />}
                </PieChart>
              </ResponsiveContainer>
            )}
          </Col>
          <Col xs={24} sm={12} lg={8}>
            {renderCard(
              "Lead Sources",
              <ResponsiveContainer width="100%" height={getChartHeight("pie")}>
                <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={isMobile ? "70%" : "80%"}
                    dataKey="value"
                    label={({ name, percent }) =>
                      isMobile
                        ? `${(percent * 100).toFixed(0)}%`
                        : `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {leadSourceData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  {isMobile && <Legend />}
                </PieChart>
              </ResponsiveContainer>
            )}
          </Col>
          <Col xs={24} md={24} lg={8}>
            {renderCard(
              "Response Time",
              <ResponsiveContainer width="100%" height={getChartHeight("horizontal")}>
                <BarChart
                  data={responseTimeData}
                  layout="vertical"
                  margin={{ 
                    top: 5, 
                    right: 10, 
                    left: isMobile ? 30 : 40, 
                    bottom: 5 
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12 }}
                    width={isMobile ? 60 : 100}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Col>
        </Row>

        {/* Recent Leads */}
        {renderCard(
          "Recent Leads",
          <div style={{ overflowX: "auto", height: "100%" }}>
          <Table
              columns={getLeadsColumns()}
            dataSource={recentLeads}
            pagination={{
              total: 1247,
              showSizeChanger: false,
              showTotal: (total) => `Showing 5 of ${total} leads`,
              size: "small",
                responsive: true,
            }}
            size="small"
              scroll={{ x: "max-content", y: tableHeight }}
              style={{ marginTop: 0 }}
            />
          </div>,
          isMobile ? (
            <Dropdown
              menu={{
                items: [
                  { key: "all", label: "All Categories" },
                  { key: "new", label: "New" },
                  { key: "engaged", label: "Engaged" },
                  { key: "qualified", label: "Qualified" },
                  { key: "proposal", label: "Proposal" },
                  { key: "closed", label: "Closed" },
                ],
                onClick: ({ key }) => setCategoryFilter(key),
              }}
            >
              <Button size="small" icon={<FilterOutlined />} />
            </Dropdown>
          ) : (
            <Select
              defaultValue={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: "100%", minWidth: 150, maxWidth: 200 }}
              options={[
                { value: "all", label: "All Categories" },
                { value: "new", label: "New" },
                { value: "engaged", label: "Engaged" },
                { value: "qualified", label: "Qualified" },
                { value: "proposal", label: "Proposal" },
                { value: "closed", label: "Closed" },
              ]}
            />
          )
        )}

        {/* Analytics Row */}
        <Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={12}>
            {renderCard(
              "Message Analytics",
              <>
                <Row gutter={[{ xs: 8, sm: 12 }, { xs: 8, sm: 12 }]}>
                  <Col xs={12}>
                    <Card
                      variant="borderless"
                      style={{ background: "#fafafa", height: "100%" }}
                      styles={{body: {padding: "12px" }}}
                    >
                    <Statistic
                      title="Messages Sent"
                      value={3842}
                        valueStyle={{
                          color: "#000",
                          fontSize: isMobile ? "18px" : "20px",
                        }}
                    />
                  </Card>
                </Col>
                  <Col xs={12}>
                    <Card
                      variant="borderless"
                      style={{ background: "#fafafa", height: "100%" }}
                      styles={{body: {padding: "12px" }}}
                    >
                    <Statistic
                      title="Messages Received"
                      value={2086}
                        valueStyle={{
                          color: "#000",
                          fontSize: isMobile ? "18px" : "20px",
                        }}
                    />
                  </Card>
                </Col>
                  <Col xs={12}>
                    <Card
                      variant="borderless"
                      style={{ background: "#fafafa", height: "100%" }}
                      styles={{body: {padding: "12px" }}}
                    >
                    <Statistic
                      title="Avg. Response Time"
                      value="14m"
                        valueStyle={{
                          color: "#000",
                          fontSize: isMobile ? "18px" : "20px",
                        }}
                    />
                  </Card>
                </Col>
                  <Col xs={12}>
                    <Card
                      variant="borderless"
                      style={{ background: "#fafafa", height: "100%" }}
                      styles={{body: {padding: "12px" }}}
                    >
                    <Statistic
                      title="Response Rate"
                      value={94.3}
                      suffix="%"
                        valueStyle={{
                          color: "#000",
                          fontSize: isMobile ? "18px" : "20px",
                        }}
                    />
                  </Card>
                </Col>
              </Row>

                <Divider
                  orientation="left"
                  plain
                  style={{ margin: "16px 0", fontSize: 14 }}
                >
                <Text style={{ fontSize: 14 }}>Channel Distribution</Text>
              </Divider>

                <div style={{ marginBottom: 10, maxWidth: "100%" }}>
                <Progress
                  percent={100}
                  success={{ percent: 0 }}
                  strokeColor={{
                      "0%": "#4F46E5",
                      "65%": "#0EA5E9",
                      "90%": "#0D9488",
                  }}
                  format={() => ""}
                  style={{ height: 20 }}
                />
              </div>

                <Row gutter={[8, 8]} style={{ flexWrap: "wrap" }}>
                  <Col xs={24} sm={8}>
                    <Badge color="#4F46E5" text="WhatsApp (65%)" />
                </Col>
                  <Col xs={24} sm={8}>
                    <Badge color="#0EA5E9" text="Email (25%)" />
                </Col>
                  <Col xs={24} sm={8}>
                    <Badge color="#0D9488" text="Manual (10%)" />
                </Col>
              </Row>
              </>
            )}
          </Col>

          <Col xs={24} lg={12}>
            {renderCard(
              "Campaign Performance",
              <div style={{ overflowX: "auto", height: "100%" }}>
              <Table
                columns={campaignColumns}
                dataSource={campaignData}
                pagination={false}
                size="small"
                  scroll={{ x: "max-content", y: isMobile ? 250 : 350 }}
              />
              </div>
            )}
          </Col>
        </Row>

        {/* Add some bottom space for mobile scrolling */}
        {isMobile && <div style={{ height: 16 }} />}
      </Content>

      {/* Add global styles */}
      <style jsx global>{`
        .dashboard-card .ant-card-head {
          min-height: auto;
          padding: ${isMobile ? "8px 12px" : "16px 24px"};
        }
        
        .dashboard-card .ant-card-head-title {
          padding: ${isMobile ? "4px 0" : "8px 0"};
          font-size: ${isMobile ? "14px" : "16px"};
        }
        
        .dashboard-card .ant-card-head-wrapper {
          align-items: center;
        }
        
        @media (max-width: 576px) {
          .ant-col {
            padding: 4px !important;
          }
          
          .recharts-wrapper text {
            font-size: 10px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default LeadManagementDashboard;