import React from "react";
import { toast } from "react-toastify";
import {
  Link,
  Form,
  redirect,
  useNavigate,
  ActionFunctionArgs,
} from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import customFetch from "../utils/customFetch";
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

interface ApiError {
  msg: string;
}

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successful!");
      return redirect("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
      return error;
    }
  };

const Login: React.FC = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive to test the application!");
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
