import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/hotels';

// Create dedicated axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

const hotelService = {
  // 1. Fetch hotels with search, price filters and pagination
  async getHotels({ search = '', minPrice = '', maxPrice = '', offset = 0, limit = 6 } = {}) {
    const params = new URLSearchParams();
    if (search.trim()) params.append('search', search.trim());
    if (minPrice !== '') params.append('minPrice', minPrice);
    if (maxPrice !== '') params.append('maxPrice', maxPrice);
    params.append('offset', offset);
    params.append('limit', limit);

    const response = await api.get(`?${params.toString()}`);
    return response.data;
  },

  // 2. Fetch single hotel by ID
  async getHotelById(id) {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // 3. Create a new hotel (multipart FormData)
  async createHotel(formData) {
    const response = await api.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 4. Update hotel (multipart FormData)
  async updateHotel(id, formData) {
    const response = await api.put(`/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 5. Delete hotel by ID
  async deleteHotel(id) {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};

export default hotelService;