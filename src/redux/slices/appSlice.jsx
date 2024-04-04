import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = {...action.payload}
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {}
      state.isLoggedIn = false
    }
  }
})

export const {signIn, signOut} = appSlice.actions
export default appSlice.reducer