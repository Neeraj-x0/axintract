import { useState, useCallback } from "react";
import useAxios from "../../../lib";
import { toast } from "react-hot-toast";

export const useEngagements = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [engagements, setEngagements] = useState({ engagements: [] });

  const fetchEngagements = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/engagements");
      setEngagements(data.data);
    } catch {
      toast.error("Failed to fetch engagements");
    } finally {
      setLoading(false);
    }
  }, [axios]);

  const handleAddEngagement = useCallback(
    async (data) => {
      try {
        setLoading(true);
        await axios.post("/api/engagements", data);
        toast.success("Engagement created successfully");
        await fetchEngagements();
        return true;
      } catch {
        toast.error("Failed to create engagement");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchEngagements, axios]
  );

  const handleBulkAction = useCallback(
    async (action, value, selectedIds) => {
      try {
        setLoading(true);
        if (action === "delete") {
          await axios.delete("/api/engagements", { data: { selectedIds } });
          toast.success("Engagements deleted successfully");
        } else {
          await axios.patch("/api/engagements", {
            selectedIds,
            [action]: value,
          });
          toast.success(`Engagements ${action} updated successfully`);
        }
        await fetchEngagements();
      } catch {
        toast.error(`Failed to ${action} engagements`);
      } finally {
        setLoading(false);
      }
    },
    [fetchEngagements, axios]
  );

  return {
    engagements: engagements.engagements,
    loading,
    fetchEngagements,
    handleAddEngagement,
    handleBulkAction,
  };
};
