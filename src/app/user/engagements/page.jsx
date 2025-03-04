"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Loader2, MessageCircle, X } from "lucide-react";
import CreateEngagementPopup from "./addEngagement";
import EngagementTable from "./EngagementTable";
import { useEngagements } from "./useEngagement";
import { useMetadata } from "./useMetadata";
import { useFilters } from "./useFilters";
import EngagementControls from "./tableControl";
import { Typography, ConfigProvider, theme } from "antd";
const { Title } = Typography;

const EngagementDashboard = () => {
  const {
    engagements,
    loading,
    handleAddEngagement,
    handleBulkAction,
    fetchEngagements,
  } = useEngagements();

  const { categories, statuses } = useMetadata();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  // Add responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Fetch engagements on initial load and handle window resize
  useEffect(() => {
    fetchEngagements();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchEngagements]);

  // Calculate table height based on screen size
  const getMaxTableHeight = useCallback(() => {
    if (windowWidth <= 640) return '50vh'; // Mobile
    if (windowWidth <= 1024) return '60vh'; // Tablet
    return '65vh'; // Desktop
  }, [windowWidth]);

  const {
    searchQuery,
    statusFilter,
    categoryFilter,
    handleSearch,
    handleStatusFilter,
    handleCategoryFilter,
    filteredEngagements,
  } = useFilters(engagements);

  const handleSelectAll = useCallback(
    (checked) => {
      setSelectedIds(
        checked
          ? filteredEngagements
              .filter((e) => e._id !== undefined)
              .map((e) => e._id.toString())
          : []
      );
    },
    [filteredEngagements]
  );

  const handleSelectOne = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-500 text-sm font-medium">
            Loading engagements...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <div className="min-h-screen bg-white">
        <div className="flex flex-col w-full">
          <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto w-full">
            {/* Header Section */}
            <div className="mb-6">
              <Title level={2} style={{ margin: 0, fontWeight: 600 }} className="font-comfortaa">
                Engagements
              </Title>
              <p className="text-gray-500 dark:text-gray-400 mt-1 font-comfortaa">
                Manage your leads and customer interactions
              </p>
            </div>

            {/* Control Bar */}
            <EngagementControls
              categories={categories}
              statuses={statuses}
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              searchQuery={searchQuery}
              onStatusFilterChange={handleStatusFilter}
              onCategoryFilterChange={handleCategoryFilter}
              onSearchQueryChange={handleSearch}
              onAddEngagement={() => setIsModalOpen(true)}
              onBulkAction={handleBulkAction}
              selectedIds={selectedIds}
            />

            {/* Table Container with responsive height */}
            <div 
              className="bg-white border-gray-200 border-t-0"
              style={{ 
                maxHeight: getMaxTableHeight(),
                overflowY: 'auto',
                transition: 'max-height 0.2s ease-in-out'
              }}
            >
              {filteredEngagements.length > 0 ? (
                <EngagementTable
                  engagements={filteredEngagements}
                  selectedIds={selectedIds}
                  onSelectAll={handleSelectAll}
                  onSelectOne={handleSelectOne}
                  windowWidth={windowWidth}
                />
              ) : (
                <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
                  <div className="p-4 rounded-full mb-4">
                    <MessageCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No engagements found
                  </h3>
                  <p className="text-gray-500 max-w-md mb-6">
                    {searchQuery || categoryFilter || statusFilter
                      ? "Try adjusting your filters or search query to find what you're looking for."
                      : "Get started by creating your first engagement."}
                  </p>
                  {(searchQuery || categoryFilter || statusFilter) && (
                    <button
                      onClick={() => {
                        handleSearch("");
                        handleStatusFilter("");
                        handleCategoryFilter("");
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-4 w-4" />
                      Clear all filters
                    </button>
                  )}
                  {!searchQuery && !categoryFilter && !statusFilter && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Create New Engagement
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Modal */}
            <CreateEngagementPopup
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={async (data) => {
                await handleAddEngagement(data);
                setIsModalOpen(false);
              }}
              categories={categories}
              statuses={statuses}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default React.memo(EngagementDashboard);
