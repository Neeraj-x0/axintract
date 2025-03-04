"use client";
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import useAxios from "../../../lib";
import PropTypes from "prop-types";
const Header = ({ className }) => {
  const [businessProfile, setBusinessProfile] = useState({
    companyName: "",
    companyLogo: "",
    phoneNumber: "",
  });

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/api/settings").then((res) => {
      setBusinessProfile(res.data.businessProfile);
    });
  }, [axiosInstance]);
  return (
    <div
      className={`h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 ${className}`}
    >
      <button
        onClick={() => {
          location.href = "/";
        }}
        className="text-2xl font-semibold text-gray-900"
      >
        Axintract
      </button>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover: rounded-lg">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center space-x-2">
          {businessProfile.companyLogo ? (
            <Image
             src={"https://api.axintract.com/media/"+businessProfile.companyLogo}
              alt={businessProfile.companyName}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : null}
          <span className="text-sm text-gray-600">
            {businessProfile.companyName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;


Header.propTypes = {
  className: PropTypes.string,
};

