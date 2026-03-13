import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";

function App() {

  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Weather Comfort Dashboard</h2>

        <button onClick={() => loginWithRedirect()}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>

      <div style={{ padding: "10px", borderBottom: "1px solid gray" }}>
        <span>Welcome {user?.email}</span>

        <button
          style={{ marginLeft: "20px" }}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Logout
        </button>
      </div>

      <Dashboard />

    </div>
  );
}

export default App;