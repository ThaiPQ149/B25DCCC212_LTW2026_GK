import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onDelete, onUpdateStock }) => {
  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ProductTable
        products={products}
        onDelete={onDelete}
        onUpdateStock={onUpdateStock}
      />
    </div>
  );
};

export default ProductList;
