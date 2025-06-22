import Topbar from "@/components/Topbar/Topbar";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchWithAuth } from "@/utils/apiClient";

const AdminPage: React.FC = () => {
    const [shareLink, setShareLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleGenerateLink = async () => {
        setIsGenerating(true);
        try {
            const response = await fetchWithAuth("/share", {
                method: "POST",
            });

            const data = await response.json();

            if (response.ok) {
                const newLink = `${window.location.origin}/share/${data.shareToken}`;
                setShareLink(newLink);
                toast.success("Share link generated successfully!");
            } else {
                // Generic error for non-401 issues
                throw new Error(data.message || "Failed to generate link.");
            }
        } catch (error: any) {
            // Our fetchWithAuth will handle the 401 redirect, 
            // but we catch other errors here.
            if (!error.message.includes("log in again")) {
                 toast.error(error.message);
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.info("You have been logged out.");
        router.push("/login");
    };

    if (loading) {
        return <div className="bg-dark-layer-2 min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }
    
    return (
        <main className=' min-h-screen'>
            <Topbar />
            <div className="max-w-4xl mx-auto p-8 text-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-6">T&P Admin Panel</h1>
                    <button onClick={handleLogout} className="mb-6 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                        Log Out
                    </button>
                </div>
                
                <div className="bg-dark-layer-1 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Generate Shareable Link</h2>
                    <p className="text-gray-400 mb-4">Click the button to generate a unique link to share student data with recruiters.</p>
                    <button
                        onClick={handleGenerateLink}
                        disabled={isGenerating}
                        className='bg-brand-orange text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-orange-s transition duration-300 ease-in-out disabled:opacity-50'
                    >
                        {isGenerating ? "Generating..." : "Generate Link"}
                    </button>

                    {shareLink && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Generated Link:</h3>
                            <div className="mt-2 p-3 bg-dark-fill-2 rounded-md flex items-center justify-between">
                                <code className="text-gray-300 break-all">{shareLink}</code>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareLink);
                                        toast.success("Link copied to clipboard!");
                                    }}
                                    className="ml-4 bg-dark-fill-3 hover:bg-dark-fill-2 text-white px-3 py-1 rounded-md text-xs"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AdminPage;