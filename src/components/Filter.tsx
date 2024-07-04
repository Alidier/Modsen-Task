import React from 'react';

interface FilterProps {
  category: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const categories = [
  { value: "all", label: "All" },
  { value: "art", label: "Art" },
  { value: "biography", label: "Biography" },
  { value: "computers", label: "Computers" },
  { value: "history", label: "History" },
  { value: "medicine", label: "Medicine" }
];

const sortOptions = [
  { value:"relevance", label: "Relevance"},
  { value:"newest", label: "Newest"}
];

const Filter: React.FC<FilterProps> = ({ category, sort, onCategoryChange, onSortChange }) => {
  const handleCategoryChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };
  
  const handleSortChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className='Filter'>
      <div className="category__wrap">
      <div className="text__container">
        <p>Categories</p>
      </div>
      <select className='categories__select' value={category} onChange={handleCategoryChange}>
        {categories.map((categ) => (
          <option key={categ.value} value={categ.value}>{categ.label}</option>
        ))}
      </select>
    </div>
    <div className="sorting__wrap">
      <div className="text__container">
        <p>Sorting by</p>
      </div>
      <select className='sorting__select' value={sort} onChange={handleSortChange}>
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      </div>
    </div>
  );
}

export default Filter;
