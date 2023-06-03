import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export const getData = async (name = '', page = 1) => {
  const params = new URLSearchParams({
    key: '36706034-f5193b0f10336721a563577c8',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  });

  try {
    const {
      data: { totalHits, hits },
    } = await axios.get(`${BASE_URL}?${params}`)

    return { totalHits, hits }
    
  } catch (error) {
    throw new Error(error);
  }
};

