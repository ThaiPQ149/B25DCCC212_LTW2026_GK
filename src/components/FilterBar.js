import { CATEGORIES } from '../data';

const FilterBar = ({ keyword, category, onKeywordChange, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="search">Tìm kiếm</label>
      <input
        id="search"
        type="text"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
      />

      <label htmlFor="filter-category">Danh mục</label>
      <select
        id="filter-category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
