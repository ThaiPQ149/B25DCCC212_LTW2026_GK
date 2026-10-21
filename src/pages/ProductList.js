import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onDelete, onUpdateStock }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');

  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword.trim().toLowerCase()) &&
      (category === 'Tất cả' || p.category === category)
  );

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>

      {message && (
        <div className="notice">
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <FilterBar
        keyword={keyword}
        category={category}
        onKeywordChange={setKeyword}
        onCategoryChange={setCategory}
      />

      <p>{`Tìm thấy ${filtered.length} sản phẩm`}</p>

      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <ProductTable
          products={filtered}
          onDelete={onDelete}
          onUpdateStock={onUpdateStock}
        />
      )}
    </div>
  );
};

export default ProductList;
