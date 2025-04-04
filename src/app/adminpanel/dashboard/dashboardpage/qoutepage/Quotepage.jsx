"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import "../../quote/QuotePage.css";
import { Button } from "primereact/button";
import { API_BASE_URL } from "../../../utlis";

export default function QuotePage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ quote: "", author: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${API_BASE_URL}/quote`, { headers });

      setQuotes(response.data.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setError("There was an error fetching the quotes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };

      if (editMode && selectedQuote) {
        await axios.patch(
          `${API_BASE_URL}/quote/${selectedQuote._id}`,
          formData,
          {
            headers,
          }
        );
        Swal.fire("Updated!", "Quote updated successfully.", "success");
      } else {
        await axios.post(`${API_BASE_URL}/quote`, formData, { headers });
        Swal.fire("Created!", "Quote created successfully.", "success");
      }

      setFormData({ quote: "", author: "", date: "" });
      setEditMode(false);
      setSelectedQuote(null);
      setIsModalOpen(false);
      fetchQuotes();
    } catch (error) {
      console.error("Error submitting quote:", error);
      setError("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quote) => {
    setEditMode(true);
    setSelectedQuote(quote);
    setFormData({ quote: quote.quote, author: quote.author, date: quote.date });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      await axios.delete(`${API_BASE_URL}/quote/${id}`, { headers });
      Swal.fire("Deleted!", "Quote deleted successfully.", "success");
      fetchQuotes();
    } catch (error) {
      console.error("Error deleting quote:", error);
      setError("There was an error deleting the quote.");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex ">
        <div className="flex-fill">
          {/* <h1 className="quote-page-title text-start">Quotes</h1> */}
        </div>
        <div className="">
          {error && <p className="quote-page-error">{error}</p>}
          <div className="text-end">
            <Button
              className="quote-page-add-btn "
              style={{ fontFamily: "Barlow" }}
              onClick={() => {
                setIsModalOpen(true);
                setEditMode(false);
              }}
            >
              Add New Quote
            </Button>
          </div>
        </div>
      </div>

      <div className="quote-list ">
        {quotes?.Quotes?.length > 0 ? (
          quotes?.Quotes?.map((quote, i) => (
            <div
              className="quote-item m-2"
              key={i}
              style={{
                background: "#D9D9D9",
                borderRadius: "8px",
                border: "1px solid #D9D9D9",
                padding: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="m-2" style={{ fontFamily: "Poppins" }}>
                {quote.quote}
              </p>
              {/* <p>{quote.author}</p> */}
              {/* <p>{quote.date}</p> */}
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <Button
                  className="quote-edit-btn"
                  icon="pi pi-pencil"
                  style={{ all: "unset" }}
                  onClick={() => handleEdit(quote)}
                ></Button>
                <Button
                  className="quote-delete-btn"
                  style={{ all: "unset" }}
                  icon="pi pi-trash"
                  onClick={() => handleDelete(quote._id)}
                ></Button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No quotes found.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="quote-modal-overlay">
          <div className="quote-modal">
            <h2 className="quote-modal-title">
              {editMode ? "Edit Quote" : "Create Quote"}
            </h2>
            <form
              className="quote-modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="quote-form-group">
                <label>Quote:</label>
                <textarea
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  required
                />
              </div>
              <div className="quote-form-group">
                <label>Author:</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                />
              </div>
              {/* <div className="quote-form-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div> */}
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <Button
                    className="quote-submit-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {editMode ? "Update" : "Create"}
                  </Button>
                </div>
                <div>
                  <button
                    className="quote-cancel-btn"
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
