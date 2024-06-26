// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DetailsPage from './Details';
import Layout from './Layout';
import '../../public/style.scss';

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [isClicked, setIsClicked] = useState(false);

  const handleSearch = () => {
    if (query.trim() !== '') {
      setIsClicked(true);
    }
  };

  return (
    <Router>
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
              />
            }
          />
          <Route path="/details/:id" element={<DetailsPage 
             query={query}
             category={category}
             sort={sort}
             isClicked={isClicked}
             setIsClicked={setIsClicked}/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
