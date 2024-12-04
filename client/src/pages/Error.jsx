import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <Link to="/">back home</Link>
    </div>
  );
};

export default Error;
