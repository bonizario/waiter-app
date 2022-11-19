import { useEffect, useState } from 'react';

import { Order } from '../../@types/Order';
import { api } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data);
    });
  }, []);

  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={orders} />
      <OrdersBoard icon="✅" title="Pronto!" orders={orders} />
    </Container>
  );
}
