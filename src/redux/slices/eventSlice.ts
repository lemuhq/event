import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface EventState {
	events: any[];
	upcomingEvents: any[];
	pastEvents: any[];
	categories: any[];
}

const initialState: EventState = {
	events: [],
	upcomingEvents: [],
	pastEvents: [],
	categories: [],
};

const eventSlice = createSlice({
	name: "event",
	initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<any[]>) => {
			state.events = action.payload;
		},
		setCategories: (state, action: PayloadAction<any[]>) => {
			state.categories = action.payload;
		},
		setUpcomingEvents: (state, action: PayloadAction<any[]>) => {
			state.upcomingEvents = action.payload;
		},
	},
});

export const { setEvents, setCategories, setUpcomingEvents } =
	eventSlice.actions;
export default eventSlice.reducer;

export const selectEvents = (state: RootState) => state.event;
