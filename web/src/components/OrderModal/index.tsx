import { useEffect } from 'react';

import { Order } from '../../@types/Order';
import closeIcon from '../../assets/images/close-icon.svg';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Actions,
  Header,
  ModalBody,
  OrderDetails,
  OrderItems,
  Overlay,
  StatusContainer,
  Total,
} from './styles';

interface OrderModalProps {
  isLoading: boolean;
  onCancelOrder: () => Promise<void>;
  onClose: () => void;
  onChangeOrderStatus: () => void;
  order: Order | null;
  visible: boolean;
}

export function OrderModal({
  isLoading,
  onCancelOrder,
  onClose,
  onChangeOrderStatus,
  order,
  visible,
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <Overlay>
      <ModalBody>
        <Header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar modal" />
          </button>
        </Header>
        <StatusContainer>
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </StatusContainer>
        <OrderDetails>
          <strong>Itens</strong>
          <OrderItems>
            {order.products.map(({ _id, quantity, product }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3333/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28"
                />
                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </OrderItems>
          <Total>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </Total>
        </OrderDetails>
        <Actions>
          {order.status !== 'DONE' && (
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>{order.status === 'WAITING' ? '👨‍🍳' : '✅'}</span>
              <strong>
                {order.status === 'WAITING'
                  ? 'Iniciar Produção'
                  : 'Concluir Pedido'}
              </strong>
            </button>
          )}
          <button
            type="button"
            className="secondary"
            disabled={isLoading}
            onClick={onCancelOrder}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
