import { Link } from "react-router-dom";

export default function BannerBox(props) {
  return (
    <div className="box bannerBox overflow-hidden rounded-lg group">
      <Link to="/">
        <img
          src={props.img}
          className=" w-full transition group-hover:scale-105 group-hover:rotate-1"
          alt="banner"
        />
      </Link>
    </div>
  );
}
