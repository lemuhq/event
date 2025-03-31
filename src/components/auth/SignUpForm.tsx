"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "@/redux/services/api";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
	phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

const SignUpForm = () => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);

	const [registerUser, { isLoading }] = useRegisterUserMutation();

	const {
		register,
		reset,
		setError,
		handleSubmit,
		clearErrors,
		formState: { errors },
		watch,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			phoneNumber: "",
		},
	});

	const watchFirstName = watch("firstName");
	const watchLastName = watch("lastName");
	const watchEmail = watch("email");
	const watchPassword = watch("password");
	const watchPhoneNumber = watch("phoneNumber");

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const data = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
			phoneNumber: values.phoneNumber,
		};

		try {
			const response = await registerUser({
				...data,
			}).unwrap();

			router.replace("/signin");
			toast.success("Account created successfully, please login");
		} catch (error: any) {
			console.log(error, "Error");
			toast.error(error?.data?.message || "Something went wrong");
		}
	}

	function passwordValidation() {
		if (watchPassword) {
			if (watchPassword.length < 8) {
				setError("password", {
					message: "Password must be at least 8 characters long",
				});
			} else if (!/[a-z]/.test(watchPassword)) {
				setError("password", {
					message: "Password must contain at least one lowercase letter",
				});
			} else if (!/[A-Z]/.test(watchPassword)) {
				setError("password", {
					message: "Password must contain at least one uppercase letter",
				});
			} else if (!/[0-9]/.test(watchPassword)) {
				setError("password", {
					message: "Password must contain at least one number",
				});
			} else if (!/[!@#$%^&.,*()]/.test(watchPassword)) {
				setError("password", {
					message: "Password must contain at least one special character",
				});
			} else {
				clearErrors("password");
			}
		}
	}

	/* eslint-disable react-hooks/exhaustive-deps*/
	useEffect(() => {
		passwordValidation();
	}, [watchPassword]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] p-4">
			<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5 pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-md"
			>
				<div className="bg-[#141416] rounded-2xl p-8 backdrop-blur-xl border border-white/[0.08] shadow-xl">
					<div className="mb-6 flex justify-center">
						<div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-orange-500/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
							<svg
								className="w-6 h-6 text-white/70"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M19.4 15C19.1277 15.6171 19.0724 16.3081 19.2321 16.9584C19.3918 17.6087 19.7584 18.1869 20.27 18.61L20.33 18.67C20.7429 19.0832 21.0732 19.5774 21.3033 20.1223C21.5334 20.6672 21.6591 21.2527 21.6738 21.8473C21.6886 22.4418 21.592 23.0338 21.3895 23.5905C21.187 24.1473 20.8824 24.6579 20.4916 25.0916C20.1009 25.5253 19.6321 25.8756 19.1115 26.1246C18.5909 26.3736 18.0279 26.5165 17.4547 26.5458C16.8815 26.5751 16.3085 26.4902 15.7673 26.2962C15.2261 26.1022 14.7268 25.8026 14.3 25.41L14.24 25.35C13.8169 24.8384 13.2387 24.4718 12.5884 24.3121C11.9381 24.1524 11.2471 24.2077 10.63 24.48C10.0256 24.7433 9.51931 25.1754 9.17604 25.7187C8.83278 26.262 8.66767 26.8926 8.69997 27.53"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>

					<h1 className="text-2xl font-semibold text-white text-center mb-2">
						Welcome to EventWave
					</h1>
					<p className="text-neutral-400 text-sm text-center mb-8">
						Please create an account below.
					</p>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full space-y-5"
					>
						<div className="flex flex-col space-y-5 md:space-y-0 md:gap-3 md:flex-row">
							<div className="flex flex-col gap-2">
								<label
									htmlFor="firstName"
									className="text-sm text-white"
								>
									First Name
								</label>
								<input
									{...register("firstName")}
									type="text"
									id="firstName"
									className="w-full bg-[#141416] rounded-lg border border-white/[0.08] px-4 py-3 text-white placeholder:text-white/[0.3] focus:outline-none focus:border-white/[0.12] text-sm"
									placeholder="John"
								/>
								{errors?.firstName && (
									<p className="text-red-500 text-xs font-medium">
										{errors?.firstName.message}
									</p>
								)}
							</div>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="lastName"
									className="text-sm text-white"
								>
									Last Name
								</label>
								<input
									{...register("lastName")}
									type="text"
									id="lastName"
									className="w-full bg-[#141416] rounded-lg border border-white/[0.08] px-4 py-3 text-white placeholder:text-white/[0.3] focus:outline-none focus:border-white/[0.12] text-sm"
									placeholder="Doe"
								/>
								{errors?.lastName && (
									<p className="text-red-500 text-xs font-medium">
										{errors?.lastName.message}
									</p>
								)}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="text-sm text-white">
								Email
							</label>
							<input
								{...register("email")}
								type="email"
								id="email"
								className="w-full bg-[#141416] rounded-lg border border-white/[0.08] px-4 py-3 text-white placeholder:text-white/[0.3] focus:outline-none focus:border-white/[0.12] text-sm"
								placeholder="johndoe@gmail.com"
							/>
							{errors?.email && (
								<p className="text-red-500 text-xs font-medium">
									{errors?.email.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="phoneNumber"
								className="text-sm text-white"
							>
								Phone Number
							</label>
							<input
								{...register("phoneNumber")}
								type="phoneNumber"
								id="phoneNumber"
								className="w-full bg-[#141416] rounded-lg border border-white/[0.08] px-4 py-3 text-white placeholder:text-white/[0.3] focus:outline-none focus:border-white/[0.12] text-sm"
								placeholder="08123456789"
							/>
							{errors?.phoneNumber && (
								<p className="text-red-500 text-xs font-medium">
									{errors?.phoneNumber.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="password" className="text-sm text-white">
								Password
							</label>
							<div className="relative">
								<input
									{...register("password")}
									type={isVisible ? "text" : "password"}
									id="password"
									className="w-full relative bg-[#141416] rounded-lg border border-white/[0.08] px-4 py-3 text-white placeholder:text-white/[0.3] focus:outline-none focus:border-white/[0.12] focus:ring-0 focus-within:ring-0 text-sm"
									placeholder="Password@12"
								/>
								<button
									type="button"
									className="absolute top-[50%] -translate-y-[50%] right-5"
									onClick={() => {
										setIsVisible(!isVisible);
									}}
								>
									{isVisible ? (
										<Eye size={18} />
									) : (
										<EyeOff size={18} />
									)}
								</button>
							</div>
							{errors?.password && (
								<p className="text-red-500 text-xs font-medium">
									{errors?.password.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full bg-white text-black font-medium px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={
								!watchFirstName ||
								!watchLastName ||
								!watchEmail ||
								!watchPassword ||
								!watchPhoneNumber ||
								isLoading
							}
						>
							{isLoading ? "Loading..." : "Create an account"}
						</button>

						<div className="text-center">
							<p className="text-[#ccc] text-sm">
								Already have an account?{" "}
								<Link
									href="/signin"
									className="text-white font-semibold hover:underline"
								>
									Sign In
								</Link>
							</p>
						</div>
					</form>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpForm;
