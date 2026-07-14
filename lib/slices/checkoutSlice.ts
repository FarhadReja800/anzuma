import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CheckoutState {
  currentStep: number;
  shippingAddress: ShippingAddress | null;
  paymentMethod: string;
  orderNotes: string;
}

const initialState: CheckoutState = {
  currentStep: 1,
  shippingAddress: null,
  paymentMethod: "",
  orderNotes: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setOrderNotes: (state, action: PayloadAction<string>) => {
      state.orderNotes = action.payload;
    },
    resetCheckout: (state) => {
      state.currentStep = 1;
      state.shippingAddress = null;
      state.paymentMethod = "";
      state.orderNotes = "";
    },
  },
});

export const {
  setCurrentStep,
  setShippingAddress,
  setPaymentMethod,
  setOrderNotes,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
