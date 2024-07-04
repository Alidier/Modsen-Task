import React from 'react';
import Filter from './Filter';

interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  category: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  handleSearch,
  category,
  sort,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <header>
      <div className='header__wrap'>
        <div className="search__wrap">
          <div className="search__bar">
            <div className="h1__container">
              <h1>Book Search</h1>
            </div>
            <div className="input__container">
              <input
                className="searchbar"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query"
              />
              <button
                className='searchButton'
                onClick={handleSearch}
                disabled={query.trim() === ''}
              >
              </button>
            </div>
          </div>
          <div className="filter__menu">
            <Filter
              category={category}
              sort={sort}
              onCategoryChange={onCategoryChange}
              onSortChange={onSortChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
