import React from "react";
import { toast } from "react-toastify";
import {
  useOutletContext,
  Form,
  redirect,
  ActionFunctionArgs,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import customFetch from "../utils/customFetch";
import { FormRow, SubmitBtn, DailyQuote } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
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
    const file = formData.get("avatar") as File | null;

    if (file && file.size > 500000) {
      toast.error("Image size too large");
      return null;
    }

    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
      return redirect("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
      return null;
    }
  };

const Profile: React.FC = () => {
  const { user } = useOutletContext<OutletContext>();
  const { name, lastName, email, location } = user;

  return (
    <div
      className="page-container"
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <Wrapper>
        {/* Since we're sending a file it's important to setup encryption type */}
        {/* Send data on server as form data not as json in case of file upload */}
        <Form method="post" className="form" encType="multipart/form-data">
          <h4 className="form-title">profile</h4>
          <div className="form-center">
            {/* File input */}
            <div className="form-row">
              <label htmlFor="avatar" className="form-label">
                Select an image file (max 0.5 MB)
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="form-input"
                accept="image/*"
              />
            </div>
            <FormRow type="text" name="name" defaultValue={name} />
            <FormRow
              type="text"
              name="lastName"
              labelText="last name"
              defaultValue={lastName}
            />
            <FormRow type="email" name="email" defaultValue={email} />
            <FormRow type="text" name="location" defaultValue={location} />
            <SubmitBtn formBtn />
          </div>
        </Form>
      </Wrapper>
      <DailyQuote />
    </div>
  );
};

export default Profile;
