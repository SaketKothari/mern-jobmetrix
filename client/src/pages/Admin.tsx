import React from "react";
import { toast } from "react-toastify";
import { useLoaderData, redirect, LoaderFunctionArgs } from "react-router-dom";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { AxiosError } from "axios";

import { StatItem } from "../components";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { AdminStatsResponse } from "../types";

interface ApiError {
  msg: string;
}

export const loader = async (_args: LoaderFunctionArgs) => {
  try {
    const response = await customFetch.get<AdminStatsResponse>(
      "/users/admin/app-stats"
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    toast.error(
      axiosError?.response?.data?.msg ||
        "You are not authorized to view this page"
    );
    return redirect("/dashboard");
  }
};

const Admin: React.FC = () => {
  const data = useLoaderData() as AdminStatsResponse;
  const { users, jobs } = data;

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
