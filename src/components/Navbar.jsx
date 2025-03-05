"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineCalendar,
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineRobot,
  AiOutlineSetting,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import useAxios from "../lib";
import { toggleNavBarOpen, setMobile } from "../redux/features/navBarSlice";
import { Layout, Menu, Button, Drawer, Avatar, Typography, Spin } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SignOutButton, UserButton } from "@clerk/nextjs";

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isNavBarOpen, isMobile } = useSelector((state) => state.navBar);
  const pathname = usePathname();
  const [data, setData] = useState({
    companyName: "",
    companyLogo: "https://cdn-icons-png.flaticon.com/512/7153/7153150.png",
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const axios = useAxios();

  // Memoize the active key determination
  const getActiveKey = useCallback(() => {
    const path = pathname.split("/").pop();
    return menuItems.find((item) => item.key === path)?.key || "home";
  }, [pathname]);

  // Menu items with Next.js Link components for desktop
  const menuItems = [
    {
      key: "home",
      icon: <AiOutlineDashboard />,
      label: <Link href="/user/home">Dashboard</Link>,
    },
    {
      key: "leads",
      icon: <AiOutlineUser />,
      label: <Link href="/user/leads">Leads</Link>,
    },
    {
      key: "reminders",
      icon: <AiOutlineCalendar />,
      label: <Link href="/user/reminders">Reminders</Link>,
    },
    {
      key: "engagements",
      icon: <AiOutlineTeam />,
      label: <Link href="/user/engagements">Engagements</Link>,
    },
    {
      key: "follow-ups",
      icon: <AiOutlineMessage />,
      label: <Link href="/user/follow-ups">Follow Ups</Link>,
    },
    {
      key: "chat-bot",
      icon: <AiOutlineRobot />,
      label: <Link href="/user/chat-bot">Chat Bot</Link>,
    },
    {
      key: "settings",
      icon: <AiOutlineSetting />,
      label: <Link href="/user/settings">Settings</Link>,
    },
  ];

  // Enhanced responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      // Breakpoints: xs (<576px), sm (≥576px), md (≥768px), lg (≥992px), xl (≥1200px)
      const mobile = window.innerWidth < 992; // Consider tablets as mobile for menu
      dispatch(setMobile(mobile));

      // Only close drawer when switching from mobile to desktop
      if (!mobile && isNavBarOpen) {
        dispatch(toggleNavBarOpen(false));
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleResize();
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isNavBarOpen]);

  // Fetch company data
  useEffect(() => {
    async function fetchCompanyData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/settings");
        if (response.data && response.data.businessProfile) {
          setData(response.data.businessProfile);
        }
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanyData();
  }, [axios]);

  // Toggle mobile menu with state check
  const toggleMobileMenu = useCallback(
    (force = null) => {
      if (typeof force === "boolean") {
        dispatch(toggleNavBarOpen(force));
      } else {
        dispatch(toggleNavBarOpen());
      }
    },
    [dispatch]
  );

  // Prevent drawer from closing when clicking inside
  const handleDrawerContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Handle drawer close
  const handleDrawerClose = useCallback(() => {
    if (!navigating) {
      toggleMobileMenu(false);
    }
  }, [navigating, toggleMobileMenu]);

  // For mobile drawer, create menu items with programmatic navigation
  const getMobileMenuItems = useCallback(() => {
    return menuItems.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label.props.children,
      onClick: async (e) => {
        // Stop event propagation
        e.domEvent.stopPropagation();

        // Set navigating state
        setNavigating(true);

        // Navigate to the new route
        const path = item.key === "home" ? "/user/home" : `/user/${item.key}`;
        router.push(path);

        // Reset navigating state and close drawer after navigation
        setTimeout(() => {
          setNavigating(false);
          dispatch(toggleNavBarOpen(false));
        }, 300);
      },
    }));
  }, [dispatch, router]);

  // Calculate header height for accessibility
  const headerHeight = scrolled ? '60px' : '64px';
  
  return (
    <>
      <Header
        ref={headerRef}
        className="navbar-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          background: "#fff",
          height: headerHeight,
          boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "none" : "1px solid #f0f0f0",
        }}
      >
        {/* Logo and Company Name with responsive handling */}
        <Link
          href="/user/home"
          className="logo-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            maxWidth: isMobile ? "calc(100% - 70px)" : "250px",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Spin size="small" />
          ) : (
            <Avatar
              src={data.companyLogo}
              size={isMobile ? 28 : 32}
              style={{ flexShrink: 0 }}
            />
          )}
          <Text
            strong
            ellipsis={{ tooltip: data.companyName }}
            style={{
              fontSize: isMobile ? "14px" : "16px",
              color: "#000",
              whiteSpace: "nowrap",
              maxWidth: isMobile ? "120px" : "180px",
            }}
          >
            {data.companyName || (loading ? "Loading..." : "My Company")}
          </Text>
        </Link>

        {/* Desktop Navigation - only render when not mobile */}
        {!isMobile && (
          <div className="desktop-menu" ref={menuRef} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Menu
              mode="horizontal"
              selectedKeys={[getActiveKey()]}
              items={menuItems}
              style={{
                border: "none",
                flex: 1,
                justifyContent: "center",
                background: "transparent",
              }}
            />
            <UserButton />
          </div>
        )}

        {/* Mobile menu toggle button - better accessibility */}
        {isMobile && (
          <div className="flex items-center gap-3">
            <UserButton />
            <Button
              type="text"
              icon={isNavBarOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
              onClick={toggleMobileMenu}
              style={{ 
                border: "none", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                minWidth: "40px",
                minHeight: "40px"
              }}
              aria-label={isNavBarOpen ? "Close menu" : "Open menu"}
              aria-expanded={isNavBarOpen}
            />
          </div>
        )}
      </Header>

      {/* Mobile Menu Drawer - improved for touch interactions */}
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {loading ? (
              <Spin size="small" />
            ) : (
              <Avatar src={data.companyLogo} size={32} />
            )}
            <Text
              strong
              ellipsis={{ tooltip: data.companyName }}
              style={{ maxWidth: "180px" }}
            >
              {data.companyName || (loading ? "Loading..." : "My Company")}
            </Text>
          </div>
        }
        placement="right"
        onClose={handleDrawerClose}
        open={isMobile && isNavBarOpen}
        width={290}
        styles={{
          body: { padding: 0 },
          header: { 
            borderBottom: "1px solid #f0f0f0",
            padding: "12px 16px",
          },
          footer: { 
            borderTop: "1px solid #f0f0f0", 
            padding: "12px 16px",
            display: "flex",
            justifyContent: "center",
          },
          mask: { backgroundColor: "rgba(0, 0, 0, 0.45)" },
          content: { boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.15)" },
        }}
        closeIcon={<AiOutlineClose size={16} />}
        maskClosable={true}
        keyboard={true}
        footer={
          <div 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full transition-colors"
            style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >  
            <SignOutButton  redirectUrl="/login"/>
          </div>
        }
      >
        <div onClick={handleDrawerContentClick} className="drawer-content">
          <Menu
            mode="inline"
            selectedKeys={[getActiveKey()]}
            items={getMobileMenuItems()}
            style={{
              border: "none",
              height: "calc(100vh - 140px)",
              overflowY: "auto",
            }}
          />
        </div>
      </Drawer>

      {/* Global styles for navbar with improved responsiveness */}
      <style jsx global>{`
        /* Base styles */
        .navbar-header {
          transition: height 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-link {
          transition: all 0.3s ease;
        }

        /* Horizontal menu styles */
        .ant-menu-horizontal {
          line-height: normal;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0 8px;
        }

        .ant-menu-horizontal::-webkit-scrollbar {
          display: none;
        }

        .ant-menu-horizontal > .ant-menu-item,
        .ant-menu-horizontal > .ant-menu-submenu {
          padding: 0 12px;
          margin: 0 2px;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          height: 60px;
          line-height: 58px;
        }

        @media (max-width: 1100px) {
          .ant-menu-horizontal > .ant-menu-item,
          .ant-menu-horizontal > .ant-menu-submenu {
            padding: 0 8px;
            margin: 0 1px;
          }
        }

        .ant-menu-horizontal > .ant-menu-item::after,
        .ant-menu-horizontal > .ant-menu-submenu::after {
          border-bottom: none !important;
        }

        .ant-menu-horizontal > .ant-menu-item-selected {
          font-weight: 500;
          color: #000 !important;
        }

        .ant-menu-horizontal > .ant-menu-item:hover,
        .ant-menu-horizontal > .ant-menu-submenu:hover,
        .ant-menu-horizontal > .ant-menu-item-active,
        .ant-menu-horizontal > .ant-menu-submenu-active,
        .ant-menu-horizontal > .ant-menu-item-open,
        .ant-menu-horizontal > .ant-menu-submenu-open,
        .ant-menu-horizontal > .ant-menu-item-selected,
        .ant-menu-horizontal > .ant-menu-submenu-selected {
          color: #000 !important;
          border-bottom: 2px solid #000 !important;
        }

        /* Drawer and inline menu styles */
        .ant-drawer-content-wrapper {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .ant-menu-inline {
          border-right: none !important;
        }

        .ant-menu-inline .ant-menu-item {
          height: 48px;
          line-height: 48px;
          margin: 4px 0;
          padding-left: 24px !important;
        }

        .ant-menu-inline .ant-menu-item-selected {
          background-color: rgba(0, 0, 0, 0.04);
          border-right: 3px solid #000;
          font-weight: 500;
        }

        .ant-menu-inline .ant-menu-item:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }

        .ant-menu-inline .ant-menu-item-icon {
          min-width: 16px;
          font-size: 18px;
        }

        /* User button styles */
        .ant-btn-text {
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;

