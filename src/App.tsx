
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import AppRoutes from "@/AppRoutes";

// Get base URL from environment
const BASE_URL = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={BASE_URL}>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
