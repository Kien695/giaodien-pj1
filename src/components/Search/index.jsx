import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/product?keyword=${keyword}`);
    } else {
      navigate("/product");
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div className="flex rounded-[5px] bg-gray-200 p-1 shadow-sm">
        <input
          type="text"
          className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
          placeholder="Free Ship Đơn Từ 0Đ"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-orange-500 py-2 px-5 hover:opacity-90 rounded-[5px]"
          type="submit"
        >
          <IoSearch />
        </button>
      </div>
    </form>
  );
}
