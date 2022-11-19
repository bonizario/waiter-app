import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { CartItem } from '../@types/CartItem';
import { Category } from '../@types/Category';
import { Product } from '../@types/Product';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { api } from '../utils/api';
import {
  CategoriesContainer,
  Container,
  Footer,
  MenuContainer,
  FooterContainer,
  CenteredContainer,
} from './styles';

export function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/products')]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
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
          onCancelOrder={handleResetOrder}
        />
        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>
            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={handleAddCartItem} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {selectedTable ? (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddCartItem}
              onRemove={handleDecrementCartItem}
              onFinishOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          ) : (
            <Button
              disabled={isLoading}
              onPress={() => setIsTableModalVisible(true)}
            >
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
