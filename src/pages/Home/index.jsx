import * as React from "react";

import CategorySlider from "../../components/CategorySlider";
import HomeSlider from "../../components/BannerSilder";
import { HiOutlineTruck } from "react-icons/hi2";
import { BsFillLightningChargeFill } from "react-icons/bs";
import AllBannerSlider from "../../components/AllBannerSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductSlider from "../../components/ProductLasted";
import Blog from "../../components/Blog";
import HomeSliderV2 from "../../components/HomeSliderV2";
import BannerBoxV2 from "../../components/bannerBoxV2";
import AllBannerSliderV2 from "../../components/AllBannerSliderV2";
import { MyContext } from "../../App";
import { useContext } from "react";
import ProductFeatured from "../../components/ProductFeatured";
import ProductLasted from "../../components/ProductLasted";
import ProductSale from "../../components/ProductSale";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
  const context = useContext(MyContext);
  const [value, setValue] = React.useState(0);
  const [selectCat, setSelectCat] = useState("");
  // Khi context.catData load xong, set mặc định danh mục đầu tiên
  useEffect(() => {
    if (context?.catData?.length > 0 && !selectCat) {
      setSelectCat(context.catData[0]._id);
      setValue(0);
    }
  }, [context?.catData]);

  // Khi user click tab
  const handleChange = (event, newValue) => {
    const cat = context?.catData[newValue];
    if (!cat) return;

    setValue(newValue);
    setSelectCat(cat._id);
  };

  return (
    <>
      <HomeSlider />
      <CategorySlider />
      {/* popular product */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[22px] font-[600]">Sản phẩm phổ biến</h2>
              <p className="text-[14px] font-[400]">
                Đừng bỏ lở các ưu đãi cho đến cuối tháng.
              </p>
            </div>
            <div className="rightSec w-[50%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context?.catData.map((item, index) => (
                  <Tab key={index} label={item.name} />
                ))}
              </Tabs>
            </div>
            <Link to="/product" className="flex items-center link font-[500]">
              Xem tất cả <MdKeyboardDoubleArrowRight />
            </Link>
          </div>
          <ProductSale item={5} catId={selectCat} />
        </div>
      </section>
      {/* bannerV2 */}

      <section className="homeSliderV2 bg-white pb-8">
        <div className="container flex gap-5">
          <div className="part1 w-[70%]">
            <HomeSliderV2 />
          </div>
          <div className="part2 flex flex-col gap-5 ">
            <BannerBoxV2
              info="left"
              link="product?catId=68f663e49aba3f9e03319552"
              name="Laptop chính hãng"
              price={Number(15000000).toLocaleString("vi-VN") + "đ"}
              image={
                "https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
              }
            />
            <BannerBoxV2
              info="right"
              link="product?catId=691550ef962c06d59923ae46"
              name="Balo da phong cách"
              price={Number(500000).toLocaleString("vi-VN") + "đ"}
              image={
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D"
              }
            />
          </div>
        </div>
      </section>
      {/* thanh box */}
      <div className="pt-2 pb-4 bg-white">
        <div className="container">
          <div className="free-ship w-full p-6 border-2 border-[red] flex items-center justify-between rounded-md w-[950px] m-auto">
            <div className="flex items-center font-[700] text-[20px] gap-3">
              <HiOutlineTruck />
              FREE-SHIP
              <BsFillLightningChargeFill />
            </div>
            <p>Giao hàng miễn phí cho đơn hàng đầu tiên của bạn</p>
            <p className="flex items-center font-[700] text-[20px]">
              Tiết kiệm hơn 200K
            </p>
          </div>
          <AllBannerSliderV2 item={4} />
        </div>
      </div>
      {/* Product latest */}
      <section className="bg-white pt-0 py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-[600]">Sản phẩm gần nhất</h2>
          </div>
          <ProductLasted item={5} />
          <AllBannerSlider item={3} />
        </div>
      </section>
      {/* featured product */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-[600]">Sản phẩm nổi bật</h2>
          </div>
          <ProductFeatured item={5} />
        </div>
      </section>
      {/* blog */}
      <Blog item={3} />
    </>
  );
}
