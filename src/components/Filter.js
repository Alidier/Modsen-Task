import React, { useState } from 'react';

function Filter({ category, sort, onCategoryChange, onSortChange }) {
  return (
    <div className='Filter'>
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All</option>
        <option value="art">Art</option>
        <option value="biography">Biography</option>
        <option value="computers">Computers</option>
        <option value="history">History</option>
        <option value="medicine">Medicine</option>
      </select>
      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default Filter;
