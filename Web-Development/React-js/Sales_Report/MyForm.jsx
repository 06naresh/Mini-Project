
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    date: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    const existingData = JSON.parse(localStorage.getItem("salesData") || "[]");
    console.log("Existing data before adding:", existingData);
    
    const newEntry = { ...formData };
    existingData.push(newEntry);
    
    localStorage.setItem("salesData", JSON.stringify(existingData));
    console.log("Data after adding new entry:", existingData);

    setFormData({
      name: "",
      region: "",
      date: "",
      amount: "",
    });

    navigate("/table");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Sales Entry Form</h2>
        <label htmlFor="name" id="name">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="region">
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="date" id="date">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="amount">
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit">
          Add Sales
        </button>
      </form>
    </div>
  );
}

export default MyForm;
