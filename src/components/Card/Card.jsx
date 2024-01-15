import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/projects/${id}`)}>
      <div className="card-inner">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Card;
