import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(hotel.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(hotel);
  };

  // Safe image path parser (handles array, postgres string literal, or single string)
  let rawPath = '';
  if (Array.isArray(hotel.images) && hotel.images.length > 0) {
    rawPath = hotel.images[0];
  } else if (typeof hotel.images === 'string') {
    rawPath = hotel.images.replace(/[{}"']/g, '').split(',')[0];
  } else if (hotel.image) {
    rawPath = hotel.image;
  }

  rawPath = (rawPath || '').trim();
  const heroImage = rawPath
    ? (rawPath.startsWith('http') ? rawPath : `http://localhost:5000${rawPath.startsWith('/') ? '' : '/'}${rawPath}`)
    : 'https://placehold.co/600x400/0056b3/ffffff?text=Hotel+Image';

  return (
    <div className="hotel-card" onClick={handleCardClick}>
      <div className="hotel-card-img-wrapper">
        <img
          src={heroImage}
          alt={hotel.title || 'Hotel'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/0056b3/ffffff?text=Hotel+Image';
          }}
        />
      </div>
      <div className="hotel-card-body">
        <h3 className="hotel-card-title">{hotel.title}</h3>
        <div className="hotel-card-price">
          ₹{hotel.price ? parseFloat(hotel.price).toLocaleString('en-IN') : 0} / night
        </div>
        <p className="hotel-card-desc">
          {hotel.description && hotel.description.length > 110
            ? `${hotel.description.substring(0, 110)}...`
            : hotel.description || ''}
        </p>
        <div className="card-actions">
          <button className="btn btn-edit" onClick={handleEditClick}>
             Edit
          </button>
          <button className="btn btn-delete" onClick={handleDeleteClick}>
             Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;