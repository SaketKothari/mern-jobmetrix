import React, { createContext, useContext } from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

import customFetch from "../utils/customFetch";
import { JobsContainer, SearchContainer } from "../components";
import { AllJobsContextType, JobsResponse, SearchValues } from "../types";

const allJobsQuery = (params: SearchValues) => {
  const { search, jobStatus, jobType, sort, page } = params;

  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async (): Promise<JobsResponse> => {
      const { data } = await customFetch.get<JobsResponse>("/jobs", { params });
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]) as SearchValues;
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: params };
  };

const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);

const AllJobs: React.FC = () => {
  const { searchValues } = useLoaderData() as { searchValues: SearchValues };
  const { data } = useQuery(allJobsQuery(searchValues));

  if (!data) {
    return null;
  }

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = (): AllJobsContextType => {
  const context = useContext(AllJobsContext);
  if (context === undefined) {
    throw new Error("useAllJobsContext must be used within an AllJobsProvider");
  }
  return context;
};

export default AllJobs;
