import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import DetailsPage from './Details';
import Layout from './Layout';

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSearch = () => {
    if (query.trim() !== '') {
      setIsClicked(true);
      navigate('/'); // Navigate to HomePage
    }
  };

  return (
    <Layout
      query={query}
      setQuery={setQuery}
      handleSearch={handleSearch}
      category={category}
      sort={sort}
      onCategoryChange={setCategory}
      onSortChange={setSort}
    >
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              handleSearch={handleSearch}
            />
          }
        />
        <Route
          path="/details/:id"
          element={
            <DetailsPage
              query={query}
              category={category}
              sort={sort}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
