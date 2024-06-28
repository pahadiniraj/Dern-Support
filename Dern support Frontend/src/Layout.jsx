import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogOut from "./Component/LogOut/LogOut";
import { Outlet } from "react-router-dom";
import LogOutNotification from "./Component/LogOut/LogOutNotification";
import { TfiSupport } from "react-icons/tfi";
import Lists from "./Component/Lists/Lists";

const Layout = () => {
  const nav = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const handlePop = () => {
    setConfirm(!confirm);
  };

  useEffect(() => {
    checklogin();
  }, []);

  const checklogin = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      nav("/");
    } else {
      nav("/signin");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    nav("/signin");
  };

  return (
    <div className="h-full">
      <aside className="h-full flex dark:bg-gray-800 ">
        <div className=" h-screen px-3 py-4   dark:bg-gray-800 w-1/5">
          <div className="text-white  font-bold text-2xl  my-4 flex items-center gap-3 mx-2">
            <TfiSupport />
            Dern Support
          </div>
          <ul className="font-medium">
            <Lists />
            <LogOut handlePop={handlePop} />
            {confirm && (
              <LogOutNotification
                handlePop={handlePop}
                handleDelete={logout}
                text="Logout"
              />
            )}
          </ul>
        </div>
        <div className="w-4/5   ">
          <Outlet />
        </div>
      </aside>
    </div>
  );
};

export default Layout;
