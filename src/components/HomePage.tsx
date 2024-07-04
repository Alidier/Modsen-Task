import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '../types/Book';
import { GOOGLE_BOOKS_API_URL } from '../constants/api';
import { buildGoogleBooksApiUrl } from '../utils/apiUtils';
import { processBookData } from '../utils/dataUtils';

interface HomePageProps {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
  handleSearch: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  isClicked,
  setIsClicked,
  handleSearch,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const navigate = useNavigate();

  useEffect(() => {
    if (isClicked) {
      searchBooks(true);
    }
  }, [isClicked, query, category, sort]);

  const searchBooks = async (reset = false) => {
    try {
      const url = buildGoogleBooksApiUrl(
        query,
        category,
        sort,
        reset ? 0 : (currentPage - 1) * itemsPerPage,
        itemsPerPage
      );
      const response = await fetch(url);
      const data = await response.json();
      const { uniqueBooks, totalItems } = processBookData(data);
      
      setBooks((prevBooks) => (reset ? uniqueBooks : [...prevBooks, ...uniqueBooks]));
      setTotalBooks(totalItems);
      setCurrentPage(reset ? 2 : currentPage + 1);
      setIsClicked(false);
    } catch (error) {
      console.log('Error fetching books', error);
      setIsClicked(false);
    }
  };

  const handleLoadMore = () => {
    searchBooks();
  };

  const handleCardClick = (bookId: string) => {
    navigate(`/details/${bookId}`);
  };

  return (
    <div>
      <div className="result__container">
        <div className={isClicked || books.length > 0 ? 'total__books__container' : 'hidden'}>
          <p className="total__books">{`Found ${totalBooks} results`}</p>
        </div>
        <div className="book__cards__container">
          {books.map((book) => (
            <div className="book__card" key={book.id} onClick={() => handleCardClick(book.id)} style={{ cursor: 'pointer' }}>
              <div className="book__thumbnail">
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                )}
              </div>
              <div className="book__info">
                <p className="category">
                  {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'All'}
                </p>
                <h2 className="title">{book.volumeInfo.title}</h2>
                <p className="author">
                  {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}
                </p>
                <Link to={`/details/${book.id}`}>More Details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className={books.length > 0 && books.length < totalBooks ? 'load__more__container' : 'hidden'}>
          <button className="load__more" onClick={handleLoadMore}>Load More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
