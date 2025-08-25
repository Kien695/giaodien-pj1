import { MdOutlineAccessTime } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
export default function BlogItem() {
  return (
    <div className="blogItem ">
      <div className="blogImage w-full rounded-md overflow-hidden cursor-pointer relative">
        <img
          src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg"
          alt=""
          className="w-full transition-all hover:scale-105 hover:rotate-1"
        />
        <div className="time absolute bottom-2 right-2">
          <div className="flex items-center  text-white bg-[#ff5252] text-[13px] p-1 gap-1 rounded-md">
            <MdOutlineAccessTime />
            <span>08-12-2025</span>
          </div>
        </div>
      </div>
      <div className="info py-5 flex flex-col gap-2">
        <Link to="" className="link transition-all">
          <div className="font-[600]">
            sustainable living through cutting-edge prefabricated homes
          </div>
        </Link>

        <div className="line-clamp-3 text-[rgba(0,0,0,0.8)]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
          architecto? Accusantium, consectetur. Quod doloremque placeat
          provident facere veritatis earum quisquam sit impedit. Hic libero
          itaque dolorem ea nostrum debitis molestiae. Voluptatem quaerat eum
        </div>
        <Link to="" className="link transition-all">
          <div className="flex items-center gap-1">
            Read More <MdKeyboardArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
}
