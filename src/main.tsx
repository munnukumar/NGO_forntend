import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";

// Load your Stripe public key
const stripePromise = loadStripe("pk_test_51SdTJE0eANcMj95t3vMmErKjP5prMMq7wetalcNo97GNEreK4POQ80ne6QpArEJpsRws2HgacXl2nIJYbEVueiIb00eerp34u3"); // Replace with your actual Stripe public key

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        {/* Wrap your app with <Elements> and pass the stripePromise */}
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Suspense>
    </Provider>
  </React.StrictMode>
);
