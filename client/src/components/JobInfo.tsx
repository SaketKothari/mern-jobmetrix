import React, { ReactNode } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

interface JobInfoProps {
  icon: ReactNode;
  text: string;
}

const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
