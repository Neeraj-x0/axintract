"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import AddLeadsPopup from "./AddLeadsPopup";
import useAxios from "../../../lib";
import LeadsControls from "./LeadsControler";
import LeadsTable from "./LeadTable";
import { Typography, Spin, Alert, ConfigProvider, theme, Row, Col } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const LeadsDashboard = () => {
  const axios = useAxios();
  const currentRoute = usePathname();
  const listRef = useRef(null);
  const hasFetchedRef = useRef(false);
  const leadsPerPage = 100;

  // State management
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [error, setError] = useState(null);
  const [isAddLeadsOpen, setIsAddLeadsOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // Responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Memoized filtered leads
  const filteredLeads = useMemo(() => {
    let filtered = leads;

    if (statusFilter) {
      filtered = filtered.filter(
        (lead) => lead.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (lead) => lead.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          (lead.name?.toLowerCase() || "").includes(query) ||
          (lead.email?.toLowerCase() || "").includes(query) ||
          (lead.phone?.toLowerCase() || "").includes(query)
      );
    }

    return filtered;
  }, [leads, statusFilter, categoryFilter, searchQuery]);

  // Fetch leads data
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/lead`, {
        params: { page, limit: leadsPerPage },
      });

      if (response.status === 304) {
        setLeads([]);
      } else if (response.status === 200) {
        const { data } = response.data;
        setHasMore(data.length === leadsPerPage);
        setLeads((prevLeads) => {
          // If it's the first page, replace leads, otherwise append
          if (page === 1) return data;
          return [...prevLeads, ...data];
        });
      }
    } catch (error) {
      setError("Failed to fetch leads. Please refresh the page.");
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, [page, axios]);

  // Fetch options (categories, statuses)
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`/api/settings`);
        if (response.status === 200) {
          const { categories, statuses } = response.data;
          setCategoryOptions(categories);
          setStatusOptions(statuses);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, [axios]);

  // Initial fetch on mount and window resize listener
  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchLeads();
      hasFetchedRef.current = true;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchLeads]);

  // Calculate table height based on screen size
  const getMaxTableHeight = useMemo(() => {
    if (windowWidth <= 640) return '50vh'; // Mobile
    if (windowWidth <= 1024) return '60vh'; // Tablet
    return '65vh'; // Desktop
  }, [windowWidth]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, loading]);

  // Handler functions
  const handleSelectAll = useCallback(
    (checked) => {
      setSelectedLeads(checked ? filteredLeads.map((lead) => lead.id) : []);
    },
    [filteredLeads]
  );

  const handleSelectLead = useCallback((id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleBulkAction = useCallback(
    async (action, value) => {
      if (!value || selectedLeads.length === 0) return;

      try {
        setLoading(true);
        const payload = { id: selectedLeads, [action]: value };

        const response = await axios.put(`/api/lead/bulk-update`, payload);

        if (response.status === 200) {
          await fetchLeads();
          setSelectedLeads([]);
        }
      } catch (error) {
        setError(`Failed to update lead ${action}. Please try again.`);
        console.error(`Error updating leads ${action}:`, error);
      } finally {
        setLoading(false);
      }
    },
    [selectedLeads, axios, fetchLeads]
  );

  const handleBulkDelete = useCallback(async () => {
    if (selectedLeads.length === 0) return;

    try {
      setLoading(true);
      const response = await axios.delete(`/api/lead/bulk-delete`, {
        data: { id: selectedLeads },
      });

      if (response.status === 200) {
        await fetchLeads();
        setSelectedLeads([]);
      }
    } catch (error) {
      setError("Failed to delete leads. Please try again.");
      console.error("Error deleting leads:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedLeads, axios, fetchLeads]);

  const handleAddLeads = useCallback(
    async (formData, file) => {
      try {
        setLoading(true);

        if (formData.type === "manual") {
          const response = await axios.post(`/api/lead`, formData);
          if (response.status === 200) {
            await fetchLeads();
            setIsAddLeadsOpen(false);
          }
        }

        if (formData.type === "import" && file) {
          const formDataWithFile = new FormData();
          formDataWithFile.append("file", file);
          const extension = file.name.split(".").pop();
          if (extension && formData.importCategory) {
            formDataWithFile.append("extension", extension);
            formDataWithFile.append("category", formData.importCategory);
          }

          const response = await axios.post(
            `/api/lead/bulk-import`,
            formDataWithFile,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            await fetchLeads();
            setIsAddLeadsOpen(false);
          }
        }
      } catch (error) {
        setError("Failed to add leads. Please try again.");
        console.error("Error adding leads:", error);
      } finally {
        setLoading(false);
      }
    },
    [axios, fetchLeads]
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="fadeIn transition-colors duration-200 bg-white">
      <div className="flex flex-col w-full">
        <div className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-[1920px] mx-auto w-full">
          <Row>
            <Col xs={24}>
              <div className="mb-4 sm:mb-6">
                <Title 
                  level={windowWidth < 640 ? 3 : 2} 
                  style={{ margin: 0, fontWeight: 600 }} 
                  className="font-comfortaa"
                >
                  Lead Management
                </Title>
                <p className="text-gray-500 dark:text-gray-400 mt-1 font-comfortaa text-sm sm:text-base">
                  Manage and track all your leads in one place
                </p>
              </div>
            </Col>
          </Row>

          {error && (
            <Row>
              <Col xs={24}>
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="mb-4 sm:mb-6 font-comfortaa"
                  icon={<ExclamationCircleOutlined />}
                />
              </Col>
            </Row>
          )}

          <LeadsControls
            selectedLeads={selectedLeads}
            onAddLeads={() => setIsAddLeadsOpen(true)}
            onBulkAction={handleBulkAction}
            onBulkDelete={handleBulkDelete}
            statusOptions={statusOptions}
            categoryOptions={categoryOptions}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
            onStatusFilterChange={setStatusFilter}
            onCategoryFilterChange={setCategoryFilter}
            onSearchQueryChange={setSearchQuery}
            isMobile={windowWidth < 768}
          />

          <div className="relative">
            {loading && page === 1 ? (
              <div className="flex items-center justify-center py-8 sm:py-16 bg-white rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Spin indicator={antIcon} tip="Loading leads..." />
              </div>
            ) : (
              <div
                ref={listRef}
                onScroll={handleScroll}
                className="overflow-auto bg-transparent rounded-lg"
                style={{ maxHeight: getMaxTableHeight }}
              >
                <LeadsTable
                  onSelectAll={handleSelectAll}
                  isAllSelected={
                    filteredLeads.length > 0 &&
                    selectedLeads.length === filteredLeads.length
                  }
                  onSelect={handleSelectLead}
                  selectedLeadIds={selectedLeads}
                  leads={filteredLeads}
                  isMobile={windowWidth < 768}
                />
              </div>
            )}

            {loading && page > 1 && (
              <div className="flex justify-center py-4">
                <Spin indicator={antIcon} tip="Loading more..." />
              </div>
            )}
          </div>
        </div>
      </div>

      <AddLeadsPopup
        isOpen={isAddLeadsOpen}
        onClose={() => setIsAddLeadsOpen(false)}
        onSubmit={handleAddLeads}
        category={categoryOptions}
        isLoading={loading}
        isMobile={windowWidth < 768}
      />
    </div>
  );
};

export default LeadsDashboard;