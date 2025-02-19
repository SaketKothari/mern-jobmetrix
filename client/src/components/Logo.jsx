import styled from 'styled-components';
import { FaBriefcase } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Logo';

const JobIcon = styled(FaBriefcase)`
  color: var(--primary-500);
  margin-right: 0.5rem;
  font-size: 2rem;
`;

const Logo = () => {
  return (
    <Wrapper>
      <JobIcon />
      JobMetrix
    </Wrapper>
  );
};

export default Logo;
