import React from "react";
import { Link } from "react-router-dom";
import { LiaWindowCloseSolid } from "react-icons/lia";
import { Button, Menu, MenuItem, Rating, TextField } from "@mui/material";
import { IoBagCheckOutline } from "react-icons/io5";
import { SlClose } from "react-icons/sl";

export default function Cart() {
  const [anchorElQut, setAnchorElQut] = React.useState(null);
  const [anchorElSize, setAnchorElSize] = React.useState(null);
  const openQut = Boolean(anchorElQut);
  const openSize = Boolean(anchorElSize);
  const handleClickSize = (event) => {
    setAnchorElSize(event.currentTarget);
  };
  const handleCloseSize = () => {
    setAnchorElSize(null);
  };
  const handleClickQut = (event) => {
    setAnchorElQut(event.currentTarget);
  };
  const handleCloseQut = () => {
    setAnchorElQut(null);
  };
  return (
    <div className="container !my-6">
      <div className="flex w-[1100px] mx-auto">
        <div className=" w-[800px]  ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex justify-between">
                Có 4 sản phẩm trong giỏ hàng của bạn
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
                          className="w-[95px]"
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
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClickQut}
                              sx={{
                                background: "gray",
                                padding: "2px 8px", // padding nhỏ gọn
                                minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                color: "#fff",
                              }}
                            >
                              1
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorElQut}
                              open={openQut}
                              onClose={handleCloseQut}
                              slotProps={{
                                list: {
                                  "aria-labelledby": "basic-button",
                                },
                              }}
                            >
                              <MenuItem onClick={handleCloseQut}>2</MenuItem>
                              <MenuItem onClick={handleCloseQut}>3</MenuItem>
                              <MenuItem onClick={handleCloseQut}>4</MenuItem>
                            </Menu>
                          </div>
                          <div className="flex items-center">
                            <div className="text-[14px] mr-1">Kích thước:</div>
                            <Button
                              size="small"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClickSize}
                              sx={{
                                background: "gray",
                                padding: "2px 8px", // padding nhỏ gọn
                                minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                color: "#fff",
                              }}
                            >
                              X
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorElSize}
                              open={openSize}
                              onClose={handleCloseSize}
                              slotProps={{
                                list: {
                                  "aria-labelledby": "basic-button",
                                },
                              }}
                            >
                              <MenuItem onClick={handleCloseSize}>S</MenuItem>
                              <MenuItem onClick={handleCloseSize}>L</MenuItem>
                              <MenuItem onClick={handleCloseSize}>XL</MenuItem>
                            </Menu>
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
                          className="w-[95px]"
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
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClickQut}
                              sx={{
                                background: "gray",
                                padding: "2px 8px", // padding nhỏ gọn
                                minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                color: "#fff",
                              }}
                            >
                              1
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorElQut}
                              open={openQut}
                              onClose={handleCloseQut}
                              slotProps={{
                                list: {
                                  "aria-labelledby": "basic-button",
                                },
                              }}
                            >
                              <MenuItem onClick={handleCloseQut}>2</MenuItem>
                              <MenuItem onClick={handleCloseQut}>3</MenuItem>
                              <MenuItem onClick={handleCloseQut}>4</MenuItem>
                            </Menu>
                          </div>
                          <div className="flex items-center">
                            <div className="text-[14px] mr-1">Kích thước:</div>
                            <Button
                              size="small"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClickSize}
                              sx={{
                                background: "gray",
                                padding: "2px 8px", // padding nhỏ gọn
                                minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                color: "#fff",
                              }}
                            >
                              X
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorElSize}
                              open={openSize}
                              onClose={handleCloseSize}
                              slotProps={{
                                list: {
                                  "aria-labelledby": "basic-button",
                                },
                              }}
                            >
                              <MenuItem onClick={handleCloseSize}>S</MenuItem>
                              <MenuItem onClick={handleCloseSize}>L</MenuItem>
                              <MenuItem onClick={handleCloseSize}>XL</MenuItem>
                            </Menu>
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
                          className="w-[95px]"
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
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClickQut}
                              sx={{
                                background: "gray",
                                padding: "2px 8px", // padding nhỏ gọn
                                minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                color: "#fff",
                              }}
                            >
                              1
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorElQut}
                              open={openQut}
                              onClose={handleCloseQut}
                              slotProps={{
                                list: {
                                  "aria-labelledby": "basic-button",
                                },
                              }}
                            >
                              <MenuItem onClick={handleCloseQut}>2</MenuItem>
                              <MenuItem onClick={handleCloseQut}>3</MenuItem>
                              <MenuItem onClick={handleCloseQut}>4</MenuItem>
                            </Menu>
                          </div>
                          <div className="flex items-center">
                            <div className="text-[14px] mr-1">Kích thước:</div>
                            <Button
                              size="small"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClickSize}
                              sx={{
                                background: "gray",
                                padding: "2px 8px", // padding nhỏ gọn
                                minWidth: "auto", // bỏ giới hạn minWidth mặc định
                                color: "#fff",
                              }}
                            >
                              X
                            </Button>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorElSize}
                              open={openSize}
                              onClose={handleCloseSize}
                              slotProps={{
                                list: {
                                  "aria-labelledby": "basic-button",
                                },
                              }}
                            >
                              <MenuItem onClick={handleCloseSize}>S</MenuItem>
                              <MenuItem onClick={handleCloseSize}>L</MenuItem>
                              <MenuItem onClick={handleCloseSize}>XL</MenuItem>
                            </Menu>
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
        <div className="w-[300px] h-[270px] rounded-lg p-3 bg-white ml-5">
          <div className="flex flex-col gap-3">
            <div className="text-[20px] font-[600] text-[#ff5252]">
              Thanh toán
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <div className="text-[17px]">Tổng phụ</div>
              <span className="text-[#ff5252] font-[600]">1000k</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[17px]">Vận chuyển</div>
              <span className="font-[600]">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[17px]">Tổng tiền</div>
              <span className="text-[#ff5252] font-[600]">1000k</span>
            </div>
            <hr className="mb-3" />

            <Button
              variant="contained"
              color="error"
              sx={{
                backgroundColor: "#ff5252",
                color: "#black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
              className=" flex items-center justify-center gap-2 "
            >
              <IoBagCheckOutline className="text-[20px]" />
              <span>Thanh toán</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
