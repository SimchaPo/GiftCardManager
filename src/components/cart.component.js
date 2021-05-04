import React, { Component } from "react";

import { Cart, AddCartButton } from "react-cart-components";

const products = [
  {
    id: 1,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 200.0,
    image: "https://colorlib.com/preview/theme/divisima/img/product/6.jpg",
  },
  {
    id: 2,
    name: "Black and White Stripes Dress",
    sku: "kskskskks",
    price: 300.0,
    image: "https://colorlib.com/preview/theme/divisima/img/product/5.jpg",
  },
  {
    id: 3,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 400.0,
    image: "https://colorlib.com/preview/theme/divisima/img/product/7.jpg",
  },
  {
    id: 4,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 400.0,
    image: "https://colorlib.com/preview/theme/divisima/img/product/8.jpg",
  },
];

class Example extends Component {
  render() {
    return (
      <Cart currency="USD">
        <div>
          {products.map((product, key) => {
            return (
              <div className="col" key={key}>
                <div className="product-item">
                  <div className="pi-pic">
                    <img src={product.image} />
                    <div className="pi-links">
                      <AddCartButton
                        product={product}
                        styles={{
                          backgroundColor: "#009688",
                          color: "white",
                          border: "0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="pi-text">
                    <p>{product.name}</p>
                    <h6>{product.price}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Cart>
    );
  }
}

export default Example;
