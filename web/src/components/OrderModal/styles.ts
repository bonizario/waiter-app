import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(0.45rem);
`;

export const ModalBody = styled.div`
  background-color: #ffffff;
  width: 48rem;
  border-radius: 0.8rem;
  padding: 3.2rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-weight: 600;
    font-size: 2.4rem;
  }

  button {
    line-height: 0;
  }
`;

export const StatusContainer = styled.div`
  margin-top: 3.2rem;

  > small {
    font-size: 1.4rem;
    opacity: 0.8;
  }

  > div {
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const OrderDetails = styled.div`
  margin-top: 3.2rem;

  > strong {
    font-weight: 500;
    font-size: 1.4rem;
    opacity: 0.8;
  }
`;

export const OrderItems = styled.div`
  margin-top: 1.6rem;

  .item {
    display: flex;

    & + .item {
      margin-top: 1.6rem;
    }

    > img {
      border-radius: 0.6rem;
    }

    .quantity {
      font-size: 1.4rem;
      color: #666666;
      display: block;
      min-width: 2rem;
      margin-left: 1.2rem;
    }

    .product-details {
      margin-left: 0.4rem;

      > strong {
        display: block;
        margin-bottom: 0.4rem;
      }

      > span {
        font-size: 1.4rem;
        color: #666666;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.4rem;

  > span {
    font-weight: 500;
    font-size: 1.4rem;
    opacity: 0.8;
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 3.2rem;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    background-color: #333333;
    border-radius: 4.8rem;
    color: #ffffff;
    padding: 1.2rem 2.4rem;
  }

  .secondary {
    padding: 1.4rem 2.4rem;
    color: #d73035;
    font-weight: 600;
    margin-top: 1.2rem;
  }
`;
