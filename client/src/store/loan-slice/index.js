// store/loan-slice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loans: [],
  isLoading: false,
  error: null,
};

// ✅ Add Loan
export const addLoan = createAsyncThunk("/loan/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/loans/add-loan", formData, {
        withCredentials: true,
      });
      return response.data; // { success: true, loan }
    } catch (err) {
      return rejectWithValue(err.response?.data || { success: false, message: "Failed to add loan" });
    }
  }
);

// ✅ Fetch All Loans
export const fetchLoans = createAsyncThunk("/loan/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/loans/get-loan", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { success: false, message: "Failed to fetch loans" });
    }
  }
);

// ✅ Update Loan
export const updateLoan = createAsyncThunk("/loan/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/loans/update-loan/${id}`, formData, {
        withCredentials: true,
      });
      return response.data; // returns updated loan
    } catch (err) {
      return rejectWithValue(err.response?.data || { success: false, message: "Failed to update loan" });
    }
  }
);

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    clearLoans: (state) => {
      state.loans = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ➡️ Add Loan
      .addCase(addLoan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLoan.fulfilled, (state, action) => {
        console.log("Add Loan Fulfilled:", action.payload);
        state.isLoading = false;
        if (action.payload.success) {
          state.loans.push(action.payload.loan);
        } else {
          state.error = action.payload.message || "Failed to add loan";
        }
      })
      .addCase(addLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to add loan";
      })

      // ➡️ Fetch Loans
      .addCase(fetchLoans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.loans = action.payload.loans;
        } else {
          state.error = action.payload.message || "Failed to fetch loans";
        }
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch loans";
      })

      // ➡️ Update Loan
      .addCase(updateLoan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        console.log("Update Loan Fulfilled:", action.payload);
        state.isLoading = false;
        if (action.payload?._id) {
          state.loans = state.loans.map((loan) =>
            loan._id === action.payload._id ? action.payload : loan
          );
        } else {
          state.error = action.payload.message || "Failed to update loan";
        }
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to update loan";
      });
  },
});

export const { clearLoans } = loanSlice.actions;
export default loanSlice.reducer;
