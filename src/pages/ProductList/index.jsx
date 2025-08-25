import React from "react";
import SideBar from "../../components/SideBar";

export default function ProductList() {
  return (
    <div className="py-8">
      <div className="container flex gap-3">
        <div className="sideBar w-[20%] h-full bg-white p-3">
          <SideBar />
        </div>
      </div>
    </div>
  );
}
