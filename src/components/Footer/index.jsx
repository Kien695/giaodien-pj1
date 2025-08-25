import { LiaShippingFastSolid } from "react-icons/lia";
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
    <footer className="bg-white">
      <div className="container">
        <div className="flex items-center justify-center gap-2 pb-10">
          <div className="col flex flex-col items-center group px-2 gap-1">
            <LiaShippingFastSolid className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>Free Shipping</h3>
            <p className="text-[13px]">Cho đơn hàng hơn $100</p>
          </div>

          <div className="col flex flex-col items-center px-2 gap-1 group ">
            <LiaShippingFastSolid className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>30 Days Returns</h3>
            <p className="text-[13px]">Đối với sản phẩm trao đổi</p>
          </div>
          <div className="col flex flex-col items-center px-2 group gap-1">
            <MdOutlinePayment className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>Secured Payment</h3>
            <p className="text-[13px]">Chấp nhận thẻ thanh toán</p>
          </div>

          <div className="col flex flex-col items-center px-2 group gap-1">
            <BiSupport className="text-[30px] group-hover:text-[#ff5252] transition-all duration-300 group-hover:-translate-y-1" />
            <h3>Support 24/7</h3>
            <p className="text-[13px]">Liên hệ chúng tôi bất cứ lúc nào</p>
          </div>
        </div>
        <hr />
        <div className="footer flex py-6 ">
          <div className="part1 w-[25%] border-r border-gray-300">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Contact us
            </h2>
            <div className="text-[13px] pb-4">
              Classyshop - Mega Super Store <br /> 507-Union Trade Centre France
            </div>
            <Link className="link text-[13px]">dp1.1a2kien@gmail.com</Link>
            <span className="text-[20px] font-[600] block w-full mt-3 mb-4 text-[#ff5252]">
              (+84) 339499276
            </span>
            <div className="flex items-center gap-2">
              <MdOutlineChatBubbleOutline className="text-[40px] text-[#ff5252]" />
              <span className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)]">
                Online Chat
                <br />
                Get Expert Help
              </span>
            </div>
          </div>
          <div className="part2 w-[20%] ml-10">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Products
            </h2>
            <div className="flex flex-col gap-1">
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Price drops
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                New Products
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Best sales
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Contact us
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                SiteMaps
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Stores
              </div>
            </div>
          </div>
          <div className="part3 w-[20%]">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Our Company
            </h2>
            <div className="flex flex-col gap-1">
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Delivery
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Term and conditions
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Legal Notice
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                About us
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Secure Payment
              </div>
              <div className="text-[15px] text-[rgba(0,0,0,0.8)] link cursor-pointer">
                Login
              </div>
            </div>
          </div>
          <div className="part4 w-[35%]">
            <h2 className="text-[20px] font-[600] mb-4 text-[rgba(0,0,0,0.8)]">
              Subscribe to newsletter
            </h2>
            <div className="text-[13px] pb-4">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                id="outlined-email-input"
                label="Your Email Address"
                type="email"
                autoComplete="current-email"
              />
              <Button variant="contained" className="w-auto self-start">
                SUBSCRIBE
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
            <div className="box3">Phương thức thanh toán</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
