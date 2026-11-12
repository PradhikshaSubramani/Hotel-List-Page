import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import hotelService from '../services/hotelService';
import MapView from '../components/MapView';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    hotelService
      .getHotelById(id)
      .then((res) => {
        const data = res?.data || res;
        setHotel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load hotel:', err);
        setHotel(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading hotel details...</div>;
  }

  if (!hotel) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Hotel Not Found</h2>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
          Back to Listings
        </button>
      </div>
    );
  }

  // Parse images (handles array, PostgreSQL literal string, or single image fallback)
  let imagesList = [];
  if (Array.isArray(hotel.images) && hotel.images.length > 0) {
    imagesList = hotel.images;
  } else if (typeof hotel.images === 'string') {
    imagesList = hotel.images.replace(/[{}"']/g, '').split(',').filter(Boolean);
  } else if (hotel.image) {
    imagesList = [hotel.image];
  }

  const getFullImgUrl = (path) => {
    if (!path) return 'https://placehold.co/800x500/0056b3/ffffff?text=Hotel+Image';
    const clean = path.trim();
    return clean.startsWith('http') ? clean : `http://localhost:5000${clean.startsWith('/') ? '' : '/'}${clean}`;
  };

  const activeImage = imagesList[activeImageIndex]
    ? getFullImgUrl(imagesList[activeImageIndex])
    : 'https://placehold.co/800x500/0056b3/ffffff?text=Hotel+Image';

  return (
    <>
      <Helmet>
        <title>{hotel.title} | Hotel Explorer</title>
        <meta name="description" content={hotel.description ? hotel.description.substring(0, 150) : ''} />
      </Helmet>

      <div
        className="container"
        style={{
          maxWidth: '850px',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <button
          className="btn"
          style={{ background: '#e9ecef', color: '#333', marginBottom: '1.5rem' }}
          onClick={() => navigate('/')}
        >
          ← Back to Listings
        </button>

        {/* Hero Image */}
        <div style={{ width: '100%', height: '380px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
          <img
            src={activeImage}
            alt={hotel.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/800x500/0056b3/ffffff?text=Hotel+Image';
            }}
          />
        </div>

        {/* Thumbnail Gallery Strip */}
        {imagesList.length > 1 && (
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {imagesList.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: '80px',
                  height: '60px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeImageIndex === idx ? '2px solid #0056b3' : '1px solid #dee2e6',
                  opacity: activeImageIndex === idx ? 1 : 0.6,
                  transition: '0.2s all ease',
                }}
              >
                <img
                  src={getFullImgUrl(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/80x60/0056b3/ffffff?text=Thumb';
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#212529', margin: 0 }}>{hotel.title}</h1>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0056b3' }}>
            ₹{parseFloat(hotel.price || 0).toLocaleString('en-IN')}{' '}
            <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: 400 }}>/ night</span>
          </span>
        </div>

        <p style={{ color: '#495057', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
          {hotel.description}
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #dee2e6', margin: '2rem 0' }} />

        <h3 style={{ marginBottom: '0.5rem' }}>Location & Coordinates</h3>
        <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
          Latitude: <strong>{hotel.latitude}</strong> | Longitude: <strong>{hotel.longitude}</strong>
        </p>

        <MapView latitude={parseFloat(hotel.latitude)} longitude={parseFloat(hotel.longitude)} title={hotel.title} />
      </div>
    </>
  );
};

export default HotelDetails;