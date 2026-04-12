import { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwXL6EE44yx7EzxFyLAd7r86aZeRfSzZ9EJG3-wmsNuT0nKdldwNPDCiweonSdEejCI7mWXZjgNOvV/pub?output=csv';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    const cacheBuster = new Date().getTime();

    Papa.parse(`${SHEET_CSV_URL}&t=${cacheBuster}`, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {

        // Extract a Google Drive file ID from any known URL format
        const extractDriveId = (val) => {
          if (!val) return null;
          const str = String(val).trim();
          // Format: docs.google.com/uc?id=ID or drive.google.com/uc?id=ID
          const ucMatch = str.match(/[?&]id=([-\w]{25,})/);
          if (ucMatch) return ucMatch[1];
          // Format: drive.google.com/file/d/ID or /d/ID
          const dMatch = str.match(/\/d\/([-\w]{25,})/);
          if (dMatch) return dMatch[1];
          return null;
        };

        // Build the final image URL from a Drive file ID
        const buildImageUrl = (id) =>
          `https://lh3.googleusercontent.com/d/${id}=s1000`;

        const parsedProducts = results.data.map((row, index) => {
          const extractedImages = [];

          // Priority: read from named image columns in order
          ['Image 1', 'Image 2', 'Image 3'].forEach((header) => {
            const id = extractDriveId(row[header]);
            if (id) extractedImages.push(buildImageUrl(id));
          });

          // Fallback: scan all cells if named columns yielded nothing
          if (extractedImages.length === 0) {
            Object.values(row).forEach((cellValue) => {
              const str = String(cellValue || '').trim();
              if (
                str.includes('drive.google.com') ||
                str.includes('docs.google.com') ||
                str.includes('googleusercontent.com')
              ) {
                const id = extractDriveId(str);
                if (id) extractedImages.push(buildImageUrl(id));
              }
            });
          }

          return {
            id: String(row.id || row.ID || index + 1),
            name: row['Product Name'] || row.name || row.Name || 'Unknown Specimen',
            scientificName: row['Scientific Name'] || row.scientificName || '',
            category: row.Category || row.category || 'General',
            priceValue: parseFloat(String(row.Price || row.priceValue || 0).replace(/[^0-9.]/g, '')),
            price: `₹${new Intl.NumberFormat('en-IN').format(
              parseFloat(String(row.Price || row.priceValue || 0).replace(/[^0-9.]/g, ''))
            )}`,
            images:
              extractedImages.length > 0
                ? extractedImages
                : ['https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop'],
            description: row.Description || row.description || '',
            inStock: String(row.inStock || row.inStockValue || row.in_stock || 'TRUE').toUpperCase() !== 'FALSE',
            tag: row.Tag || row.tag || 'New',
          };
        });

        setProducts(parsedProducts);
        setLoading(false);
      },
      error: () => {
        setError('Failed to load products');
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const optimisticRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        optimisticRemoveProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
