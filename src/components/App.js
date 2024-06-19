import React, { useState } from 'react';
import Filter from './Filter'; // Проверьте правильность пути импорта

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  const searchBooks = async () => {
    try {
      let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
      if (category !== 'all') {
        url += `+subject:${category}`;
      }
      url += `&orderBy=${sort}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.log('Error fetching books', error);
    }
  };

  return (
    <div>
      <h1>Book Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={searchBooks}>Search</button>
      
      <Filter
        category={category}
        sort={sort}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />
      
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>By: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
