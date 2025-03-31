"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateNewCategoryMutation } from "@/redux/services/api";
import toast from "react-hot-toast";

interface ICreateEventDrawer {
	isOpen: boolean;
	onClose: () => void;
}

const formSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
});

function CreateEventDrawer({ isOpen, onClose }: ICreateEventDrawer) {
	const [createNewCategory, { isLoading }] = useCreateNewCategoryMutation();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const data = {
			name: values.name,
			description: values.description,
		};

		try {
			const response = await createNewCategory(data).unwrap();

			toast.success("Event category successfully");
		} catch (err) {
			console.error("Error creating event:", err);
			toast.error("Failed to create event. Please try again.");
		}
	}
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/60 z-40"
							onClick={onClose}
						/>

						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{
								type: "spring",
								damping: 30,
								stiffness: 300,
							}}
							className="fixed right-0 top-0 h-full w-full max-w-xl bg-[#0A0A0B] border-l border-neutral-800 flex flex-col z-50"
						>
							{/* Header - Fixed */}
							<div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
								<h2 className="text-xl font-semibold text-white">
									Create an event category
								</h2>
								<div className="flex items-center space-x-2">
									{/* <Link
										href={`/events/${event.id}`}
										className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-1.5 px-3 rounded-md text-sm"
									>
										<span>Event Page</span>
										<ExternalLink size={16} />
									</Link> */}

									<button
										onClick={onClose}
										className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
									>
										<svg
											className="w-4 h-4"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M18 6L6 18M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="space-y-5 px-6 py-4"
							>
								<div className="flex flex-col gap-2">
									<label htmlFor="name" className="text-sm text-white">
										Category name
									</label>
									<input
										{...register("name")}
										type="text"
										id="name"
										className="w-full bg-[#141416] rounded-lg border border-white/[0.08] px-4 py-3 text-white placeholder:text-white/[0.3] focus:outline-none focus:border-white/[0.12] text-sm"
										placeholder="AI event talk"
									/>
									{errors?.name && (
										<p className="text-red-500 text-xs font-medium">
											{errors?.name.message}
										</p>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<label
										htmlFor="description"
										className="text-sm text-white"
									>
										Category description
									</label>
									<textarea
										{...register("description")}
										placeholder="What's this category about?"
										className="w-full bg-zinc-900 text-white border-0 rounded-lg px-3 py-2 min-h-[100px] resize-none"
									/>
									{errors?.description && (
										<p className="text-red-500 text-xs font-medium">
											{errors?.description.message}
										</p>
									)}
								</div>

								<button
									type="submit"
									disabled={isLoading}
									className="w-full bg-[#FF5400] text-white py-3 rounded-lg font-medium hover:bg-[#FF5400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading ? "Creating..." : "Create Category"}
								</button>
							</form>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

export default CreateEventDrawer;
