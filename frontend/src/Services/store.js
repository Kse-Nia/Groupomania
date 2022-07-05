import {
    configureStore
} from "@reduxjs/toolkit";
import authService from "./auth-services";
import messageReducer from "./message-services";

const reducer = {
    auth: authService,
    message: messageReducer
}
const store = configureStore({
    reducer: reducer,
    devTools: true,
})
export default store;