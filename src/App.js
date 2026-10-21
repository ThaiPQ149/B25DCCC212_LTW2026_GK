import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gk_products');
    if (saved) {
      setProducts(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get('/data/products.json', { signal: controller.signal })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (loading || error) return;
    localStorage.setItem('gk_products', JSON.stringify(products));
  }, [products, loading, error]);

  const addProduct = (item) => {
    const newId = products.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
    setProducts([...products, { id: newId, ...item }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateStock = (id, change) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, stock: p.stock + change } : p))
    );
  };

  const showPage = (page) => {
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    return page;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={showPage(<Home products={products} />)} />
        <Route
          path="products"
          element={showPage(
            <ProductList
              products={products}
              onDelete={deleteProduct}
              onUpdateStock={updateStock}
            />
          )}
        />
        <Route
          path="products/new"
          element={showPage(<AddProduct onAdd={addProduct} />)}
        />
        <Route
          path="products/:id"
          element={showPage(<ProductDetail products={products} />)}
        />
      </Route>
    </Routes>
  );
};

export default App;