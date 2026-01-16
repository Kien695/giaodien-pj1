import { Link } from "react-router-dom";

export default function BannerBoxV2(props) {
  return (
    <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
      <img
        src={props.image}
        alt=""
        className="w-full md:h-[200px] h-[170px] object-cover transition-all duration-150 group-hover:scale-105"
      />
      <div
        className={`info bg-[rgba(255,255,255,0.2)] p-5 flex flex-col items-center gap-2 absolute top-0 ${
          props.info == "left" ? "left-0" : "right-0"
        } w-[60%] h-[100%]`}
      >
        <h2 className="md:text-[20px] text-[14px] font-[700] ">{props.name}</h2>
        <span className="text-[16px]  items-center  font-[600] w-full">
          <div className=" text-[12px]  italic">Chỉ từ</div>
          <div className="text-[#ff5252] text-[14px]">{props.price}</div>
        </span>
        <div className="md:text-[23px] text-[15px] font-[700] italic">
          <Link to={`/${props.link}`} className="link underline">
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
