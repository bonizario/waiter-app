import { Order } from '../../@types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    _id: '63742b74a71c78c0a411ac75',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1668556008750_quatro-queijos.png',
          price: 40,
        },
        quantity: 2,
        _id: '63742b74a71c78c0a411ac76',
      },
      {
        product: {
          name: 'Coca-Cola',
          imagePath: '1668556805551_coca-cola.png',
          price: 7,
        },
        quantity: 3,
        _id: '63742b74a71c78c0a411ac77',
      },
    ],
  },
  {
    _id: '63742bd9ea02db33eaa655bb',
    table: '1',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Coca-Cola',
          imagePath: '1668556805551_coca-cola.png',
          price: 7,
        },
        quantity: 1,
        _id: '63742bd9ea02db33eaa655bc',
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em preparação" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto!" orders={[]} />
    </Container>
  );
}
