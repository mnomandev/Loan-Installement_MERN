import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import loanReducer from "./loan-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    loan: loanReducer,
  }
});

export default store;