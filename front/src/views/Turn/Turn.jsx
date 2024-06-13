import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTurnDetails } from "../../services/apiService";  // Make sure to add this function in apiService.js
import "./Turn.css";

const Turn = () => {
  const { id } = useParams();
  const [turn, setTurn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTurnDetails = async () => {
      try {
        const data = await fetchTurnDetails(id);
        setTurn(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTurnDetails();
  }, [id]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (!turn) {
    return <p className="no-turn">No turn found</p>;
  }

  return (
    <div className="turn-details">
      <h2>Turn Details</h2>
      <p><strong>ID:</strong> {turn.id}</p>
      <p><strong>Date:</strong> {turn.date}</p>
      <p><strong>Time:</strong> {turn.time}</p>
      <p><strong>Status:</strong> {turn.status}</p>
      <p><strong>Description:</strong> {turn.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Turn;
