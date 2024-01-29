import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

//

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   status: boolean;
//   userData: IUserData | null;
// }

// const initialState: AuthState = {
//   status: false,
//   userData: null,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<IUserData>) => {
//       state.status = true;
//       state.userData = action.payload;
//     },
//     logout: (state) => {
//       state.status = false;
//       state.userData = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
