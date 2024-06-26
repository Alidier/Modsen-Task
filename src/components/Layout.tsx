// src/components/Layout.tsx
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  category: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  query,
  setQuery,
  handleSearch,
  category,
  sort,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div>
      <Header
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        category={category}
        sort={sort}
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
