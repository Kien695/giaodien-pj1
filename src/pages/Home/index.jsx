import * as React from "react";
import CategorySlider from "../../components/CategorySlider";
import HomeSlider from "../../components/HomeSlider";
import { HiOutlineTruck } from "react-icons/hi2";
import { BsFillLightningChargeFill } from "react-icons/bs";
import AllBannerSlider from "../../components/AllBannerSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductSlider from "../../components/ProductSlider";
export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Seven" />
              </Tabs>
            </div>
          </div>
          <ProductSlider item={5} />
        </div>
      </section>

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
          <AllBannerSlider item={4} />
        </div>
      </div>
      {/* Product latest */}
      <section className="bg-white pt-0 py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-[600]">Sản phẩm gần nhất</h2>
          </div>
          <ProductSlider item={5} />
          <AllBannerSlider item={3} />
        </div>
      </section>
      {/* featured product */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-[600]">Sản phẩm nổi bật</h2>
          </div>
          <ProductSlider item={5} />
        </div>
      </section>

      <br />
      <br />
    </>
  );
}
