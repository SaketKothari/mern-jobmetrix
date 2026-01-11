import React from "react";
import { Form, useSubmit, Link } from "react-router-dom";

import { FormRow, FormRowSelect } from "..";
import { useAllJobsContext } from "../../pages/AllJobs";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../utils/constants";

const SearchContainer: React.FC = () => {
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const submit = useSubmit();

  const debounce = (onChange: (form: HTMLFormElement) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (form) onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              if (e.currentTarget.form) submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              if (e.currentTarget.form) submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              if (e.currentTarget.form) submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
