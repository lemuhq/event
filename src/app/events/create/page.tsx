"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import CreateEventDrawer from "@/components/events/CreateEventDrawer";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { selectEvents } from "@/redux/slices/eventSlice";
import { useCreateNewEventMutation } from "@/redux/services/api";

const eventSchema = z.object({
	title: z.string().min(1, "Event name is required"),
	startDate: z.string().min(1, "Start date is required"),
	startTime: z.string().min(1, "Start time is required"),
	endDate: z.string().min(1, "End date is required"),
	endTime: z.string().min(1, "End time is required"),
	location: z.string().optional(),
	description: z.string().optional(),
	requireApproval: z.boolean().default(false),
	capacity: z.number().optional(),
	ticketPrice: z.number().optional(),
	isPublic: z.boolean().default(true),
	timezone: z.string().default("GMT+01:00"),
	category: z.string().min(1, "Category is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

const categories = [
	"Technology",
	"Music",
	"Business",
	"Food & Drink",
	"Community",
	"Arts",
	"Sports & Fitness",
	"Health & Wellness",
	"Science & Education",
	"Travel & Outdoor",
	"Film & Media",
	"Fashion",
	"Charity & Causes",
	"Other",
];

export default function CreateEventPage() {
	const router = useRouter();
	const [createNewEvent, { isLoading }] = useCreateNewEventMutation();

	const { categories } = useAppSelector(selectEvents);

	const [imageUrl, setImageUrl] = useState<string | null>(null);
	// const [isLoading, setIsLoading] = useState(false);
	const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
	const [showLocationOptions, setShowLocationOptions] = useState(false);
	const [showTicketsModal, setShowTicketsModal] = useState(false);
	const [showCapacityModal, setShowCapacityModal] = useState(false);
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);
	const [showStartTimePicker, setShowStartTimePicker] = useState(false);
	const [showEndTimePicker, setShowEndTimePicker] = useState(false);
	const [showCategories, setShowCategories] = useState(false);

	const [categoryOptions, setCategoryOptions] = useState<
		{ label: string; value: string }[]
	>([]);

	// Date and time state
	const [startDate, setStartDate] = useState("Mon, 24 Mar");
	const [startTime, setStartTime] = useState("16:30");
	const [endDate, setEndDate] = useState("Mon, 24 Mar");
	const [endTime, setEndTime] = useState("17:30");
	const [timezone, setTimezone] = useState({
		name: "Lagos",
		offset: "GMT+01:00",
	});

	const [createCategoryDrawer, setCreateCategoryDrawer] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<EventFormData>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			requireApproval: false,
			isPublic: true,
			startDate: "24 Mar 2025",
			startTime: "16:30",
			endDate: "24 Mar 2025",
			endTime: "17:30",
			timezone: "GMT+01:00",
		},
	});

	// Close all dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Close dropdowns if clicking outside their containers
			if (!target.closest('[data-dropdown="timezone"]')) {
				setShowTimezoneDropdown(false);
			}
			if (!target.closest('[data-dropdown="location"]')) {
				setShowLocationOptions(false);
			}
			if (!target.closest('[data-dropdown="startDate"]')) {
				setShowStartDatePicker(false);
			}
			if (!target.closest('[data-dropdown="endDate"]')) {
				setShowEndDatePicker(false);
			}
			if (!target.closest('[data-dropdown="startTime"]')) {
				setShowStartTimePicker(false);
			}
			if (!target.closest('[data-dropdown="endTime"]')) {
				setShowEndTimePicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (categories) {
			setCategoryOptions(
				categories.map((category) => ({
					label: category.name,
					value: category.id,
				}))
			);
		}
	}, [categories]);

	// Update form state with date/time changes
	useEffect(() => {
		// Update the form values when date/time state changes
		const startDateValue =
			startDate.split(", ")[1].padStart(2, "0") + " Mar 2025";
		const endDateValue =
			endDate.split(", ")[1].padStart(2, "0") + " Mar 2025";

		setValue("startDate", startDateValue);
		setValue("startTime", startTime);
		setValue("endDate", endDateValue);
		setValue("endTime", endTime);
		setValue("timezone", timezone.offset);
	}, [startDate, startTime, endDate, endTime, timezone, setValue]);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (data: EventFormData) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
		// try {
		// 	// setIsLoading(true);

		// 	// Create a complete event object with all the data
		// 	const eventData = {
		// 		...data,
		// 		image: imageUrl,
		// 		// Format dates for API
		// 		start: `${data.startDate} ${data.startTime} ${data.timezone}`,
		// 		end: `${data.endDate} ${data.endTime} ${data.timezone}`,
		// 	};

		// 	console.log("Form data:", eventData);

		// 	// Simulate API call
		// 	await new Promise((resolve) => setTimeout(resolve, 2000));

		// 	toast.success("Event created successfully!");
		// 	router.push("/events");
		// } catch (error) {
		// 	console.error("Error creating event:", error);
		// 	toast.error("Failed to create event. Please try again.");
		// }
	};

	return (
		<div className="min-h-screen bg-black">
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 bg-black z-50 border-b border-white/10">
				<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
					<div className="flex items-center gap-8">
						<Link href="/" className="text-white/50 hover:text-white">
							<svg
								viewBox="0 0 24 24"
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
						</Link>
						<div className="flex items-center gap-6">
							<Link
								href="/events"
								className="text-white/80 hover:text-white flex items-center gap-2"
							>
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								Events
							</Link>
							<Link
								href="/calendars"
								className="text-white/80 hover:text-white flex items-center gap-2"
							>
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								Calendars
							</Link>
							<Link
								href="/discover"
								className="text-white/80 hover:text-white flex items-center gap-2"
							>
								<svg
									className="w-5 h-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								Discover
							</Link>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-white/50">16:30 GMT+1</div>
						<Link
							href="/events/create"
							className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
						>
							Create Event
						</Link>
						<button className="text-white/50 hover:text-white">
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
						<button className="text-white/50 hover:text-white">
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</button>
						<button className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center">
							<svg
								className="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="pt-24 pb-16 max-w-3xl mx-auto px-4">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Image Upload */}
					<div className="relative aspect-[2/1] rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
						<input
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="absolute inset-0 opacity-0 cursor-pointer z-10"
						/>
						{imageUrl ? (
							<img
								src={imageUrl}
								alt="Event banner"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-2">
										<svg
											className="w-6 h-6 text-white/50"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4v16m8-8H4"
											/>
										</svg>
									</div>
									<span className="text-white/50 text-sm">
										Upload Event Image
									</span>
								</div>
							</div>
						)}
					</div>

					{/* Event Name */}
					<input
						type="text"
						placeholder="Event Name"
						{...register("title")}
						className="w-full bg-transparent text-4xl font-light text-white border-none focus:outline-none focus:ring-0 placeholder-white/30"
					/>
					{errors.title && (
						<p className="text-red-400 text-sm">{errors.title.message}</p>
					)}

					{/* Date and Time */}
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="flex-1 space-y-1">
								<div className="flex items-center gap-2 text-white/50">
									<svg
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>Start</span>
								</div>
								<div className="flex items-center gap-2">
									<div
										className="relative flex-1"
										data-dropdown="startDate"
									>
										<input
											type="text"
											value={startDate}
											readOnly
											onClick={() =>
												setShowStartDatePicker(!showStartDatePicker)
											}
											className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2 cursor-pointer"
										/>
										{showStartDatePicker && (
											<div className="absolute top-full left-0 mt-2 w-72 bg-zinc-900 rounded-lg shadow-lg z-10">
												<div className="p-4">
													<div className="flex justify-between items-center mb-4">
														<button
															type="button"
															className="text-white/50 hover:text-white"
														>
															<svg
																className="w-5 h-5"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M15 19l-7-7 7-7"
																/>
															</svg>
														</button>
														<div className="text-white">
															March 2025
														</div>
														<button
															type="button"
															className="text-white/50 hover:text-white"
														>
															<svg
																className="w-5 h-5"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M9 5l7 7-7 7"
																/>
															</svg>
														</button>
													</div>
													<div className="grid grid-cols-7 gap-1">
														{[
															"Su",
															"Mo",
															"Tu",
															"We",
															"Th",
															"Fr",
															"Sa",
														].map((day) => (
															<div
																key={day}
																className="text-white/50 text-center text-xs py-1"
															>
																{day}
															</div>
														))}
														{Array.from(
															{ length: 31 },
															(_, i) => i + 1
														).map((day) => (
															<button
																key={day}
																type="button"
																onClick={() => {
																	setStartDate(
																		`Mon, ${day} Mar`
																	);
																	setShowStartDatePicker(
																		false
																	);
																}}
																className={`text-center py-1 text-sm rounded-full hover:bg-zinc-800 ${
																	day === 24
																		? "bg-purple-700 text-white"
																		: "text-white"
																}`}
															>
																{day}
															</button>
														))}
													</div>
												</div>
											</div>
										)}
									</div>
									<div
										className="relative w-20"
										data-dropdown="startTime"
									>
										<input
											type="text"
											value={startTime}
											readOnly
											onClick={() =>
												setShowStartTimePicker(!showStartTimePicker)
											}
											className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2 cursor-pointer"
										/>
										{showStartTimePicker && (
											<div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg z-10">
												<div className="py-2 max-h-60 overflow-y-auto">
													{Array.from(
														{ length: 24 },
														(_, hour) => {
															return [0, 15, 30, 45].map(
																(minute) => {
																	const timeString = `${hour
																		.toString()
																		.padStart(
																			2,
																			"0"
																		)}:${minute
																		.toString()
																		.padStart(2, "0")}`;
																	return (
																		<button
																			key={timeString}
																			type="button"
																			onClick={() => {
																				setStartTime(
																					timeString
																				);
																				setShowStartTimePicker(
																					false
																				);
																			}}
																			className={`w-full text-left px-4 py-2 hover:bg-zinc-800 ${
																				timeString ===
																				startTime
																					? "bg-purple-700 text-white"
																					: "text-white"
																			}`}
																		>
																			{timeString}
																		</button>
																	);
																}
															);
														}
													).flat()}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="flex-1 space-y-1">
								<div className="flex items-center gap-2 text-white/50">
									<svg
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>End</span>
								</div>
								<div className="flex items-center gap-2">
									<div
										className="relative flex-1"
										data-dropdown="endDate"
									>
										<input
											type="text"
											value={endDate}
											readOnly
											onClick={() =>
												setShowEndDatePicker(!showEndDatePicker)
											}
											className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2 cursor-pointer"
										/>
										{showEndDatePicker && (
											<div className="absolute top-full left-0 mt-2 w-72 bg-zinc-900 rounded-lg shadow-lg z-10">
												<div className="p-4">
													<div className="flex justify-between items-center mb-4">
														<button
															type="button"
															className="text-white/50 hover:text-white"
														>
															<svg
																className="w-5 h-5"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M15 19l-7-7 7-7"
																/>
															</svg>
														</button>
														<div className="text-white">
															March 2025
														</div>
														<button
															type="button"
															className="text-white/50 hover:text-white"
														>
															<svg
																className="w-5 h-5"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M9 5l7 7-7 7"
																/>
															</svg>
														</button>
													</div>
													<div className="grid grid-cols-7 gap-1">
														{[
															"Su",
															"Mo",
															"Tu",
															"We",
															"Th",
															"Fr",
															"Sa",
														].map((day) => (
															<div
																key={day}
																className="text-white/50 text-center text-xs py-1"
															>
																{day}
															</div>
														))}
														{Array.from(
															{ length: 31 },
															(_, i) => i + 1
														).map((day) => (
															<button
																key={day}
																type="button"
																onClick={() => {
																	setEndDate(
																		`Mon, ${day} Mar`
																	);
																	setShowEndDatePicker(false);
																}}
																className={`text-center py-1 text-sm rounded-full hover:bg-zinc-800 ${
																	day === 24
																		? "bg-purple-700 text-white"
																		: "text-white"
																}`}
															>
																{day}
															</button>
														))}
													</div>
												</div>
											</div>
										)}
									</div>
									<div
										className="relative w-20"
										data-dropdown="endTime"
									>
										<input
											type="text"
											value={endTime}
											readOnly
											onClick={() =>
												setShowEndTimePicker(!showEndTimePicker)
											}
											className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2 cursor-pointer"
										/>
										{showEndTimePicker && (
											<div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg z-10">
												<div className="py-2 max-h-60 overflow-y-auto">
													{Array.from(
														{ length: 24 },
														(_, hour) => {
															return [0, 15, 30, 45].map(
																(minute) => {
																	const timeString = `${hour
																		.toString()
																		.padStart(
																			2,
																			"0"
																		)}:${minute
																		.toString()
																		.padStart(2, "0")}`;
																	return (
																		<button
																			key={timeString}
																			type="button"
																			onClick={() => {
																				setEndTime(
																					timeString
																				);
																				setShowEndTimePicker(
																					false
																				);
																			}}
																			className={`w-full text-left px-4 py-2 hover:bg-zinc-800 ${
																				timeString ===
																				endTime
																					? "bg-purple-700 text-white"
																					: "text-white"
																			}`}
																		>
																			{timeString}
																		</button>
																	);
																}
															);
														}
													).flat()}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="relative" data-dropdown="timezone">
								<button
									type="button"
									onClick={() =>
										setShowTimezoneDropdown(!showTimezoneDropdown)
									}
									className="px-4 py-2 bg-zinc-900 rounded text-white"
								>
									{timezone.offset}
									<div className="text-sm text-white/50">
										{timezone.name}
									</div>
								</button>
								{showTimezoneDropdown && (
									<div className="absolute top-full right-0 mt-2 w-80 bg-zinc-900 rounded-lg shadow-lg z-20">
										<div className="p-2">
											<input
												type="text"
												placeholder="Search for a timezone"
												className="w-full bg-zinc-800 text-white border-0 rounded px-3 py-2"
											/>
										</div>
										<div className="max-h-80 overflow-y-auto">
											<div className="p-2">
												<div className="text-sm text-white/50 px-2 py-1">
													Popular Time Zones
												</div>
												{[
													{
														name: "Pacific Time - Los Angeles",
														offset: "GMT-07:00",
													},
													{
														name: "Eastern Time - New York",
														offset: "GMT-04:00",
													},
													{
														name: "United Kingdom Time - London",
														offset: "GMT+00:00",
													},
													{
														name: "Central European Time - Paris",
														offset: "GMT+01:00",
													},
													{ name: "Lagos", offset: "GMT+01:00" },
													{
														name: "Eastern Africa Time - Nairobi",
														offset: "GMT+03:00",
													},
													{
														name: "India Standard Time - Mumbai",
														offset: "GMT+05:30",
													},
													{
														name: "China Standard Time - Beijing",
														offset: "GMT+08:00",
													},
													{
														name: "Japan Standard Time - Tokyo",
														offset: "GMT+09:00",
													},
													{
														name: "Australian Eastern Time - Sydney",
														offset: "GMT+10:00",
													},
												].map((zone, index) => (
													<button
														key={index}
														type="button"
														onClick={() => {
															setTimezone(zone);
															setShowTimezoneDropdown(false);
														}}
														className="w-full px-2 py-1 text-left text-white hover:bg-zinc-800 rounded"
													>
														<div className="flex items-center justify-between">
															<span>{zone.name}</span>
															<span className="text-white/50">
																{zone.offset}
															</span>
														</div>
													</button>
												))}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/*Category*/}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-white/50">
							<svg
								className="w-4 h-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span>Select Category</span>
						</div>

						<div className="relative" data-dropdown="location">
							<input
								type="text"
								{...register("category")}
								placeholder="Event category"
								className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2"
								onFocus={() => setShowCategories(true)}
							/>

							{showCategories && (
								<div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 rounded-lg shadow-lg z-20">
									<div className="p-4 space-y-4">
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<div className="text-sm text-white/50">
													Category Options
												</div>
												<button
													type="button"
													className="text-white/50 hover:text-white"
													onClick={() => setShowCategories(false)}
												>
													<svg
														className="w-4 h-4"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
											<button
												type="button"
												className="w-full flex items-center gap-3 text-white hover:bg-zinc-800 rounded p-2 transition-colors"
												onClick={() => {
													setCreateCategoryDrawer(true);
												}}
											>
												<div className="w-5 h-5 rounded-full flex items-center justify-center">
													<Plus size={14} />
												</div>
												Create a category
											</button>

											<div className="w-full">
												{categoryOptions.length !== 0 &&
													categoryOptions.map(
														(category, index) => (
															<button
																key={index}
																type="button"
																className="w-full text-left text-white hover:bg-zinc-800 rounded p-2 transition-colors"
																onClick={() => {
																	register(
																		"category"
																	).onChange({
																		target: {
																			value: category.value,
																		},
																	});
																	// setCategory(catgeory);
																	setShowCategories(false);
																}}
															>
																<div className="flex items-center gap-2">
																	{/* <div className="w-5 h-5 rounded-full flex items-center justify-center bg-zinc-800 text-white/50">
																		{category.label}
																	</div> */}
																	<div>{category.label}</div>
																</div>
															</button>
														)
													)}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Location */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-white/50">
							<svg
								className="w-4 h-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span>Add Event Location</span>
						</div>
						<div className="relative" data-dropdown="location">
							<input
								type="text"
								{...register("location")}
								placeholder="Offline location or virtual link"
								className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2"
								onFocus={() => setShowLocationOptions(true)}
							/>
							{showLocationOptions && (
								<div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 rounded-lg shadow-lg z-20">
									<div className="p-4 space-y-4">
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<div className="text-sm text-white/50">
													Virtual Options
												</div>
												<button
													type="button"
													className="text-white/50 hover:text-white"
												>
													<svg
														className="w-4 h-4"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
											<div className="space-y-1">
												<button
													type="button"
													className="w-full flex items-center gap-3 text-white hover:bg-zinc-800 rounded p-2 transition-colors"
													onClick={() => {
														register("location").onChange({
															target: {
																value: "Create Zoom meeting (link will be generated)",
															},
														});
														setShowLocationOptions(false);
													}}
												>
													<svg
														className="w-5 h-5 text-[#2D8CFF]"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
														/>
													</svg>
													Create Zoom meeting
												</button>
												<button
													type="button"
													className="w-full flex items-center gap-3 text-white hover:bg-zinc-800 rounded p-2 transition-colors"
													onClick={() => {
														register("location").onChange({
															target: {
																value: "Select existing Zoom meeting",
															},
														});
														setShowLocationOptions(false);
													}}
												>
													<svg
														className="w-5 h-5 text-[#2D8CFF]"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
														/>
													</svg>
													Select existing Zoom
												</button>
												<button
													type="button"
													className="w-full flex items-center gap-3 text-white hover:bg-zinc-800 rounded p-2 transition-colors"
													onClick={() => {
														register("location").onChange({
															target: {
																value: "Create Google Meet (link will be generated)",
															},
														});
														setShowLocationOptions(false);
													}}
												>
													<svg
														className="w-5 h-5 text-[#00AC47]"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
														/>
													</svg>
													Create Google Meet
												</button>
											</div>
										</div>

										<div className="space-y-2">
											<div className="text-sm text-white/50">
												Physical Locations
											</div>
											<div className="space-y-1">
												{[
													"New York City, NY, USA",
													"London, UK",
													"San Francisco, CA, USA",
													"Lagos, Nigeria",
													"Remote",
												].map((location, index) => (
													<button
														key={index}
														type="button"
														className="w-full flex items-center gap-3 text-white hover:bg-zinc-800 rounded p-2 transition-colors"
														onClick={() => {
															register("location").onChange({
																target: { value: location },
															});
															setShowLocationOptions(false);
														}}
													>
														<svg
															className="w-5 h-5 text-white/50"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
															/>
														</svg>
														{location}
													</button>
												))}
											</div>
										</div>

										<div className="text-sm text-white/50">
											If you have a virtual event link, you can enter
											or paste it above.
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Description */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-white/50">
							<svg
								className="w-4 h-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
							<span>Add Description</span>
						</div>
						<textarea
							{...register("description")}
							placeholder="What's your event about?"
							className="w-full bg-zinc-900 text-white border-0 rounded px-3 py-2 min-h-[100px] resize-none"
						/>
					</div>

					{/* Event Options */}
					<div className="space-y-4">
						<h3 className="text-lg text-white">Event Options</h3>

						{/* Tickets */}
						<div className="flex items-center justify-between bg-zinc-900 rounded-lg p-4">
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-white/50"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
									/>
								</svg>
								<span className="text-white">Tickets</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-white">Free</span>
								<button
									type="button"
									onClick={() => setShowTicketsModal(true)}
									className="text-white/50 hover:text-white"
								>
									<svg
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* Require Approval */}
						<div className="flex items-center justify-between bg-zinc-900 rounded-lg p-4">
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-white/50"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span className="text-white">Require Approval</span>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									{...register("requireApproval")}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
							</label>
						</div>

						{/* Capacity */}
						<div className="flex items-center justify-between bg-zinc-900 rounded-lg p-4">
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-white/50"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								<span className="text-white">Capacity</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-white">Unlimited</span>
								<button
									type="button"
									onClick={() => setShowCapacityModal(true)}
									className="text-white/50 hover:text-white"
								>
									<svg
										className="w-4 h-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					{/* Create Event Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-[#FF5400] text-white py-3 rounded-lg font-medium hover:bg-[#FF5400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Creating..." : "Create Event"}
					</button>
				</form>

				{/* Tickets Modal */}
				{showTicketsModal && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-zinc-900 rounded-lg w-full max-w-md p-6">
							<h3 className="text-lg text-white mb-4">
								Accept Payments
							</h3>
							<p className="text-white/70 mb-4">
								Your account is not yet set up to accept payments.
							</p>
							<p className="text-white/70 mb-6">
								We use <span className="text-[#FF5400]">Lemu</span> to
								process payments. Connect or set up a Lemur account to
								start accepting payments. It usually takes less than 5
								minutes.
							</p>
							<button
								type="button"
								className="w-full bg-[#FF5400] text-white py-2 rounded-lg font-medium mb-3 hover:bg-[#FF5400]"
							>
								Connect Lemu
							</button>
							<button
								type="button"
								onClick={() => setShowTicketsModal(false)}
								className="w-full text-white/70 py-2"
							>
								Cancel
							</button>
						</div>
					</div>
				)}

				{/* Capacity Modal */}
				{showCapacityModal && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-zinc-900 rounded-lg w-full max-w-md p-6">
							<h3 className="text-lg text-white mb-4">Max Capacity</h3>
							<p className="text-white/70 mb-4">
								Auto-close registration when the capacity is reached.
								Only approved guests count towards the cap.
							</p>
							<div className="mb-4">
								<label className="block text-white/70 mb-2">
									Capacity
								</label>
								<input
									type="number"
									className="w-full bg-zinc-800 text-white border-0 rounded px-3 py-2"
									placeholder="50"
								/>
							</div>
							<label className="flex items-center gap-3 mb-6">
								<input
									type="checkbox"
									className="rounded bg-zinc-800 border-0"
								/>
								<span className="text-white">
									Over-Capacity Waiting List
								</span>
							</label>
							<div className="flex gap-3">
								<button
									type="button"
									className="flex-1 bg-[#FF5400] text-white py-2 rounded-lg font-medium hover:bg-[#FF5400]"
								>
									Set Limit
								</button>
								<button
									type="button"
									onClick={() => setShowCapacityModal(false)}
									className="flex-1 bg-zinc-800 text-white py-2 rounded-lg font-medium hover:bg-zinc-700"
								>
									Remove Limit
								</button>
							</div>
						</div>
					</div>
				)}
			</main>

			{createCategoryDrawer && (
				<CreateEventDrawer
					isOpen={createCategoryDrawer}
					onClose={() => setCreateCategoryDrawer(false)}
				/>
			)}
		</div>
	);
}
