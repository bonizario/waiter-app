import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../@types/CartItem';
import { Product } from '../../@types/Product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { ConfirmedOrderModal } from '../ConfirmedOrderModal';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onFinishOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onFinishOrder,
  onRemove,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = cartItems.reduce(
    (acc, { product, quantity }) => acc + quantity * product.price,
    0
  );

  async function handleConfirmOrder() {
    setIsLoading(true);
    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map(cartItem => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    });
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onFinishOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <ConfirmedOrderModal onOk={handleOk} visible={isModalVisible} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          style={{ marginBottom: 20, maxHeight: 150 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={cartItem => cartItem.product._id}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.253:3333/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          loading={isLoading}
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
