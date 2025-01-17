import { toast } from 'react-toastify';
import { Form, useNavigation, redirect, useLoaderData } from 'react-router-dom';

import customFetch from '../utils/customFetch';
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../server/utils/constants';

export const loader = async ({ params }) => {
  console.log(params);
  return null;
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  return <div>EditJob Page</div>;
};
export default EditJob;
