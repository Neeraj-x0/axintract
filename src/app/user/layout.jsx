"use client";
import Navbar from "../../components/Navbar.jsx";
import PropTypes from "prop-types";
import { Layout, Spin } from "antd";
import { redirect } from "next/navigation";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "@/constants.js";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const [cookies, setCookie] = useCookies([]);
  const token = cookies.token;
  useEffect(() => {
    axios.post(`${API_URL}/auth/verify`, { token })
      .then((response) => {
        // Token verification successful
        console.log("Verified",response.data);
      })
      .catch((error) => {
        // Token verification failed, redirect to sign-in page
        console.error("Token verification failed:", error.message);
        redirect("/sign-in");
      });
  }, [token]);

  return (
    <Layout className={`flex flex-col h-screen  bg-white font-comfortaa`}>
      <Navbar />
      <Content className={`flex-1  pt-16 transition-all duration-200 `}>
        <div className="">{children}</div>
      </Content>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
