export default function Search() {
  return (
    <form>
      <div className="flex rounded-[5px] bg-gray-200 p-1 shadow-sm">
        <input
          type="text"
          className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
          placeholder="Free Ship Đơn Từ 0Đ"
        />
        <button className="flex-shrink-0 bg-orange-500 py-2 px-5 hover:opacity-90 rounded-[5px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
