import { useState, useEffect } from "react";
import useAxios from "../../../lib";
import { toast } from "react-hot-toast";

export const useMetadata = () => {
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const axios = useAxios();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [categoriesRes, statusesRes, messageCountRes] = await Promise.all(
          [
            axios.get("/api/settings/categories"),
            axios.get("/api/settings/statuses"),
            axios.get("/api/engagements/messageCount"),
          ]
        );
        
        setCategories(categoriesRes.data.categories);
        setStatuses(statusesRes.data.statuses);
        setMessageCount(messageCountRes.data.data);
      } catch {
        toast.error("Failed to fetch metadata");
      }
    };

    fetchMetadata();
  }, [axios]);

  return { categories, statuses, messageCount };
};
