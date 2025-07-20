import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CallbackPage() {
  const {
    isLoading,
    isAuthenticated,
    user,
    error,
  } = useAuth0();

  const navigate = useNavigate();
  const [authProcessing, setAuthProcessing] = useState(false);

  useEffect(() => {
    const sendOAuthUser = async () => {
      // Prevent multiple calls
      if (!isAuthenticated || !user || authProcessing) return;

      setAuthProcessing(true);

      try {
        console.log("Sending OAuth user data:", { name: user.name, email: user.email });

        const res = await axios.post(
          "http://localhost:8000/auth/oauth-register",
          {
            name: user.name,
            email: user.email,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("OAuth response:", res.data);

        // The backend sets the cookie, so we don't need to store token manually
        // unless you specifically want to use it for client-side requests
        if (res.data.token) {
          // Optional: store for client-side API calls
          localStorage.setItem("token", res.data.token);
        }

        navigate("/dashboard");
      } catch (err) {
        console.error("OAuth login failed:", err.response?.data || err.message);
        
        // More specific error handling
        if (err.response?.status === 404) {
          alert("OAuth endpoint not found. Please check your backend route.");
        } else if (err.response?.status >= 500) {
          alert("Server error occurred during OAuth login.");
        } else {
          alert(`OAuth login failed: ${err.response?.data?.message || err.message}`);
        }
        
        // Redirect to login page on error
        navigate("/login");
      } finally {
        setAuthProcessing(false);
      }
    };

    sendOAuthUser();
  }, [isAuthenticated, user, navigate, authProcessing]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Auth0 error:", error);
    return <div>Authentication Error: {error.message}</div>;
  }
  if (authProcessing) return <div>Processing your login...</div>;

  return <div>Logging you in...</div>;
}

export default CallbackPage;