import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Address = {
  id: string;
  customerId: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export interface ProfileType {
  id: string
  name: string
  email: string
  store?: string
  createdAt: string
  addresses: Address[]
  role: "SELLER" | "CUSTOMER"
}

// Define the state interface
interface ProfileState {
  profile: ProfileType | null
  loading: boolean
}

// Initialize state with proper typing
const initialState: ProfileState = {
  profile: null,
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    hydrateProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
      state.profile = action.payload.profile;
    },
    setProfile(state, action: PayloadAction<ProfileType>) {
      state.profile = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addAddress(state, action){
      if (!state.profile || !state.profile.addresses) return;
      state.profile.addresses.unshift(action.payload)
    },
    updateAddress(state, action){
      if (!state.profile || !state.profile.addresses) return;
      state.profile.addresses = state.profile.addresses.map(addr =>
        addr.id === action.payload.id ? action.payload : addr
      )
    },
    removeAddress(state, action){
      if (!state.profile || !state.profile.addresses) return;
      state.profile.addresses = state.profile.addresses.filter(addr => addr.id !== action.payload)
    }
  },
})

export const { setProfile, setLoading, hydrateProfile, addAddress, updateAddress, removeAddress } = profileSlice.actions

export default profileSlice.reducer
