import styled from 'styled-components';

const StyledBtn = styled.button`
  font-size: 1.5rem;
  background: red;
  color: white;
`;

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <StyledBtn>Styled Button</StyledBtn>
    </div>
  );
};
export default Landing;
