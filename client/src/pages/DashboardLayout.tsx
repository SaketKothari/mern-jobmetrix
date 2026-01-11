import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";

import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { DashboardContextType, User, UserResponse } from "../types";

const userQuery = {
  queryKey: ["user"],
  queryFn: async (): Promise<UserResponse> => {
    const { data } = await customFetch.get<UserResponse>("/users/current-user");
    return data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardLayoutProps {
  queryClient: QueryClient;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ queryClient }) => {
  const { data } = useQuery(userQuery);
  const user = data?.user as User;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", String(newDarkTheme));
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logged out successfully!");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// Custom Hook
export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};

export default DashboardLayout;
