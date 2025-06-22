import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// This page will now act as a gatekeeper, redirecting users based on their auth status.
const HomePage = () => {
	const router = useRouter();

	useEffect(() => {
		// Check for the access token in localStorage
		const token = localStorage.getItem("accessToken");

		if (token) {
			// If the user is logged in, redirect to the admin dashboard.
			// Using router.replace prevents the user from clicking "back" to this empty page.
			router.replace("/admin");
		} else {
			// If the user is not logged in, redirect to the login page.
			router.replace("/login");
		}
	}, [router]);

	// Render a simple loading screen while the redirect happens.
	// This prevents any flash of old content.
	return (
		<>
			<Head>
				<title>T&P Recruitment Challenge</title>
			</Head>
			<div className="bg-dark-layer-2 min-h-screen flex items-center justify-center">
				<div className="text-white text-lg animate-pulse">Loading...</div>
			</div>
		</>
	);
};

export default HomePage;