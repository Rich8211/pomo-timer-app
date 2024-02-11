import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ id, title, description }) => {  
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/projects/${id}`)}>
      <div className="card-inner">
        <div className="card-body">
          <h2>{title}</h2>
          <p>{description ? description : "No Description.  Click to Edit"}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
