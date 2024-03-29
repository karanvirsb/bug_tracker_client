import "./index.css";
import React, { ComponentType } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistor, store } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AxiosInterceptor } from "./Components/AxiosInterceptors";
import NetworkCheck from "./Components/NetworkChecker/NetworkCheck";
import ServerDown from "./Components/ServerDown/ServerDown";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const render = (App: ComponentType) => {
    root.render(
        <React.StrictMode>
            <ServerDown>
                <NetworkCheck>
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
                </NetworkCheck>
            </ServerDown>
        </React.StrictMode>
    );
};

export default render;
