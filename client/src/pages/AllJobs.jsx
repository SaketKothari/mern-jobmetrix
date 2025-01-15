import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

import customFetch from '../utils/customFetch';
import { JobsContainer, SearchContainer } from '../components';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs');
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const data = useLoaderData();

  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;
