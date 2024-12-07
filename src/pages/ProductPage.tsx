import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import SearchAndSort from '../components/SearchAndSort';
import Pagination from '../components/Pagination';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const ProductPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('none');
  const [page, setPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 5;

  // Fetch products on component load
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await axios.get('https://dummyjson.com/products');
        const initialProducts = data.products.slice(0, 10);
        setAllProducts(initialProducts);
        setVisibleProducts(initialProducts);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };
    loadProducts();
  }, []);

  // Handle search input
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm)
    );
    setVisibleProducts(filtered);
    setPage(1); // Reset to the first page
  };

  // Handle sorting option
  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

    const sorted = [...visibleProducts];
    if (selectedOption === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (selectedOption === 'price-desc') sorted.sort((a, b) => b.price - a.price);

    setVisibleProducts(sorted);
  };

  // Pagination logic
  const currentProducts = visibleProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(visibleProducts.length / ITEMS_PER_PAGE);

  const changePage = (direction: 'prev' | 'next') => {
    setPage((prev) => {
      if (direction === 'prev') return Math.max(prev - 1, 1);
      if (direction === 'next') return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Product Search</h1>
      <SearchAndSort
        searchQuery={searchInput}
        sortOption={sortBy}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
      />
      <ProductList products={currentProducts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </div>
  );
};

export default ProductPage;
