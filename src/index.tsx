import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AxiosInterceptor } from "./Components/AxiosInterceptors";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AxiosInterceptor>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </AxiosInterceptor>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
