import { useState } from 'react';

import { CartItem } from '../@types/CartItem';
import { Product } from '../@types/Product';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import {
  CategoriesContainer,
  Container,
  Footer,
  MenuContainer,
  FooterContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCancelOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddCartItem(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );
      if (itemIndex < 0) {
        return [...prevState, { product, quantity: 1 }];
      }
      const newCartItems = [...prevState];
      newCartItems[itemIndex].quantity += 1;
      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems(prevState => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );
      const newCartItems = [...prevState];
      if (newCartItems[itemIndex].quantity > 1) {
        newCartItems[itemIndex].quantity -= 1;
      } else {
        newCartItems.splice(itemIndex, 1);
      }
      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu onAddToCart={handleAddCartItem} />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {selectedTable ? (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddCartItem}
              onRemove={handleDecrementCartItem}
            />
          ) : (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
