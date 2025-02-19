import { useLoaderData } from 'react-router-dom';

import customFetch from '../utils/customFetch';
import { ChartsContainer, StatsContainer } from '../components';

export const loader = async () => {
  const response = await customFetch.get('/jobs/stats');
  return response.data;
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
