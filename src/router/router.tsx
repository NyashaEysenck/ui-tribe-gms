
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

// This router is kept for reference but we're now using React Router v6 
// component-based routing in AppRoutes.tsx
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
