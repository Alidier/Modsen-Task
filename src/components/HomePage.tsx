import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface HomePageProps {
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
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
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    if (isClicked) {
      searchBooks(true);
    }
  }, [isClicked, query, category, sort]);

  const searchBooks = async (reset = false) => {
    try {
      let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
      if (category !== 'all') {
        url += `+subject:${category}`;
      }
      url += `&orderBy=${sort}`;
      url += `&startIndex=${reset ? 0 : (currentPage - 1) * itemsPerPage}`;
      url += `&maxResults=${itemsPerPage}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.items) {
        setBooks((prevBooks) => (reset ? data.items : [...prevBooks, ...data.items]));
        setTotalBooks(data.totalItems || 0);
      } else {
        setBooks([]);
        setTotalBooks(0);
      }
    } catch (error) {
      console.log('Error fetching books', error);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    searchBooks();
  };

  return (
    <div>
      <div className="result__container">
        <div className={isClicked ? 'total__books__container' : 'hidden'}>
          <p className="total__books">{`Found ${totalBooks} results`}</p>
        </div>
        <div className="book__cards__container">
          {books.map((book) => (
            <div className="book__card" key={book.id}>
              <div className="book__thumbnail">
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                )}
              </div>
              <div className="book__info">
                <p className="category">
                  {book.volumeInfo.categories
                    ? book.volumeInfo.categories.join(', ')
                    : 'All'}
                </p>
                <h2 className="title">{book.volumeInfo.title}</h2>
                <p className="author">
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(', ')
                    : 'Unknown'}
                </p>
                <Link to={`/details/${book.id}`}> More Details </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={isClicked ? 'load__more__container' : 'hidden'}>
          <button className="load__more" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
