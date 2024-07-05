import { GOOGLE_BOOKS_API_URL } from '../constants/api';

export const buildGoogleBooksApiUrl = (
  query: string,
  category: string,
  sort: string,
  startIndex: number,
  maxResults: number
): string => {
  let url = `${GOOGLE_BOOKS_API_URL}?q=${query}`;
  if (category !== 'all') {
    url += `+subject:${category}`;
  }
  url += `&orderBy=${sort}`;
  url += `&startIndex=${startIndex}`;
  url += `&maxResults=${maxResults}`;
  return url;
};
