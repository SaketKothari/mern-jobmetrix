import { toast } from "react-toastify";
import { redirect, ActionFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import customFetch from "../utils/customFetch";

interface ApiError {
  msg: string;
}

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
