import { LoginRequestProps, RegisterRequestProps } from "@/@types/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setCurrentUser } from "../slices/authSlice";
import { setCategories, setUpcomingEvents } from "../slices/eventSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		credentials: "include",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			// Add auth headers here if needed
			return headers;
		},
	}),
	endpoints: (builder) => ({
		// Define your endpoints here
		getEvents: builder.query({
			query: () => "events",
		}),
		// Add more endpoints as needed

		//Register user
		registerUser: builder.mutation<any, RegisterRequestProps>({
			query: (credentials) => ({
				url: "v2/onboarding/send-otp-v2",
				method: "POST",
				body: credentials,
			}),
		}),

		//Login User
		loginUser: builder.mutation<any, LoginRequestProps>({
			query: (credentials) => ({
				url: "v1/user/login",
				method: "POST",
				body: credentials,
			}),
		}),

		//Get current user
		getCurrentUser: builder.query({
			query: () => ({
				url: "v1/user/current-user",
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setCurrentUser(data));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		//Get all events
		getAllEvents: builder.query({
			query: () => "v1/events",
		}),

		//Get all event categories
		getAllEventCategories: builder.query({
			query: () => "v1/categories",
			providesTags: ["Categories"],
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setCategories(data?.data));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		//Create event
		createNewEvent: builder.mutation({
			query: (data) => ({
				url: "v1/events",
				method: "POST",
				body: data,
			}),
		}),

		getCategoryById: builder.query({
			query: ({ id }) => `v1/categories/${id}`,
		}),

		getEventsByCategoryId: builder.query({
			query: ({ id }) => `v1/events/category/${id}`,
		}),

		createNewCategory: builder.mutation({
			query: ({ name, description }) => ({
				url: "v1/categories",
				method: "POST",
				body: { name, description },
			}),

			invalidatesTags: ["Categories"],
		}),

		//Get all upcoming events
		getAllUpcomingEvents: builder.query({
			query: () => "v1/events/upcoming",
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setUpcomingEvents(data?.data));
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),

	tagTypes: ["Events", "User", "Categories"],
});

export const {
	useGetEventsQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useGetCurrentUserQuery,
	useGetAllEventsQuery,
	useGetAllEventCategoriesQuery,
	useGetCategoryByIdQuery,
	useGetEventsByCategoryIdQuery,
	useCreateNewCategoryMutation,
	useCreateNewEventMutation,
	useGetAllUpcomingEventsQuery,
} = api;
