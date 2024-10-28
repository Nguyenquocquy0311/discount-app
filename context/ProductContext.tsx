import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IProduct, Product } from '@/types/product';

interface ProductContextType {
  selectedProduct: IProduct | Product | null;
  setSelectedProduct: (product: IProduct | Product | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | Product | null>(null);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};