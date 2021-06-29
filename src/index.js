import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import { ProvideAuth } from "./hooks/use-auth";
import { CartProvider } from "react-use-cart";
import { ProvideChat } from "./hooks/useChat";
import { swDev } from "./swDev";
import { ProvideSocket } from "./hooks/useSocket";
import { ProvideBlog } from "./hooks/useBlog";
import "react-credit-cards/es/styles-compiled.css";

ReactDOM.render(
  <React.StrictMode>
    <ProvideSocket>
      <ProvideAuth>
        <ProvideBlog>
          <ProvideChat>
            <CartProvider>
              <App />
            </CartProvider>
          </ProvideChat>
        </ProvideBlog>
      </ProvideAuth>
    </ProvideSocket>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

swDev();
reportWebVitals();
