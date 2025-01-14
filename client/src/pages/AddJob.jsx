import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import { FormRow } from '../components';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../../../server/utils/constants';

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
