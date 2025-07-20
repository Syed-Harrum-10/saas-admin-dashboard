import React, { useEffect, useState } from 'react';
import '../src/Pages/Billing.css';
import axios from "axios"

const Billing = () => {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/me", {}, { withCredentials: true });
      setPlan(res.data.User.plan);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/billing/checkout", { plan: "Pro" }, { withCredentials: true });

      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      } else {
        alert("Something went wrong during checkout.");
      }
    } catch (err) {
      console.error("Stripe Checkout error", err);
      alert("Error starting Stripe checkout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getData(); }, []);

  return (
    <div className="billing-wrapper">
      <div className="billing-card">
        <h1>Billing</h1>

        {/* Subscription Info */}
        <div className="billing-section">
          <h2>Subscription</h2>
          <div className="plan-box">
            <span className="label">Your Current Plan</span>
            <span className="plan-name">{plan}</span>
          </div>

          {/* Upgrade Button */}
          {plan !== "Pro" && (
            <button className="upgrade-btn" onClick={handleUpgrade} disabled={loading}>
              {loading ? "Redirecting..." : "Upgrade to Pro"}
            </button>
          )}
        </div>

        <div className="divider"></div>

        {/* Payment History */}
        <div className="billing-section">
          <h2>Payment History</h2>
          <div className="payment-history-table">
            <div className="table-header">
              <div className="header-cell">Amount</div>
              <div className="header-cell">Date</div>
            </div>
            <div className="table-row">
              <div className="table-cell">$20.00</div>
              <div className="table-cell">6/22/2028</div>
            </div>
            <div className="table-row">
              <div className="table-cell">$20.00</div>
              <div className="table-cell">7/22/2028</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
