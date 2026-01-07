import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import { ClassItem } from "../types";

const useClasses = () => {
  const {
    data: classes = [] as ClassItem[],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes/all");
      return res.data as ClassItem[];
    },
  });

  return { classes, loading, refetch };
};

export default useClasses;
