"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { FaHouse } from "react-icons/fa6";
import {
  Calendar,
  Settings,
  UsersIcon,
  Bot,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useAxios from "../lib";
import {
  toggleCollapsed,
  toggleSidebarOpen,
  setMobile,
} from "../redux/features/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isCollapsed, isSidebarOpen, isMobile } = useSelector(
    (state) => state.sidebar
  );
  const [activeItem, setActiveItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState({
    companyName: "",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/7153/7153150.png",
    name: "",
  });

  const axios = useAxios();

  const getSidebarWidth = () => {
    if (isMobile) return "";
    return isCollapsed ? "w-16" : "w-64";
  };

  const menuItems = [
    { href: "home", icon: <FaHouse size={18} />, label: "Dashboard" },
    { href: "leads", icon: <AiOutlineUser size={18} />, label: "Leads" },
    { href: "reminders", icon: <Calendar size={18} />, label: "Reminders" },
    {
      href: "engagements",
      icon: <UsersIcon size={18} />,
      label: "Engagements",
    },
    { href: "follow-ups", icon: <UsersIcon size={18} />, label: "Follow Ups" },
    { href: "chat-bot", icon: <Bot size={18} />, label: "Chat Bot" },
    { href: "settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      dispatch(setMobile(mobile));
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [dispatch]);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const response = await axios.get("/api/settings");
        setData(response.data.businessProfile);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLogo();
  }, [axios]);

  const toggleSidebarState = () => {
    if (isMobile) {
      dispatch(toggleSidebarOpen());
    } else {
      dispatch(toggleCollapsed());
    }
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebarState}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover: focus:outline-none"
        >
          <Menu size={24} />
        </button>
      )}

      {(!isMobile || isSidebarOpen) && (
        <div
          className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col z-40 shadow-sm transition-all duration-200 ease-out ${getSidebarWidth()}`}
          style={
            isMobile
              ? {
                  transform: isSidebarOpen
                    ? "translateX(0)"
                    : "translateX(-100%)",
                }
              : {}
          }
        >
          {/* Logo Section */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-2 overflow-hidden">
                  <Image
                    src={data.companyLogo}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium text-sm whitespace-nowrap">
                    {data.companyName}
                  </span>
                </div>
              )}
              {!isMobile && (
                <button
                  onClick={toggleSidebarState}
                  className="p-1.5 rounded-md hover: focus:outline-none"
                >
                  {isCollapsed ? (
                    <ChevronRight size={16} />
                  ) : (
                    <ChevronLeft size={16} />
                  )}
                </button>
              )}
            </div>
          </div>


          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            <div className="space-y-0.5 px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href === "user" ? "/user" : `/user/${item.href}`}
                  className={`
                    group flex items-center space-x-2 px-2 py-1.5 rounded-lg w-full
                    transition-colors duration-150
                    ${
                      activeItem === item.label
                        ? " text-gray-900 shadow-sm text-lg font-semibold"
                        : "text-gray-700 hover:"
                    }
                    ${isCollapsed && !isMobile ? "justify-center" : ""}
                  `}
                  onClick={() => setActiveItem(item.label)}
                >
                  <div
                    className={`relative flex items-center${
                      activeItem === item.label
                        ? "text-gray-900 text-lg font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.icon}
                    {isCollapsed && !isMobile && (
                      <div className="fixed ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 translate-x-8 transition-opacity duration-150">
                        {item.label}
                      </div>
                    )}
                  </div>
                  {(!isCollapsed || isMobile) && (
                    <span className="text-sm overflow-hidden whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="border-t border-gray-100 dark:border-gray-700 p-4 mt-auto ">
            <div
              className={`flex items-center ${
                isCollapsed && !isMobile ? "justify-center" : "space-x-3"
              }`}
            >
              <div className="relative">
                <Image
                  src={data.companyLogo}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-lg shadow-sm ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {data.name || 'Admin User'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                    <span className="truncate">Administrator</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isMobile && isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 z-30 w-full h-full border-none transition-opacity duration-200"
          onClick={() => dispatch(toggleSidebarOpen())}
          onKeyDown={(e) => e.key === "Escape" && dispatch(toggleSidebarOpen())}
          aria-label="Close sidebar overlay"
          tabIndex={0}
        />
      )}
    </>
  );
};

export default Sidebar;
