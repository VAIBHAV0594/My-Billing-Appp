import React from "react";
import "../App.css";

const Reports = () => {
  return (
    <div className="reports-container">
      <h2>Reports</h2>

      {/* Top Stats */}
      <div className="reports-stats">
        <div className="stat-card">
          <h3>0</h3>
          <p>TOTAL INVOICES</p>
        </div>
        <div className="stat-card green">
          <h3>₹0.00</h3>
          <p>REVENUE COLLECTED</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>PAID INVOICES</p>
        </div>
        <div className="stat-card red">
          <h3>0</h3>
          <p>PENDING INVOICES</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="reports-charts">
        <div className="chart-box">
          <h4>Invoice Status</h4>
          <div className="chart-placeholder">
            {/* This is placeholder, later you can add chart.js or recharts */}
            <p>Paid (Green), Partial (Yellow), Pending (Red)</p>
          </div>
        </div>

        <div className="chart-box">
          <h4>Revenue by Month</h4>
          <div className="chart-placeholder">
            <p>[Revenue Graph]</p>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="reports-table">
        <h4>Invoices</h4>
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer</th>
              <th>Amount (₹)</th>
              <th>Paid Amount (₹)</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No invoices found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
