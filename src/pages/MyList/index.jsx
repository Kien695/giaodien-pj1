import { Button, Rating } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";
import Profile from "../../components/Frofile";
import { MyContext } from "../../App";
import { getData } from "../../untils/api";
import DeleteListLove from "../../components/DeleteListLove";
import DeleteAllListLove from "../../components/DeleteAllListLove";

export default function MyList() {
  const context = useContext(MyContext);

  return (
    <div className="container flex  md:flex-row flex-col py-10 gap-10">
      <Profile />
      <div className="md:w-[800px] w-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 md:text-lg text-[15px] gap-2 font-semibold text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex justify-between">
              Có {context.wishlist.length} sản phẩm trong danh sách yêu thích
              của bạn
              <DeleteAllListLove />
            </caption>

            <tbody>
              {context?.wishlist?.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  key={index}
                >
                  <td className="p-4">
                    <div className=" flex items-center">
                      <div className="w-[15%] relative">
                        <img
                          src={item.product.images[0].url}
                          alt=""
                          className="w-[95px] md:h-[110px] h-[80px] rounded-md"
                        />
                        <div className="md:text-[15px] text-[11px] absolute top-[-7px] left-[-9px] rounded-md bg-[#ff5252] text-white p-1">
                          {item?.product.discountPercentage}%
                        </div>
                      </div>
                      <div className="w-[65%] flex flex-col gap-1 ml-6">
                        <div className="md:text-[14px] text-[12px]">
                          {item?.product.brand}
                        </div>
                        <Link
                          to={`/product/${item?.product._id}`}
                          className="line-clamp-1 md:text-[16px] text-[14px] font-[500] text-black link"
                        >
                          {item?.product.name}
                        </Link>
                        <Rating
                          name="read-only"
                          value={4}
                          readOnly
                          size="small"
                        />
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            {item?.product?.size?.length > 0 && (
                              <div className="flex items-center gap-3">
                                <div>Kích thước:</div>
                                <div className="flex !w-[25px] !h-[25px] !min-w-[25px]  gap-2 action ">
                                  {item?.product.size.map((size, index) => (
                                    <Button
                                      key={index}
                                      size="small"
                                      sx={{
                                        background: "gray",
                                        padding: "2px 8px", // padding nhỏ gọn
                                        minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                      }}
                                    >
                                      {size}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center  font-[500]">
                          <div className="priceOld line-through text-gray-500 mr-3">
                            {item.product.price.toLocaleString("vi-VN") + " đ"}
                          </div>
                          <div className="priceNew text-[#ff5252] ">
                            {(
                              item.product.price -
                              item.product.price *
                                (item.product.discountPercentage / 100)
                            ).toLocaleString("vi-VN") + " đ"}
                          </div>
                        </div>
                      </div>
                      <DeleteListLove item={item} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
