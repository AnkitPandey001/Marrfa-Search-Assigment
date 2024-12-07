import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, price }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-blue-600 text-lg font-semibold">
        <strong>Price:</strong> ${price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
