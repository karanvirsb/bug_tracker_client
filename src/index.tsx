import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./Store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
