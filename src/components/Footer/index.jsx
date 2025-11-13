import { LiaShippingFastSolid } from "react-icons/lia";
import vnPay from "../../assets/vnpay-logo-vinadesign-25-12-59-16.jpg";
import MoMo from "../../assets/momo.png";
import { PiKeyReturn } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-white border border-top border-gray">
      <div className="container">
        <div className="flex items-center justify-center gap-2 py-8">
          <div className="col flex flex-col items-center group px-2 gap-1">
            <LiaShippingFastSolid className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>Miễn phí giao hàng</h3>
            <p className="text-[13px]">Cho đơn hàng hơn $100</p>
          </div>

          <div className="col flex flex-col items-center px-2 gap-1 group ">
            <LiaShippingFastSolid className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>30 ngày trả hàng</h3>
            <p className="text-[13px]">Đối với sản phẩm trao đổi</p>
          </div>
          <div className="col flex flex-col items-center px-2 group gap-1">
            <MdOutlinePayment className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>Thanh toán bảo mật</h3>
            <p className="text-[13px]">Chấp nhận thẻ thanh toán</p>
          </div>

          <div className="col flex flex-col items-center px-2 group gap-1">
            <BiSupport className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>Hổ trợ 24/7</h3>
            <p className="text-[13px]">Liên hệ chúng tôi bất cứ lúc nào</p>
          </div>
        </div>
        <hr />
        <div className="footer flex py-6 ">
          <div className="part1 w-[25%] border-r border-gray-300">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Liên hệ chúng tôi
            </h2>
            <div className="text-[13px] pb-4">
              Project -Commerce <br /> 111-Tòa Lanmark 81
            </div>
            <Link className="link text-[13px]">dp1.1a2kien@gmail.com</Link>
            <span className="text-[20px] font-[600] block w-full mt-3 mb-4 text-[#ff5252]">
              (+84) 339499276
            </span>
            <div className="flex items-center gap-2">
              <MdOutlineChatBubbleOutline className="text-[40px] text-[#ff5252]" />
              <span className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)]">
                Nhắn tin trực tuyến
                <br />
                Nhận trợ giúp từ chuyên gia
              </span>
            </div>
          </div>
          <div className="part2 w-[20%] ml-10">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Sản phẩm
            </h2>
            <div className="flex flex-col gap-1">
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Giảm giá
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Sản phẩm mới
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Lượt mua nhiều nhất
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Liên hệ chúng tôi
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Bản đồ
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Cửa hàng
              </div>
            </div>
          </div>
          <div className="part3 w-[20%]">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Công ty chúng tôi
            </h2>
            <div className="flex flex-col gap-1">
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Giao hàng
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Điều khoản và điều kiện
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Thông báo pháp lí
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Về chúng tôi
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Bảo mật thanh toán
              </div>
            </div>
          </div>
          <div className="part4 w-[35%]">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Đăng kí nhận bản tin mới nhất
            </h2>
            <div className="text-[13px] pb-4">
              Đăng ký nhận bản tin mới nhất của chúng tôi để nhận tin tức về các
              chương trình giảm giá đặc biệt.
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                id="outlined-email-input"
                label="Email của bạn"
                type="email"
                autoComplete="current-email"
              />
              <Button variant="contained" className="w-auto self-start">
                ĐĂNG KÍ
              </Button>
            </div>
            <div className="flex items-center mt-4">
              <Checkbox {...label} sx={{ padding: 0 }} />
              <div className="text-[13px] ml-2">
                Tôi đồng ý với điệu kiện và chính sách bảo mật
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer2 bg-white py-2">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="box1 flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#ff5252] hover:text-white hover:border-none">
                <GrFacebookOption className="text-[20px]" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:bg-[#ff5252] hover:text-white hover:border-none">
                <AiOutlineYoutube className="text-[20px]" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:bg-[#ff5252] hover:text-white hover:border-none">
                <FaInstagram className="text-[20px]" />
              </div>
            </div>
            <div className="box2 text-[rgba(0,0,0,0.8)]">
              @2025_Project tháng 8 đầu tiên
            </div>
            <div className="box3 flex gap-2 items-center">
              <div className="text-[13px] "> Thanh toán:</div>
              <div className="flex gap-1">
                <img src={vnPay} alt="" className="w-5" />
                <img src={MoMo} alt="" className="w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
