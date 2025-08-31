import { Button, Rating } from "@mui/material";
import React from "react";
import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";
import Profile from "../../components/Frofile";

export default function MyList() {
  return (
    <div className="container flex py-10 gap-10">
      <Profile />
      <div className="w-[800px]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex justify-between">
              Có 2 sản phẩm trong danh sách yêu thích của bạn
              <Button
                variant="outlined"
                color="error"
                sx={{
                  color: "#black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "#f1f1f1",
                  },
                }}
                className=" flex items-center justify-center gap-2 "
              >
                <span>Xóa tất cả</span>
              </Button>
            </caption>

            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="p-4">
                  <div className=" flex">
                    <div className="w-[15%] relative">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                        alt=""
                        className="w-[95px] rounded-md"
                      />
                      <div className="absolute top-[-7px] left-[-9px] rounded-md bg-[#ff5252] text-white p-1">
                        -15%
                      </div>
                    </div>
                    <div className="w-[65%] flex flex-col gap-1 ml-6">
                      <div className="text-[14px]">fffff</div>
                      <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                        Women Wide Leg High-Rise Light Fade Stretchable Jeans
                      </Link>
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <div className="text-[14px] mr-1">Số lượng:</div>
                          <Button
                            size="small"
                            sx={{
                              background: "gray",
                              padding: "2px 8px", // padding nhỏ gọn
                              minWidth: "auto", // bỏ giới hạn minWidth mặc định
                              color: "#fff",
                            }}
                          >
                            1
                          </Button>
                        </div>
                        <div className="flex items-center">
                          <div className="text-[14px] mr-1">Kích thước:</div>
                          <Button
                            size="small"
                            sx={{
                              background: "gray",
                              padding: "2px 8px", // padding nhỏ gọn
                              minWidth: "auto", // bỏ giới hạn minWidth mặc định
                              color: "#fff",
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center  font-[500]">
                        <div className="priceOld line-through text-gray-500 mr-3">
                          $58.00
                        </div>
                        <div className="priceNew text-[#ff5252] ">$53.00</div>
                      </div>
                    </div>
                    <div className="w-[20%] flex justify-end ">
                      <SlClose className="text-[20px] hover:text-red-600" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="p-4">
                  <div className=" flex">
                    <div className="w-[15%] relative">
                      <img
                        src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                        alt=""
                        className="w-[95px] rounded-md"
                      />
                      <div className="absolute top-[-7px] left-[-9px] rounded-md bg-[#ff5252] text-white p-1">
                        -15%
                      </div>
                    </div>
                    <div className="w-[65%] flex flex-col gap-1 ml-6">
                      <div className="text-[14px]">fffff</div>
                      <Link className="line-clamp-1 text-[18px] font-[500] text-black hover:text-[#ff5252]">
                        Women Wide Leg High-Rise Light Fade Stretchable Jeans
                      </Link>
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <div className="text-[14px] mr-1">Số lượng:</div>
                          <Button
                            size="small"
                            sx={{
                              background: "gray",
                              padding: "2px 8px", // padding nhỏ gọn
                              minWidth: "auto", // bỏ giới hạn minWidth mặc định
                              color: "#fff",
                            }}
                          >
                            1
                          </Button>
                        </div>
                        <div className="flex items-center">
                          <div className="text-[14px] mr-1">Kích thước:</div>
                          <Button
                            size="small"
                            sx={{
                              background: "gray",
                              padding: "2px 8px", // padding nhỏ gọn
                              minWidth: "auto", // bỏ giới hạn minWidth mặc định
                              color: "#fff",
                            }}
                          >
                            X
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center  font-[500]">
                        <div className="priceOld line-through text-gray-500 mr-3">
                          $58.00
                        </div>
                        <div className="priceNew text-[#ff5252] ">$53.00</div>
                      </div>
                    </div>
                    <div className="w-[20%] flex justify-end ">
                      <SlClose className="text-[20px] hover:text-red-600" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
