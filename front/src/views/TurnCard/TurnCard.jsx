// TurnCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TurnCard = ({ turn, onCancel }) => {
  return (
    <div className="turn-card">
      <Link to={`/turn/${turn.id}`}>
        <p>ID: {turn.id}</p>
      </Link>
      <p>Date: {turn.date}</p>
      <p>Time: {turn.time}</p>
      <p>Status: {turn.status}</p>
      <p>Description: {turn.description}</p>
      <button onClick={() => onCancel(turn.id)}>Cancel</button>
    </div>
  );
};

export default TurnCard;
