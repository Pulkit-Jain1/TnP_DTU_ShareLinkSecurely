# DTU Training & Placement Department - Secure Data Sharing Portal

**Live Demo:** [https://xyz.app](https://your-vercel-deployment-link.vercel.app)
---

*This project was completed as part of 1 Day technical challenge by TnP Department, DTU. [View Problem Statement](https://manitvig.github.io/dtu-tnp-dev-team-recruitment-2025/)*

## Project Overview
Key Technologies: Next.js |  Tailwind CSS | React.js | TypeScript | JWT Authentication | REST API | Zod | React Toastify

This application provides a secure and seamless solution for the DTU Training and Placement (T&P) department to share sensitive student data with external recruiters. It addresses the critical need for controlled data access by implementing a robust system built around unique, token-based shareable links.

The portal features a protected administrative dashboard for generating these links and a public-facing page that renders the shared data in a clean, interactive, and user-friendly table. This project was built as a response to the T&P Department's Development Team Recruitment Challenge, demonstrating proficiency in modern frontend architecture, secure application design, and production-grade implementation.

---

## Core Features

*   **Secure Admin Dashboard:** A private, login-protected route (`/admin`) for authorized T&P staff.
*   **JWT-Based Authentication:** A robust authentication system using JSON Web Tokens (`accessToken` and `refreshToken`) for secure session management.
    *   **Automatic Token Refresh:** Implements a seamless user experience by automatically refreshing expired access tokens without requiring the user to log in again, ensuring uninterrupted sessions.
*   **Shareable Link Generation:** Admins can generate cryptographically signed, short-lived share tokens via a secure API endpoint.
*   **Public Data View:** A public, read-only page (`/share/:token`) that consumes the share token from the URL to fetch and display student data.
*   **Advanced Data Interaction:** The student data table is equipped with powerful client-side features for enhanced usability:
    *   **Multi-Criteria Search:** Dynamically filter data by Name, Email, or Roll Number.
    *   **Column Sorting:** Sort any column in both ascending and descending order, with clear visual indicators.
*   **Type-Safe Form Validation:** The login form is fortified with **Zod** for schema-based validation, providing real-time, specific error feedback to the user and ensuring data integrity before any API calls are made.

---

## Tech Stack & Architectural Highlights

This project was built with a modern, scalable, and maintainable tech stack, focusing on performance, developer experience, and robustness.

### Major Technologies
*   **Next.js (React Framework):** Chosen for its high-performance, file-based routing, server-side rendering capabilities, and seamless integration with the React ecosystem. This provides a solid foundation for a fast and scalable application.
*   **React.js:** Leveraged for building a declarative, component-based UI, enabling the creation of reusable and manageable components.
*   **TypeScript:** Used throughout the project to ensure end-to-end type safety. This minimizes runtime errors, improves code readability, and makes the application significantly more maintainable, especially at scale.

### Minor Libraries & Tools
*   **Tailwind CSS:** A utility-first CSS framework used for rapidly building a responsive, custom, and modern user interface without leaving the HTML.
*   **Zod:** Implemented for declarative, type-safe schema validation on the login form. This approach eliminates brittle, manual validation checks and provides a superior user experience with precise, inline error messaging.
*   **React Toastify:** Provides non-intrusive, themed toast notifications for user feedback on actions like login success or API errors.
*   **React Icons:** Ensures a consistent and high-quality icon set across the application.

---

## Local Setup & Installation

To run this project on your local machine, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Pulkit-Jain1/TnP_DTU_ShareLinkSecurely.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd TnP_DTU_ShareLinkSecurely
    ```

3.  **Install dependencies:**
    This project uses `npm`. Run the following command to install all the required packages.
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You will be automatically redirected to the login page.

### Admin Credentials

To access the protected admin dashboard, use the following credentials provided by the backend API:
-   **Username:** `admin`
-   **Password:** `admin`

### Environment Variables

This project does not require any environment variables (`.env` file) for local setup, as all necessary configurations are included.
