import { ID } from "@/types/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
	authState: boolean;
	userID: ID
	userName: string;
	email: string;
	number: string;
	gender?: string;
    city?: string;
    interestedCourse?: string;
}

const initialState: IAuthState = {
	authState: false,
	userID: null,
	userName: "",
	email: "",
	number: "",
	gender: "",
  	city: "",
  	interestedCourse: "",
};

let clearSessionTimer: NodeJS.Timeout | null = null;

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthState: (state, action: PayloadAction<IAuthState>) => {
			state.authState = action.payload.authState;
			state.userID = action.payload.userID;
			state.userName = action.payload.userName;
			state.email = action.payload.email;
			state.number = action.payload.number;
			state.gender = action.payload.gender;
			state.city = action.payload.city;
			state.interestedCourse = action.payload.interestedCourse;

			if (clearSessionTimer) {
				clearTimeout(clearSessionTimer);
			}
			clearSessionTimer = setTimeout(() => {
				clearSession();
			}, 60 * 60 * 1000);

		},
		clearAuthState: (state) => {
			state.authState = false;
			state.userID = null;
			state.userName = "";
			state.email = "";
			state.number = "";
			state.interestedCourse = "";
			state.city = "";
			state.gender = "";
			clearSession();
		},
	},
});

export const { setAuthState, clearAuthState } = authSlice.actions;

const clearSession = () => {
	localStorage.removeItem('persist:auth');
	localStorage.clear();
	clearSessionTimer = null;
};


export const authReducer = authSlice.reducer;