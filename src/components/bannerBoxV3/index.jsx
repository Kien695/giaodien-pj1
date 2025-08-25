import { Link } from "react-router-dom";

export default function BannerBoxV3(props) {
  return (
    <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
      <img
        src={props.img}
        alt=""
        className="w-full h-[200px] transition-all duration-150 group-hover:scale-105"
      />
      <div
        className={`info p-5 flex flex-col items-center gap-2 absolute top-0 ${
          props.info == "left" ? "left-0" : "right-0"
        } w-[50%] h-[100%]`}
      >
        <h2 className="text-[18px] font-[600]">Dép nam giá rẻ</h2>
        <span className="text-[#ff5252] text-[22px] font-[600] w-full">
          30k
        </span>
        <div className="w-full font-[600]">
          {" "}
          <Link to="/" className="link underline">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
