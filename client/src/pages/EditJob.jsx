import { toast } from 'react-toastify';
import { Form, useNavigation, redirect, useLoaderData } from 'react-router-dom';

import customFetch from '../utils/customFetch';
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../server/utils/constants';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const { job } = useLoaderData();
  console.log(job);
  return <div>EditJob Page</div>;
};
export default EditJob;
