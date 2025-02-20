import { useState } from "react";
import "./App.css";
import { Navbar } from "./component/shared/navbar";
import { Sidebar } from "./component/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Body } from "./component/Body";
import { Mail } from "./component/Mail";
import { Inbox } from "./component/inbox";
import { Message } from "./component/Message";
import { SendMail } from "./component/SendMail";
import { Login } from "./component/Login";
import { useSelector } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
]);
function App() {
  const {user} = useSelector(store=>store.appSlice)
  return (
    <div className="bg-[#F6F8FC] h-screen w-screen overflow-hidden">
      {!user ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <RouterProvider router={router} />
          <div className="absolute w-[30%] bottom-0 right-20 z-10">
            <SendMail />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
