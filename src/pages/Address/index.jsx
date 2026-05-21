import React, { useContext, useEffect } from "react";
import Profile from "../../components/Frofile";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { MyContext } from "../../App";
import axios from "axios";
import { patchData, postData } from "../../untils/api";
export default function Address() {
  const context = useContext(MyContext);
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [selectedProvince, setSelectedProvince] = React.useState(null);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState(null);
  const [formInput, setFormInput] = React.useState({
    province: "",
    provinceCode: "",
    district: "",
    districtCode: "",
    ward: "",
    wardCode: "",
    address_line: "",
    typeAddress: "",
  });

  useEffect(() => {
    if (!context?.addressData) return;

    setSelectedProvince(context.addressData.provinceCode);
    setSelectedDistrict(context.addressData.districtCode);
    setSelectedWard(context.addressData.wardCode);

    setFormInput({
      province: context.addressData.province || "",
      provinceCode: context.addressData.provinceCode || "",
      district: context.addressData.district || "",
      districtCode: context.addressData.districtCode || "",
      ward: context.addressData.ward || "",
      wardCode: context.addressData.wardCode || "",
      address_line: context.addressData.address_line || "",
      typeAddress: context.addressData.typeAddress || "",
    });
  }, [context?.addressData]);

  // 1. Lấy danh sách Tỉnh/Thành
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.error("Lỗi lấy tỉnh:", err));
  }, []);

  // 2. Lấy danh sách Quận/Huyện khi chọn Tỉnh
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setWards([]);
      return;
    }

    axios
      .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts || []);
        setWards([]); // Reset xã khi đổi tỉnh
      })
      .catch(console.error);
  }, [selectedProvince]);

  // 3. Lấy danh sách Phường/Xã khi chọn Quận/Huyện
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      return;
    }

    axios

      .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then((res) => {
        setWards(res.data.wards || []);
      })
      .catch(console.error);
  }, [selectedDistrict]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await patchData("/api/address/add", formInput);
      if (res.success) {
        context.openAlertBox(
          "success",
          res.message || "Thêm địa chỉ thành công!",
        );
      }
    } catch (error) {
      if (error.response?.data?.message) {
        context.openAlertBox("error", error.response.data.message);
      } else {
        context.openAlertBox("error", "Không thể kết nối server!");
      }
    }
  };

  return (
    <div className="container flex  md:flex-row flex-col py-10 gap-10">
      <Profile />
      <div className="md:w-[600px] w-full  rounded-md shadow-md  border-2 borer-gray-300 bg-white p-5">
        <div className="text-[20px] text-[#ff5252] font-[600] mb-3 text-center">
          Địa chỉ cá nhân
        </div>

        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex gap-3 ">
              <div className="flex items-end">Tỉnh/thành phố:</div>
              <Select
                value={formInput.province || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const selected = provinces.find((p) => p.code === value);
                  setSelectedProvince(value);
                  setFormInput({
                    ...formInput,
                    province: selected?.name || "",
                    provinceCode: value,
                  });
                }}
                size="small"
                displayEmpty
                className="w-full sm:w-[200px]"
              >
                <MenuItem value="">
                  <em>Chọn tỉnh/thành phố</em>
                </MenuItem>
                {provinces.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex gap-3">
              <div className="flex items-end">Quận/huyện:</div>
              <Select
                value={formInput.district || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const selected = districts.find((p) => p.code === value);
                  setSelectedDistrict(value);
                  setFormInput({
                    ...formInput,
                    district: selected?.name || "",
                    districtCode: value,
                  });
                }}
                size="small"
                displayEmpty
                className="w-full sm:w-[200px]"
              >
                <MenuItem value="">
                  <em>Chọn quận/huyện</em>
                </MenuItem>
                {districts.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex gap-3">
              <div className="flex items-end">Phường/xã: </div>
              <Select
                value={formInput.ward || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const selected = wards.find((p) => p.code === value);
                  setSelectedWard(value); //
                  setFormInput({
                    ...formInput,
                    ward: selected?.name || "",
                    wardCode: value,
                  });
                }}
                size="small"
                displayEmpty
                className="w-full sm:w-[200px]"
              >
                <MenuItem value="">
                  <em>Chọn phường/xã</em>
                </MenuItem>
                {wards.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex gap-3">
              <div className="flex items-end">Địa chỉ cụ thể: </div>
              <TextField
                id="standard-basic"
                value={formInput.address_line}
                label="*"
                variant="standard"
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    address_line: e.target.value || "",
                  });
                }}
              />
            </div>
            <div className="flex gap-3 items-center mt-3">
              <div className="flex flex-col justify-end font-[500]">
                Loại địa chỉ:
              </div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="typeAddress"
                  value={formInput.typeAddress} // lấy từ state
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      typeAddress: e.target.value, // cập nhật state
                    })
                  }
                >
                  <FormControlLabel
                    value="Home"
                    control={<Radio color="error" />}
                    label="Nhà riêng"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio color="error" />}
                    label="Văn phòng"
                    sx={{ color: "rgba(0,0,0,0.7)" }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <Button
            size="small"
            variant="contained"
            color="error"
            type="submit"
            sx={{
              backgroundColor: "#ff5252",
              color: "#black",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "black",
                color: "#f1f1f1",
              },
            }}
            className=" flex items-center gap-2 "
          >
            <span>Lưu thông tin</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
