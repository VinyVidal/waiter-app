import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { api } from "../../../utils/api";
import { formatCurrency } from "../../../utils/formatCurrency";
import { apiUrl } from "../../api/apiUrl";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import { Actions, ItemContainer, ProductContainer, ProductDetails, ProductImage, QuantityContainer, Summary, TotalContainer } from "./styles";

interface CartProps {
  items: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ items, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const total = items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  async function handleConfirmOrder() {
    const payload = {
      table: selectedTable,
      products: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }))
    };

    setIsLoading(true);

    await api.post('/orders', payload);

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {items.length > 0 && (
        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 144 }}
          keyExtractor={(item) => item.product._id}
          renderItem={({ item }) => (
            <ItemContainer>
              <ProductContainer>
                <ProductImage
                  source={{
                    uri: `${apiUrl}/uploads/${item.product.imagePath}`
                  }}
                />

                <QuantityContainer>
                  <Text color="#666" size={14}>
                    {item.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{item.product.name}</Text>
                  <Text color="#666" size={14} style={{ marginTop: 4 }}>
                    {formatCurrency(item.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(item.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(item.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </ItemContainer>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {items.length > 0 && (
            <>
              <Text color="$666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          )}

          {items.length === 0 && (
            <>
              <Text color="#999">Seu carrinho está vazio</Text>
            </>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={items.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
