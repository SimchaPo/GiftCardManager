import React from "react";
import CartPage from "./Cart";
import { CatalogPage } from "./Catalog";

export function Cart(props) {
  return <CartPage {...{ props }} />;
}
export function Catalog(props) {
  return <CatalogPage {...{ props }} />;
}
