import React, { useEffect } from "react";
import { CartProvider } from "react-use-cart";
import CartPage from "./Cart";
import { CatalogPage } from "./Catalog";

export function Cart(props) {
  return (
    <CartProvider>
      <CartPage {...{ props, setTotalItems: props.setTotalItems }} />
    </CartProvider>
  );
}
export function Catalog(props) {
  return (
    <CartProvider>
      <CatalogPage {...{ props, setTotalItems: props.setTotalItems }} />
    </CartProvider>
  );
}
