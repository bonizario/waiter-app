import styled from 'styled-components';

export const Board = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem;
  border: 0.1rem solid rgba(204, 204, 204, 0.4);
  border-radius: 1.6rem;

  > header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    font-size: 1.4rem;
  }
`;

export const OrdersContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.4rem;

  > button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    justify-content: center;
    background-color: #ffffff;
    border: 0.1rem solid rgba(204, 204, 204, 0.4);
    height: 12.8rem;
    border-radius: 0.8rem;

    & + button {
      margin-top: 2.4rem;
    }

    > strong {
      font-weight: 500;
    }

    > span {
      color: #666666;
      font-size: 1.4rem;
    }
  }
`;
