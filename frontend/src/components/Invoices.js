import React, { useState } from "react";

const Invoices = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Auto-fill Customer if exists
  const handleCustomerSelect = async (name) => {
    if (!name) return;
    try {
      const res = await fetch(`http://localhost:8080/customers/by-name/${name}`);
      if (res.ok) {
        const data = await res.json();
        setCustomerEmail(data.email || "");
        setCustomerPhone(data.phone || "");
        setCustomerAddress(data.address || "");
      }
    } catch (err) {
      console.error("Error fetching customer", err);
    }
  };

  // Auto-fill Product if exists
  const handleProductSelect = async (name) => {
    if (!name) return;
    try {
      const res = await fetch(`http://localhost:8080/products/by-name/${name}`);
      if (res.ok) {
        const data = await res.json();
        setProductPrice(data.price || "");
      }
    } catch (err) {
      console.error("Error fetching product", err);
    }
  };

  // Add item to invoice
  const addInvoiceItem = () => {
    if (!productName || !productPrice || !productQty) return;

    const newItem = {
      name: productName,
      price: parseFloat(productPrice),
      qty: parseInt(productQty),
      total: parseFloat(productPrice) * parseInt(productQty),
    };

    setInvoiceItems([...invoiceItems, newItem]);
    setProductName("");
    setProductPrice("");
    setProductQty(1);
  };

  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const balanceDue = totalAmount - (paymentAmount ? parseFloat(paymentAmount) : 0);

  return (
    <div className="invoice-page">
      <h2>Invoice Management</h2>
      <div className="invoice-container">
        {/* Left: Create Invoice */}
        <div className="invoice-form">
          <h3>Create / Edit Invoice</h3>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onBlur={() => handleCustomerSelect(customerName)}
          />
          <input
            type="email"
            placeholder="Customer Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Customer Phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Customer Address"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />

          <input
            type="date"
            placeholder="Invoice Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <h4>Products / Services</h4>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onBlur={() => handleProductSelect(productName)}
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={productQty}
            onChange={(e) => setProductQty(e.target.value)}
          />
          <button type="button" className="btn-blue" onClick={addInvoiceItem}>
            Add
          </button>
        </div>

        {/* Right: Preview */}
        <div className="invoice-preview">
          <h3>Invoice Preview / Details</h3>
          <p><strong>Customer:</strong> {customerName}</p>
          <p><strong>Email:</strong> {customerEmail}</p>
          <p><strong>Status:</strong> {balanceDue > 0 ? "Pending" : "Paid"}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Line Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
          <h4>Balance Due: ₹{balanceDue.toFixed(2)}</h4>

          <div className="payment-section">
            <input
              type="number"
              placeholder="Payment Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
            <button type="button" className="btn-green">Record Payment</button>
          </div>

          <button type="button" className="btn-blue">Download Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
