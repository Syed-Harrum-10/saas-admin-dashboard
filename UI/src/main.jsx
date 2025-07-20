import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-vmpe5cdu51gtmh6x.us.auth0.com";
const clientId = "2gDlExubCzdRpfnZAnBH21rF8XmfUk4O";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin + "/callback",
    }}
  >
    <App />
  </Auth0Provider>
);
