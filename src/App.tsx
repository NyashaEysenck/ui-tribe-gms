import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { router } from "@/router/router";

function App() {
  const { autoLogin } = useAuth();

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
