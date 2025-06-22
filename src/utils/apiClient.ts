import { toast } from "react-toastify";

const API_BASE_URL = "https://tnp-recruitment-challenge.manitvig.live";

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    let accessToken = localStorage.getItem("accessToken");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        "Authorization": `Bearer ${accessToken}`,
    };

    let response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (response.status === 401) {
        console.log("Access token expired. Attempting to refresh...");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            logoutAndRedirect();
            throw new Error("Session expired. Please log in again.");
        }

        try {
            // ================== THIS IS THE DEFINITIVE FIX ==================
            const refreshResponse = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // NO Authorization header here, as per the API docs
                },
                // The token is sent in the BODY, not the header
                body: JSON.stringify({ refreshToken: refreshToken }),
            });
            // ================================================================

            const refreshData = await refreshResponse.json();

            if (!refreshResponse.ok) {
                // This will now only happen if the refresh token itself is expired/invalid
                throw new Error("Could not refresh session. Please log in again.");
            }
            
            // The API might send back a new refresh token, so we save it
            const newAccessToken = refreshData.accessToken;
            const newRefreshToken = refreshData.refreshToken;
            localStorage.setItem("accessToken", newAccessToken);
            if (newRefreshToken) {
                localStorage.setItem("refreshToken", newRefreshToken);
            }
            console.log("Access and refresh tokens updated successfully.");

            const newHeaders = {
                ...headers,
                "Authorization": `Bearer ${newAccessToken}`,
            };
            console.log("Retrying the original request...");
            response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers: newHeaders });

        } catch (error) {
            // If any part of the refresh process fails, we must log the user out.
            logoutAndRedirect();
            throw error;
        }
    }

    return response;
};

function logoutAndRedirect() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.error("Your session has expired. Please log in again.");
    window.location.href = '/login';
}