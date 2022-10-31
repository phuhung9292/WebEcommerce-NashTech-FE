import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
function NavbarAdmin() {
  const style = "text-[14px] cursor-pointer ml-[25px] ";
  return (
    <div className="navbar h-[60px] shadow-md relative z-10 w-full">
      <div className="wrapper pl-[20px] pr-[20px] pt-[10px] pb-[10px] flex justify-between items-center flex-row w-full">
        <div className="left flex flex-1 items-center">
          <div className="language cursor-pointer text-[16px]"> </div>
          <div
            className=" flex border-[2px] border-solid border-lighgrey rounded-md items-center ml-[10px] p-[5px]
          focus-within:border-[#8a4af3] transition-all"
          >
            <input className="input" type="text" />
            <SearchIcon className="" style={{ fontSize: "16px" }} />
          </div>
        </div>
        <div className="center flex-1 text-center ">
          <div className="logo font-bold text-lg"> Lowkey Shop</div>
        </div>
        <div className="right flex flex-1 items-center justify-end">
          <div className={style}> </div>
          <div className={style}> </div>
          <div className={style}></div>
        </div>
      </div>
    </div>
  );
}

export default NavbarAdmin;
