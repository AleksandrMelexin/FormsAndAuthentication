import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import "antd/dist/reset.css";
import { Provider } from 'react-redux';
import { AntdConfigProvider } from "./antd.config";
import { store } from "@/shared/store";

export const start = () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
        <Provider store={store}>
          <AntdConfigProvider>
              <Router />
          </AntdConfigProvider>
        </Provider>
    </React.StrictMode>
  );
};
