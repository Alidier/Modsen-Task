import React from 'react';

interface FilterProps {
  category: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const Filter: React.FC<FilterProps> = ({ category, sort, onCategoryChange, onSortChange }) => {
  return (
    <div className='Filter'>
      <div className="category__wrap">
      <div className="text__container">
        <p>Categories</p>
      </div>
      <select className='categories__select' value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All</option>
        <option value="art">Art</option>
        <option value="biography">Biography</option>
        <option value="computers">Computers</option>
        <option value="history">History</option>
        <option value="medicine">Medicine</option>
      </select>
    </div>
    <div className="sorting__wrap">
      <div className="text__container">
        <p>Sorting by</p>
      </div>
      <select className='sorting__select' value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
      </select>
      </div>
    </div>
  );
}

export default Filter;
