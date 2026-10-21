import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || price === '' || stock === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (!(priceNum > 0) || !Number.isInteger(stockNum) || stockNum < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    const productName = name.trim();
    onAdd({
      name: productName,
      category,
      price: priceNum,
      stock: stockNum,
    });

    navigate('/products', {
      replace: true,
      state: { message: `Đã thêm sản phẩm ${productName}` },
    });
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="add-name">Tên sản phẩm</label>
          <input
            id="add-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="add-category">Danh mục</label>
          <select
            id="add-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="add-price">Giá</label>
          <input
            id="add-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="add-stock">Số lượng tồn</label>
          <input
            id="add-stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddProduct;
