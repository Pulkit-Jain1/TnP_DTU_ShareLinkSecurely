import Topbar from "@/components/Topbar/Topbar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

const LoginSchema = z.object({
    username: z.string().min(1, { message: "Username is required." }),
    password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormInputs, string>>>({});
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const validationResult = LoginSchema.safeParse({ username, password });

        if (!validationResult.success) {
            const formattedErrors: Partial<Record<keyof LoginFormInputs, string>> = {};
            validationResult.error.issues.forEach(issue => {
                formattedErrors[issue.path[0] as keyof LoginFormInputs] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://tnp-recruitment-challenge.manitvig.live/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validationResult.data),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Logged in successfully!");
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                router.push("/admin");
            } else {
                throw new Error(data.message || "Invalid credentials.");
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" min-h-screen">
            <Topbar />
            <div className="flex items-center justify-center h-[calc(100vh-5rem)] px-4">
                <div className="w-full max-w-md p-8 space-y-8 bg-dark-layer-1 rounded-lg shadow-lg">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-white">
                            Admin Login
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-dark-fill-2 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
                                    }}
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                            </div>
                            {/* Password input with eye icon */}
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    // Dynamically set type based on state
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    // Added pr-10 for padding on the right to make space for the icon
                                    className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-600 bg-dark-fill-2 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                                    }}
                                />
                                <button
                                    type="button" // Important to prevent form submission
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                        </div>
                        {}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-orange hover:bg-brand-orange-s focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-layer-1 focus:ring-brand-orange disabled:opacity-50"
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;