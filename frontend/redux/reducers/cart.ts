import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Count = {
    checkout: number
}

const initialState:Count = {
    checkout: 0

};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<number>) => {
      state.checkout = action.payload
    },
    incrementCheckout: (state, action: PayloadAction<number>) => {
      state.checkout += action.payload
    },
    decrementCheckout: (state, action: PayloadAction<number>) => {
      state.checkout -= action.payload

    }
  },
});

// Action creators are generated for each case reducer function
export const { setCheckout, incrementCheckout, decrementCheckout } = cartSlice.actions;

export default cartSlice.reducer;