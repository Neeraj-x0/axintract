"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Input,
  Button,
  Upload,
  Form,
  List,
  Typography,
  Divider,
  Layout,
  notification,
  Space,
  Popconfirm,
  Spin,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  PlusOutlined,
  BuildOutlined,
  PhoneOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import usAxios from "../../../lib";
import SystemPromptForm from "../../../components/chatBotPrompt.jsx";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const { Title, Text } = Typography;
const { Content } = Layout;

// Styled Components with improved responsiveness
const StyledLayout = styled(Layout)`
  background: #ffffff;
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .ant-card-head {
    border-bottom: 1px solid #e0e0e0;
    padding: 16px 24px;
    border-radius: 12px 12px 0 0;
    background: #fafafa;
  }

  .ant-card-body {
    padding: 24px;
    
    @media (max-width: 576px) {
      padding: 16px;
    }
  }
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #000000, #333333);
  height: 140px;
  margin: -24px -24px 0;
  position: relative;
  border-radius: 12px 12px 0 0;
  
  @media (max-width: 576px) {
    height: 120px;
  }
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  bottom: -32px;
  left: 24px;
  
  @media (max-width: 576px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  
  .ant-typography {
    margin-bottom: 0;
    margin-left: 8px;
  }
`;

const AddItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  
  .ant-input {
    flex: 1;
    min-width: 120px;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    
    .ant-input {
      width: 100%;
    }
    
    .ant-btn {
      width: 100%;
    }
  }
`;

const ProfileForm = styled(Form)`
  margin-top: 48px;
  
  @media (max-width: 576px) {
    margin-top: 56px;
  }
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: 576px) {
    justify-content: center;
    margin-top: 8px;
  }
`;

// ListItem Component with updated styling
const SettingsListItem = ({
  type,
  item,
  index,
  editMode,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => (
  <List.Item
    className="hover:bg-gray-50 transition-colors duration-200 rounded-lg px-2"
    actions={[
      editMode.type === type && editMode.id === index ? (
        <Space size="small" wrap>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => onSave(type)}
            size="small"
            className="bg-black hover:bg-gray-800"
          >
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button onClick={onCancel} size="small">
            <span className="hidden sm:inline">Cancel</span>
          </Button>
        </Space>
      ) : (
        <Space size="small" wrap>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(type, index, item)}
            size="small"
            className="text-gray-600"
          >
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Popconfirm
            title={`Delete this ${type}?`}
            description={`Are you sure you want to delete this ${type}?`}
            onConfirm={() => onDelete(type, index)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "bg-black hover:bg-gray-800" }}
            icon={<InfoCircleOutlined style={{ color: '#ff4d4f' }} />}
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small">
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    ]}
  >
    {editMode.type === type && editMode.id === index ? (
      <Input
        value={editMode.value}
        onChange={(e) => onEdit(type, index, e.target.value)}
        autoFocus
        className="w-full sm:w-2/3"
      />
    ) : (
      <Text strong>{item}</Text>
    )}
  </List.Item>
);

// Profile Upload Component with updated styling
const ProfileUpload = ({ businessProfile, onImageChange }) => (
  <Upload
    accept="image/*"
    showUploadList={false}
    beforeUpload={(file) => {
      onImageChange(file);
      return false;
    }}
  >
    <div className="relative h-28 w-28 border-4 border-white rounded-full bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
      {businessProfile.companyLogo ? (
        <Image
          src={businessProfile.companyLogo}
          alt="Company Logo"
          fill
          sizes="100%"
          className="object-cover rounded-full"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center ">
          <BuildOutlined className="text-3xl text-gray-400" />
        </div>
      )}
      <div className="absolute -right-2 -bottom-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
        <EditOutlined className="text-gray-600" />
      </div>
    </div>
  </Upload>
);

ProfileUpload.propTypes = {
  businessProfile: PropTypes.shape({
    companyLogo: PropTypes.string,
    companyName: PropTypes.string,
    phoneNumber: PropTypes.string
  }).isRequired,
  onImageChange: PropTypes.func.isRequired
};

const SettingsPage = () => {
  const axios = usAxios();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState({
    type: null,
    id: null,
    value: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [businessProfile, setBusinessProfile] = useState({
    companyName: "",
    companyLogo: "",
    phoneNumber: "",
  });

  // Show notification using Ant Design's notification system
  const showNotification = useCallback((type, message) => {
    notification[type]({
      message: type === "success" ? "Success" : "Error",
      description: message,
      duration: 3,
      placement: "topRight",
      style: {
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }
    });
  }, []);

  // Fetch settings data
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/settings");
        const { categories, statuses, businessProfile } = response.data;
        setCategories(categories || []);
        setStatuses(statuses || []);
        setBusinessProfile(
          businessProfile || {
            companyName: "",
            companyLogo: "",
            phoneNumber: "",
          }
        );
        form.setFieldsValue(businessProfile);
      } catch {
        showNotification("error", "Failed to fetch settings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [axios, showNotification, form]);

  // Handler functions
  const handleEdit = useCallback((type, index, value) => {
    setEditMode({ type, id: index, value });
  }, []);

  const handleSaveEdit = useCallback(
    async (type) => {
      if (editMode.id === null || !editMode.value.trim()) return;

      try {
        const items = type === "category" ? categories : statuses;
        const oldName = items[editMode.id];
        const newName = editMode.value;

        const response = await axios.put(`/api/settings/${type}`, {
          name: oldName,
          newName,
        });

        if (response.status === 200) {
          if (type === "category") {
            setCategories((prev) =>
              prev.map((item, idx) => (idx === editMode.id ? newName : item))
            );
          } else {
            setStatuses((prev) =>
              prev.map((item, idx) => (idx === editMode.id ? newName : item))
            );
          }
          showNotification("success", `${type} updated successfully`);
        }
      } catch {
        showNotification("error", `Failed to update ${type}`);
      } finally {
        setEditMode({ type: null, id: null, value: "" });
      }
    },
    [editMode, categories, statuses, axios, showNotification]
  );

  const handleDelete = useCallback(
    async (type, index) => {
      try {
        const items = type === "category" ? categories : statuses;
        const name = items[index];

        const response = await axios.delete(`/api/settings/${type}`, {
          data: { name },
        });

        if (response.status === 200) {
          if (type === "category") {
            setCategories((prev) => prev.filter((_, idx) => idx !== index));
          } else {
            setStatuses((prev) => prev.filter((_, idx) => idx !== index));
          }
          showNotification("success", `${type} deleted successfully`);
        }
      } catch {
        showNotification("error", `Failed to delete ${type}`);
      }
    },
    [categories, statuses, axios, showNotification]
  );

  const handleAdd = useCallback(
    async (type) => {
      const name = type === "category" ? newCategory : newStatus;
      if (!name.trim()) return;

      try {
        const response = await axios.post(`/api/settings/${type}`, { name });

        if (response.status === 200) {
          if (type === "category") {
            setCategories((prev) => [...prev, name]);
            setNewCategory("");
          } else {
            setStatuses((prev) => [...prev, name]);
            setNewStatus("");
          }
          showNotification("success", `${type} added successfully`);
        }
      } catch {
        showNotification("error", `Failed to add ${type}`);
      }
    },
    [newCategory, newStatus, axios, showNotification]
  );

  const saveGeneralSettings = useCallback(
    async (values) => {
      try {
        setIsLoading(true);
        if (profileImage) {
          const formData = new FormData();
          formData.append("file", profileImage);
          await axios.put("/api/settings/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }

        const response = await axios.put("/api/settings/profile", {
          companyName: values.companyName,
          phoneNumber: values.phoneNumber,
        });

        if (response.status === 200) {
          showNotification("success", "Settings saved successfully");
        }
      } catch {
        showNotification("error", "Failed to save settings");
      } finally {
        setIsLoading(false);
      }
    },
    [axios, showNotification, profileImage]
  );

  const handleImageChange = useCallback((file) => {
    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBusinessProfile((prev) => ({
        ...prev,
        companyLogo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  return (
    <StyledLayout>
      <StyledContent>
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <Spin size="large" tip="Loading..." />
          </div>
        )}
        
        {/* Profile Section */}
        <StyledCard className="mb-8 overflow-hidden">
          <ProfileHeader>
            <ProfileImageContainer>
              <ProfileUpload
                businessProfile={businessProfile}
                onImageChange={handleImageChange}
              />
            </ProfileImageContainer>
          </ProfileHeader>

          <div className="pt-6">
            <ProfileForm
              form={form}
              layout="vertical"
              onFinish={saveGeneralSettings}
              initialValues={businessProfile}
              className="max-w-2xl mx-auto px-4"
            >
              <CardHeader>
                <BuildOutlined className="text-xl text-gray-700" />
                <Title level={4} className="mb-0 ml-2">
                  Profile Settings
                </Title>
              </CardHeader>
              
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[
                  { required: true, message: "Please enter company name" },
                ]}
              >
                <Input
                  prefix={<BuildOutlined className="text-gray-400" />}
                  placeholder="Enter company name"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Contact Number"
                rules={[
                  { required: true, message: "Please enter contact number" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Enter contact number"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <ActionButtonContainer>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={isLoading}
                    style={{ backgroundColor: '#000000', color: '#ffffff' }}
                    size="large"
                  >
                    Save Profile
                  </Button>
                </ActionButtonContainer>
              </Form.Item>
            </ProfileForm>
          </div>
        </StyledCard>

        <Divider className="my-8" />

        {/* Settings Section */}
        <div className="mb-8">
          <CardHeader className="px-2 mb-6">
            <SettingOutlined className="text-xl text-gray-700" />
            <Title level={4} className="mb-0 ml-2">
              System Settings
            </Title>
          </CardHeader>

          <GridContainer>
            {/* Categories Card */}
            <StyledCard
              title="Categories"
              className="h-full"
              bodyStyle={{ padding: '16px' }}
            >
              <AddItemContainer>
                <Input
                  placeholder="New category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="rounded-lg"
                  onPressEnter={() => newCategory.trim() && handleAdd("category")}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd("category")}
                  className="bg-black hover:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  disabled={!newCategory.trim()}
                >
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </AddItemContainer>
              
              {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                  <BuildOutlined className="text-4xl text-gray-300 mb-2" />
                  <Text
                    italic
                    type="secondary"
                    className="block text-center"
                  >
                    No categories added yet
                  </Text>
                  <Text type="secondary" className="text-xs mt-2">
                    Add your first category using the form above
                  </Text>
                </div>
              ) : (
                <List
                  size="large"
                  dataSource={categories}
                  variant="borderless"
                  className="mt-2"
                  renderItem={(item, index) => (
                    <SettingsListItem
                      type="category"
                      item={item}
                      index={index}
                      editMode={editMode}
                      onEdit={handleEdit}
                      onSave={handleSaveEdit}
                      onCancel={() =>
                        setEditMode({ type: null, id: null, value: "" })
                      }
                      onDelete={handleDelete}
                    />
                  )}
                />
              )}
            </StyledCard>

            {/* Statuses Card */}
            <StyledCard
              title="Statuses"
              className="h-full"
              styles={{ body: { padding: "16px" } }}
            >
              <AddItemContainer>
                <Input
                  placeholder="New status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="rounded-lg"
                  onPressEnter={() => newStatus.trim() && handleAdd("status")}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAdd("status")}
                  className="bg-black hover:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  disabled={!newStatus.trim()}
                >
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </AddItemContainer>
              
              {statuses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                  <SettingOutlined className="text-4xl text-gray-300 mb-2" />
                  <Text
                    italic
                    type="secondary"
                    className="block text-center"
                  >
                    No statuses added yet
                  </Text>
                  <Text type="secondary" className="text-xs mt-2">
                    Add your first status using the form above
                  </Text>
                </div>
              ) : (
                <List
                  size="large"
                  dataSource={statuses}
                  variant="borderless"
                  className="mt-2"
                  renderItem={(item, index) => (
                    <SettingsListItem
                      type="status"
                      item={item}
                      index={index}
                      editMode={editMode}
                      onEdit={handleEdit}
                      onSave={handleSaveEdit}
                      onCancel={() =>
                        setEditMode({ type: null, id: null, value: "" })
                      }
                      onDelete={handleDelete}
                    />
                  )}
                />
              )}
            </StyledCard>
          </GridContainer>
        </div>

        <Divider className="my-8" />

        {/* System Prompt Form */}
        <StyledCard className="mb-8">
          <CardHeader className="mb-4">
            <SettingOutlined className="text-xl text-gray-700" />
            <Title level={4} className="mb-0 ml-2">
              System Prompt Configuration
            </Title>
          </CardHeader>
          <SystemPromptForm />
        </StyledCard>
      </StyledContent>
    </StyledLayout>
  );
};

export default React.memo(SettingsPage);