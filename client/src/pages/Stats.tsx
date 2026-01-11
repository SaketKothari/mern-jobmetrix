import React from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";

import customFetch from "../utils/customFetch";
import { ChartsContainer, StatsContainer } from "../components";
import { StatsResponse } from "../types";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async (): Promise<StatsResponse> => {
    const response = await customFetch.get<StatsResponse>("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats: React.FC = () => {
  const { data } = useQuery(statsQuery);

  if (!data) {
    return null;
  }

  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
