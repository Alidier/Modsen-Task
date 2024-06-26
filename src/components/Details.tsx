// src/pages/DetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    description?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface DetailsPageProps {
  query: string;
  category: string;
  sort: string;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
}

const Details: React.FC<DetailsPageProps> = ({
  query,
  category,
  sort,
  isClicked,
  setIsClicked,
}) => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (isClicked) {
      searchBook();
    }
  }, [isClicked, query, category, sort]);

  const searchBook = async () => {
    try {
      let url = `https://www.googleapis.com/books/v1/volumes/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.id) {
        setBook(data);
      } else {
        setBook(null);
      }
    } catch (error) {
      console.log('Error fetching book details', error);
    }
  };

  return (
    <div>
      <h2>Details Page</h2>
      {book && (
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
            <p className='description'>
               {book.volumeInfo.description
               ? book.volumeInfo.description
               : 'There is no description for this book'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
