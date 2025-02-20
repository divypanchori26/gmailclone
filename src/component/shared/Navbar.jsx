import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../../redux/appSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
export const Navbar = () => {
  const {user} = useSelector(store=>store.appSlice);

  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const Avatar = ({ name, src, size = 40 }) => {
  //     return src ? (
  //       <img
  //         src={src}
  //         alt={name}
  //         className="rounded-full"
  //         style={{ width: size, height: size }}
  //         onClick={onclick}
  //       />
  //     ) : (
  //       <div
  //         className="flex items-center justify-center rounded-full bg-gray-300 text-white font-bold"
  //         style={{ width: size, height: size, fontSize: size / 2 }}
  //         onclick={onclick}
  //       >
  //         {name.charAt(0).toUpperCase()}
  //       </div>
  //     );
  //   };
  const Avatar = ({ name, src, size = 40, onClick }) => {
    return (
      <div onClick={onClick} className="relative">
        {src ? (
          <img
            src={src}
            alt={name}
            className="rounded-full cursor-pointer hover:opacity-80 transition"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-full bg-gray-300 text-white font-bold cursor-pointer hover:opacity-80 transition"
            style={{ width: size, height: size, fontSize: size / 2 }}
          >
            {name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    );
  };
  // for search functionality
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input]);
  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <img
            className="w-8"
            src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"
            alt="gmail-logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      <div className="md:block hidden w-[50%] mr-60">
        <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
          <IoIosSearch size={"24px"} className="text-gray-700" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Mail"
            className="rounded-full w-full bg-transparent outline-none px-1"
          />
        </div>
      </div>
      <div className="md:block hidden">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiCircleQuestion size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiSettings size={"20px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"20px"} />
          </div>
          <div className="cursor-pointer">
            <Avatar
              onClick={() => setToggle((prev) => !prev)}
              name={user?.displayName}
              src={user?.photoURL}
            />
             <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-2 z-20 shadow-lg bg-white rounded-md p-2"
                >
                  <p
                    onClick={signOutHandler}
                    className="p-2 underline cursor-pointer"
                  >
                    Log Out
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}; 
