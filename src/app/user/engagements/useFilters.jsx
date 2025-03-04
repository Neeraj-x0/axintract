import { useState, useCallback, useMemo } from 'react';

export const useFilters = (engagements) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status);
  }, []);

  const handleCategoryFilter = useCallback((category) => {
    setCategoryFilter(category);
  }, []);

  const filteredEngagements = useMemo(() => {
    console.log(engagements);
    return engagements.filter((engagement) => {
      const matchesSearch =
        !searchQuery ||
        engagement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engagement.notes?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !statusFilter || engagement.status === statusFilter;
      const matchesCategory =
        !categoryFilter || engagement.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [engagements, searchQuery, statusFilter, categoryFilter]);

  return {
    searchQuery,
    statusFilter,
    categoryFilter,
    handleSearch,
    handleStatusFilter,
    handleCategoryFilter,
    filteredEngagements,
  };
};