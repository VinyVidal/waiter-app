import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { Button } from "../components/Button";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { TableModal } from "../components/TableModal";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { CategoriesContainer, CenteredContainer, Footer, FooterContainer, MenuContainer } from "./styles";
import { Container } from "./styles";

import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/Category";
import { api } from "../../utils/api";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const categoriesResponse = await api.get('/categories');
      const productsResponse = await api.get('/products');

      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    }

    loadData();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = categoryId ? `/categories/${categoryId}/products` : `/products`;

    setIsLoadingProducts(true);

    const response = await api.get(route);

    setProducts(response.data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(item => item.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          product,
          quantity: 1,
        });
      }

      const newItems = [...prevState];
      const item = newItems[itemIndex];
      newItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(item => item.product._id === product._id);

      const item = prevState[itemIndex];
      const newItems = [...prevState];

      if (item.quantity === 1) {
        newItems.splice(itemIndex, 1);

        return newItems;
      }

      newItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newItems;
    })
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />

        {!isLoading && (
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
                {
                  products.length > 0 && (
                    <MenuContainer>
                      <Menu
                        products={products}
                        onAddToCart={handleAddToCart}
                      />
                    </MenuContainer>
                  )
                }

                {products.length === 0 && (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}

      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              items={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  )
}
