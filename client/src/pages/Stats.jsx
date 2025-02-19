import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import customFetch from '../utils/customFetch';
import { ChartsContainer, StatsContainer } from '../components';

export const loader = async () => {
  return null;
  const response = await customFetch.get('/jobs/stats');
  return response.data;
};

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => customFetch.get('/jobs/stats'),
  });

  if (isLoading) return <h4>Loading...</h4>;
  if (isError) return <h4>There was an error...</h4>;
  const { defaultStats, monthlyApplications } = data.data;

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
