import React from "react";
import { toast } from "react-toastify";
import { useQuery, QueryClient } from "@tanstack/react-query";
import {
  Form,
  redirect,
  useLoaderData,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "react-router-dom";
import { AxiosError } from "axios";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import { Job } from "../types";

interface ApiError {
  msg: string;
}

interface JobResponse {
  job: Job;
}

const singleJobQuery = (id: string) => {
  return {
    queryKey: ["job", id],
    queryFn: async (): Promise<JobResponse> => {
      const { data } = await customFetch.get<JobResponse>(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id as string));
      return params.id;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", params.id] });
      toast.success("Job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
      return error;
    }
  };

const EditJob: React.FC = () => {
  const id = useLoaderData() as string;
  const { data } = useQuery(singleJobQuery(id));
  const job = data?.job;

  if (!job) {
    return null;
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
