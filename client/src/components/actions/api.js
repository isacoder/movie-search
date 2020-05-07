import axios from 'axios';
import {fotmatedDateValues} from '../utils/dateUtils';

const API_KEY = '770020ce05b0d7eaaba9819678e29772';

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
  const movieResults = {};
  data.results.forEach(( {id, name, title, release_date, first_air_date, gender, poster_path, profile_path, media_type, overview, vote_average} ) => {

    const genderTxt = (gender === 1) ? 'Female' : (gender === 2 ? 'Male' : 'Not Specified');
    const posterPath = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : (profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : "");
    const rawDate = release_date ? release_date : first_air_date;
    const date = fotmatedDateValues(rawDate);

    movieResults[id] = {
      id: id,
      title: name ? name : title,
      year: date.year ? date.year : "",
      poster_url: posterPath,
      date: date.fullDate ? date.fullDate : "",
      type: media_type,
      gender: genderTxt,
      overview: overview ? overview : "",
      score: vote_average ? parseFloat(vote_average) * 10 : "",
      trailer_url: "",
    };
  });


  const allVideos = await Promise.all(data.results.map( ({media_type, id}) => {
    if (media_type === 'tv') return getTvTrailer(id);
    if (media_type === 'movie') return getMovieTrailer(id);
    return [];
  }));
  console.log(allVideos, "Videos");

  console.log(allVideos, "Videos");
  allVideos.forEach(({id, results}) => {
    if(!results) return;

    const [ trailer ] = results.filter(video => video.type === 'Trailer');
    if (trailer) {
      movieResults[id].trailer_url = `https://youtube.com/embed/${trailer.key}`;
    }
  });



return Object.keys(movieResults).map(key => movieResults[key]);
};

export const getTvTrailer = async (id) => {
  console.log(id, "Getting first trailer");
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  }
  const { data } = await client.get(`tv/${id}/videos`, { params });
  return data;
}

export const getMovieTrailer = async (id) => {
  console.log(id, "Getting Movie trailer");
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  }
  const { data } = await client.get(`movie/${id}/videos`, { params });
  return data;
}