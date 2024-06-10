import axios from 'axios';

const LOADING_SIZE = 10;

export async function fetchData(page) {
  const response = await axios.post('/get_contents', {
    id: page,
    count: LOADING_SIZE,
  });
  return response.data;
}
