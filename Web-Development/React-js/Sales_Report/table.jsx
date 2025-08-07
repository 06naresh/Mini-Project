import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './table.css';

function TableComponent() {
  const [salesData, setSalesData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editFormData, setEditFormData] = useState({
    name: "",
    region: "",
    date: "",
    amount: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("salesData") || "[]");
    setSalesData(storedData);
  }, []);

  const handleDelete = (index) => {
    const updatedData = salesData.filter((_, i) => i !== index);
    setSalesData(updatedData);
    localStorage.setItem("salesData", JSON.stringify(updatedData));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditFormData(salesData[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedData = [...salesData];
    updatedData[index] = editFormData;
    setSalesData(updatedData);
    localStorage.setItem("salesData", JSON.stringify(updatedData));
    setEditingIndex(-1);
    setEditFormData({ name: "", region: "", date: "", amount: "" });
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditFormData({ name: "", region: "", date: "", amount: "" });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewEntry = () => {
    navigate("/");
  };

  const handleAddMoreRows = () => {
    localStorage.clear();
    setSalesData([]);
    navigate("/");
  };

  const handleViewCharts = () => {
    navigate("/charts");
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Sales Data Table</h2>
        <div className="header-buttons">
          <button className="add-entry-btn" onClick={handleAddMoreRows}>
            Add New Entry
          </button>
          <button className="view-charts-btn" onClick={handleViewCharts}>
            View Charts
          </button>
        </div>
      </div>

      {salesData.length === 0 ? (
        <div className="no-data-message">
          <p>No sales data available. Please add some entries using the form.</p>
        </div>
      ) : (
        <>
          <table className="sales-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Region</th>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Amount</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((entry, index) => (
                <tr key={index} className="table-row">
                  {editingIndex === index ? (
                    <>
                      <td className="table-cell">
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditInputChange}
                          style={{ width: '100%', padding: '4px' }}
                        />
                      </td>
                      <td className="table-cell">
                        <input
                          type="text"
                          name="region"
                          value={editFormData.region}
                          onChange={handleEditInputChange}
                          style={{ width: '100%', padding: '4px' }}
                        />
                      </td>
                      <td className="table-cell">
                        <input
                          type="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleEditInputChange}
                          style={{ width: '100%', padding: '4px' }}
                        />
                      </td>
                      <td className="table-cell">
                        <input
                          type="number"
                          name="amount"
                          value={editFormData.amount}
                          onChange={handleEditInputChange}
                          style={{ width: '100%', padding: '4px' }}
                        />
                      </td>
                      <td className="table-cell">
                        <div className="action-buttons">
                          <button
                            className="edit-btn"
                            onClick={() => handleSaveEdit(index)}
                          >
                            Save
                          </button>
                          <button
                            className="delete-btn"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="table-cell">{entry.name}</td>
                      <td className="table-cell">{entry.region}</td>
                      <td className="table-cell">{entry.date}</td>
                      <td className="table-cell">₹{entry.amount}</td>
                      <td className="table-cell">
                        <div className="action-buttons">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(index)}
                            type="button"
                            style={{
                              display: 'inline',
                              visibility: 'visible',
                              opacity: 1
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(index)}
                            type="button"
                            style={{
                              display: 'inline',
                              visibility: 'visible',
                              opacity: 1
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="add-row-section">
            <button className="add-row-btn" onClick={handleAddNewEntry}>
              Add More Rows
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TableComponent;