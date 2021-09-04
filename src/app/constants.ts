export const URL_BASE = 'http://localhost:8080/handart/api';

export const URL = {
  LOGIN: URL_BASE + '/login',
  LOGOUT: URL_BASE + '/logout',
  UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
  REGISTER: URL_BASE + '/register',
  GRAPH_ARTWORK: URL_BASE + '/graph/artwork',
  GRAPH_POPULAR_ARTISTS: URL_BASE + '/graph/popular/artists',
  GRAPH_ARTISTS_LIST: URL_BASE + '/graph/artists',
  GRAPH_ARTIST_BY_ID: URL_BASE + '/graph/artist',
  REST_ARTIST_BY_ID: URL_BASE + '/rest/artist/', // Aggiungere ID
  REST_ARTISTS_LIST_SIZE: URL_BASE + '/rest/artists/size',
  REST_RANDOM_ARTIST: URL_BASE + '/rest/artists/sample',
  REST_ARTISTS_LIST_OFFSET: URL_BASE + '/rest/artists/offset',
  REST_ARTWORK_BY_ID: URL_BASE + '/rest/artwork/', // Aggiungere ID
  REST_ARTWORK_LIST_SIZE: URL_BASE + '/rest/artworks/size',
  REST_RANDOM_ARTWORK: URL_BASE + '/rest/artwork/sample',
  REST_ARTWORK_LIST_OFFSET: URL_BASE + '/rest/artworks/offset',
  REST_ARTIST_BY_SORT: URL_BASE + '/rest/artists/sort',
  REST_ARTWORKS_BY_SORT: URL_BASE + '/rest/artists/sort',
  REST_SEARCH: URL_BASE + '/rest/search'
};

export const X_AUTH = 'X-Auth';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

