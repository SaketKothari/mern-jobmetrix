import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 2rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .quote-container {
    width: 100%;
    max-width: 700px;
    padding: 3rem 2.5rem 2.5rem;
    border-radius: 16px;
    background: var(--background-secondary-color);
    box-shadow: var(--shadow-4);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .quote-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary-500);
  }

  .quote-container.fade-out {
    opacity: 0.3;
    transform: scale(0.98);
  }

  .quote-container.fade-in {
    opacity: 1;
    transform: scale(1);
  }

  .quote-icon-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .quote-icon {
    width: 48px;
    height: 48px;
    color: var(--primary-500);
    opacity: 0.3;
  }

  .quote-text {
    font-size: 1.75rem;
    color: var(--text-color);
    line-height: 1.6;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }

  .quote-text.long-quote {
    font-size: 1.35rem;
  }

  .quote-author {
    font-size: 1.15rem;
    font-weight: 500;
    font-style: italic;
    color: var(--primary-500);
    text-align: center;
    margin-bottom: 2rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  .btn-quote {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    height: 3rem;
    border: none;
    border-radius: 12px;
    color: var(--white);
    background: var(--primary-500);
    padding: 0 2rem;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: var(--shadow-2);
  }

  .btn-quote:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
    background: var(--primary-600);
  }

  .btn-quote:active {
    transform: translateY(0);
  }

  .refresh-icon {
    width: 18px;
    height: 18px;
  }

  .btn-quote:hover .refresh-icon {
    animation: rotate 0.6s ease-in-out infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;

    .quote-container {
      padding: 2rem 1.5rem 2rem;
    }

    .quote-icon {
      width: 36px;
      height: 36px;
    }

    .quote-text {
      font-size: 1.35rem;
    }

    .quote-text.long-quote {
      font-size: 1.1rem;
    }

    .quote-author {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .btn-quote {
      font-size: 0.9rem;
      padding: 0 1.5rem;
    }
  }
`;

export default Wrapper;
