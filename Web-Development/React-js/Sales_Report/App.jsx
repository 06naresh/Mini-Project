import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyForm from "./MyForm.jsx";
import TableComponent from "./table.jsx";
import ChartComponent from "./Chart.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyForm />} />
        <Route path="/table" element={<TableComponent />} />
        <Route path="/charts" element={<ChartComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;