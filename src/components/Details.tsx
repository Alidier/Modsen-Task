import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    description?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
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
  setIsClicked
}) => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      searchBook();
    }
  }, [id]);

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

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div>
      {book && (
        <div className="book__details__card" key={book.id}>
          <div className="book__details__thumbnail">
            <div className="img__container">
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.medium && (
              <img
                src={book.volumeInfo.imageLinks.medium}
                alt={book.volumeInfo.title}
              />
            )}
            </div>
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
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: book.volumeInfo.description
                  ? truncateDescription(book.volumeInfo.description, 50)
                  : 'There is no description for this book'
              }}
            />
          </div>
        </div>
      )}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Details;
