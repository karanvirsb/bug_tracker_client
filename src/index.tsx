import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistor, store } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
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
                <PersistGate persistor={persistor}>
                    <AxiosInterceptor>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </AxiosInterceptor>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
