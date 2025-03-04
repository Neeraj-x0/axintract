"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  WarningOutlined,
  HomeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Typography, Space, Result, Spin } from "antd";
import Head from "next/head";

const { Text } = Typography;

export default function NotFound() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleGoHome = () => {
    setIsLoading(true);
    router.push("/");
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => window.location.reload(), 100);
  };

  if (!mounted) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Page Not Found | 404</title>
        <meta name="description" content="The requested page could not be found." />
      </Head>
      <div style={{ 
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Result
            status="404"
            icon={
              <div style={{ 
                padding: '24px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <WarningOutlined 
                  style={{ 
                    fontSize: '64px', 
                    color: '#000000'
                  }} 
                />
              </div>
            }
            title="Page Not Found"
            subTitle={
              <Text style={{ 
                fontSize: '16px',
                color: 'rgba(0, 0, 0, 0.45)',
                maxWidth: '480px',
                margin: '0 auto'
              }}>
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
              </Text>
            }
            extra={
              <Space size="middle" align="center" direction="horizontal">
                <Button 
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={handleGoHome}
                  size="large"
                  style={{
                    height: '40px',
                    fontWeight: 500,
                    backgroundColor: '#000000',
                    borderColor: '#000000'
                  }}
                >
                  Return to Home
                </Button>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  size="large"
                  style={{
                    height: '40px',
                    fontWeight: 500
                  }}
                >
                  Refresh Page
                </Button>
              </Space>
            }
          >
            <Text type="warning" style={{ fontSize: '14px', display: 'block', textAlign: 'center' }}>
              Error Code: 404 | Resource Not Found
            </Text>
          </Result>
        )}
      </div>
    </>
  );
}