import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});


export const getMovies = async (searchQuery) => {
  console.log(searchQuery, 'calling API with');
  const params = {
    api_key: API_KEY,
    language: 'en-US',
    page: 1,
    include_adult: false,
    query: searchQuery,
  }
  const { data } = await client.get('search/multi', { params });
  return data.results;
};

export const getTvTrailer = async (id) => {
  console.log(id, "Getting first trailer");
  const params = {
    tv_id: id,
    api_key: API_KEY,
    language: 'en-US',
  }
  const { data } = await client.get('tv/videos', { params });
  return data.results;
}

export const getMovieTrailer = async (id) => {
  console.log(id, "Getting Movie trailer");
  const params = {
    movie_id: id,
    api_key: API_KEY,
    language: 'en-US',
  }
  const { data } = await client.get('movie/videos', { params });
  return data.results;
}