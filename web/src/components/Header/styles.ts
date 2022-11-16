import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
  background-color: #d73035;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 121.6rem;

  .page-details {
    h1 {
      color: #ffffff;
      font-size: 3.2rem;
    }

    h2 {
      color: #ffffff;
      font-size: 1.6rem;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 0.6rem;
    }
  }
`;
