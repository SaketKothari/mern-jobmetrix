import React from "react";
import { toast } from "react-toastify";
import { Form, redirect, Link, ActionFunctionArgs } from "react-router-dom";

import customFetch from "../utils/customFetch";
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { AxiosError } from "axios";

interface ApiError {
  msg: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    toast.error(axiosError?.response?.data?.msg);
    return error;
  }
};

const Register: React.FC = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
