import { Button, TextField } from "@mui/material";
import React from "react";

export default function ForgotPassword() {
  const [formFields, setFormFields] = React.useState({
    email: "",
    password: "",
  });

  return (
    <div className="py-10">
      <div className="container">
        <div className="shadow-md rounded-md w-[500px] mx-auto bg-white py-6 px-16">
          <div className="text-center text-[20px] text-[#ff5252] font-[600] mb-6">
            Đổi mật khẩu
          </div>

          {/* FORM LOGIN */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Submit login:", formFields);
              // TODO: call API login
            }}
            className="flex flex-col gap-4"
          >
            <TextField
              label="Mật khẩu mới *"
              name="newPassword"
              autoComplete="new-password"
              fullWidth
              value={formFields.email}
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
            />
            <TextField
              label="Xác nhận mật khẩu mới *"
              type="password"
              autoComplete="confirm-password"
              name="confirmPassword"
              fullWidth
              value={formFields.password}
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
            />

            <Button
              variant="contained"
              type="submit"
              sx={{
                background: "#ff5252",

                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "black",
                  color: "#f1f1f1",
                },
              }}
            >
              Đổi mật khẩu
            </Button>
          </form>
          {/* END FORM LOGIN */}
        </div>
      </div>
    </div>
  );
}
