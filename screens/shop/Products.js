import React, {useEffect} from "react";
import { Button, FlatList, Platform, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const Products = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  props.navigation.setOptions({
    headerTitle: "Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            props.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  });

  //loads page everytime you revisit the page to load products from server
  
  // useEffect(() => {
  //   const willFocus = props.navigation.addListener("willFocus", loadProducts)

  //   return () => {
  //     willFocus.remove()
  //   }
  // }, [loadProducts])

  const selectItemHandler = (id) => {
    props.navigation.navigate("details", {
      productId: id,
    })
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            selectItemHandler(itemData.item.id)
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {selectItemHandler(itemData.item.id)}}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Products;
