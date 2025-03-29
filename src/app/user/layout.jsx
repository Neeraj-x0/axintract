"use client";
import Navbar from "../../components/Navbar.jsx";
import PropTypes from "prop-types";
import { useAuth } from "@clerk/nextjs";
import { Layout, Spin } from "antd";
import { redirect } from "next/navigation";

const { Content } = Layout;

export default  function DashboardLayout({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center flex-col gap-4 overflow-hidden items-center h-screen">
        <Spin size="large" />
       
      </div>
    );
  }

  if (!isSignedIn) {
    redirect("/login");
  }
  return (
    <Layout 
      className={`flex flex-col h-screen  bg-white font-comfortaa`}>
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
