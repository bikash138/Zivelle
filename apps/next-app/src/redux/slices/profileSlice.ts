import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProfileType {
  id: string
  name: string
  email: string
  store?: string
  createdAt: string
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
  },
})

export const { setProfile, setLoading, hydrateProfile } = profileSlice.actions

export default profileSlice.reducer
