import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: 0.75rem;
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  .form-title {
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
    font-size: 1.25rem;
    position: relative;
    padding-bottom: 0.75rem;
  }
  .form-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 3px;
    background: var(--primary-500);
    border-radius: 2px;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1.25rem;
    column-gap: 1.5rem;
  }
  .form-label {
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }
  .form-input,
  .form-select {
    height: 42px;
    border: 1px solid var(--grey-200);
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    background: var(--background-color);
  }
  .form-input:focus,
  .form-select:focus {
    border-color: var(--primary-400);
    box-shadow: 0 0 0 3px var(--primary-100);
    outline: none;
  }
  .form-btn {
    align-self: end;
    margin-top: 0.5rem;
    display: grid;
    place-items: center;
    height: 42px;
    font-weight: 500;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  .form-btn:hover {
    transform: translateY(-1px);
  }
  .delete-btn {
    background: var(--grey-100);
    color: var(--grey-600);
    border: 1px solid var(--grey-200);
  }
  .delete-btn:hover {
    background: var(--grey-200);
    color: var(--grey-700);
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
