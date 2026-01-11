import React from "react";
import { toast } from "react-toastify";
import {
  Form,
  redirect,
  useOutletContext,
  ActionFunctionArgs,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn, DailyQuote } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import { User } from "../types";

interface ApiError {
  msg: string;
}

interface OutletContext {
  user: User;
}

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job added successfully");
      return redirect("all-jobs");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
      return error;
    }
  };

const AddJob: React.FC = () => {
  const { user } = useOutletContext<OutletContext>();

  return (
    <div
      className="page-container"
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">add job</h4>
          <div className="form-center">
            <FormRow type="text" name="position" />
            <FormRow type="text" name="company" />
            <FormRow
              type="text"
              labelText="job location"
              name="jobLocation"
              defaultValue={user.location}
            />
            <FormRowSelect
              labelText="job status"
              name="jobStatus"
              defaultValue={JOB_STATUS.PENDING}
              list={Object.values(JOB_STATUS)}
            />
            <FormRowSelect
              labelText="job type"
              name="jobType"
              defaultValue={JOB_TYPE.FULL_TIME}
              list={Object.values(JOB_TYPE)}
            />
            <SubmitBtn formBtn />
          </div>
        </Form>
      </Wrapper>
      <DailyQuote />
    </div>
  );
};

export default AddJob;
