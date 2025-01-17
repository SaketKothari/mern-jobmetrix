import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

import customFetch from '../utils/customFetch';

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.delete(`/jobs/${params.id}`, data);
    toast.success('Job deleted successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs');
};
