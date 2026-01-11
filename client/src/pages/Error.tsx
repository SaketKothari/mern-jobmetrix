import React from "react";
import { Link, useRouteError } from "react-router-dom";

import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

interface RouteError {
  status?: number;
  message?: string;
}

const Error: React.FC = () => {
  const error = useRouteError() as RouteError;

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Page not found!</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong!</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
