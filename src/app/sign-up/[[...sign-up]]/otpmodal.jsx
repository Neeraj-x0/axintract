import React, { useState, useEffect } from "react";
import { Modal, Flex, Input, Typography, Button, message } from "antd";
import axios from "axios";
import { API_URL } from "@/constants";

const { Title, Text, Link } = Typography;

const OtpVerificationModal = ({
  visible,
  onCancel,
  onVerify,
  email,
  error,
}) => {
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    let interval;
    // Start timer when modal becomes visible
    if (visible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // Clear interval when component unmounts or timer reaches 0
    return () => {
      clearInterval(interval);
    };
  }, [visible, timer]);

  // Initialize timer when modal becomes visible
  useEffect(() => {
    if (visible) {
      setTimer(60); // 1 minute timer
    } else {
      setTimer(0);
    }
  }, [visible]);

  const onChange = (value) => {
    setOtpValue(value);
  };

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      message.warning("Please enter a complete 6-digit verification code");
      return;
    }

    setLoading(true);
    try {
      await onVerify(otpValue);
      message.success("Verification successful!");
      handleCancel(); // Close the modal on success
    } catch (error) {
      message.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOtpValue(""); // Reset OTP value when closing
    onCancel();
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      // Call your API endpoint to resend verification code
      const res=await axios.post(`${API_URL}/auth/resendVerification`, { email });
      console.log("Resend response:", res.data);
      message.success("Verification code resent successfully!");
      setTimer(60); // Reset timer to 1 minute
    } catch (error) {
      message.error("Failed to resend verification code. Please try again.");
      console.error("Resend error:", error);
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
      maskClosable={false}
    >
      <Flex gap="middle" align="center" vertical style={{ padding: "16px 0" }}>
        <Title level={4} style={{ marginBottom: "8px", textAlign: "center" }}>
          Verify Your Account
        </Title>

        <Text
          type="secondary"
          style={{ textAlign: "center", marginBottom: "24px" }}
        >
          {email
            ? `Enter the 6-digit verification code sent to ${email}`
            : "Enter the 6-digit verification code sent to your email"}
        </Text>

        <Input.OTP
          inputType="numeric"
          length={6}
          value={otpValue}
          onChange={onChange}
          autoFocus
          size="large"
          style={{ marginBottom: "24px" }}
          inputStyle={{ width: "48px", height: "48px", fontSize: "18px" }}
          className="otp-input"
          disabled={loading}
        />

        {error && (
          <Text
            type="danger"
            style={{ marginBottom: "24px", textAlign: "center" }}
          >
            {error}
          </Text>
        )}

        <Button
          type="primary"
          onClick={handleVerify}
          loading={loading}
          disabled={otpValue.length !== 6}
          block
          size="large"
          style={{ marginBottom: "16px" }}
        >
          Verify
        </Button>

        <Flex align="center" justify="center">
          <Text type="secondary" style={{ marginRight: "8px" }}>
            Didn't receive the code?
          </Text>
          {timer > 0 ? (
            <Text type="secondary">Resend in {formatTime(timer)}</Text>
          ) : (
            <Link
              onClick={handleResendCode}
              disabled={resendLoading}
              style={{ cursor: resendLoading ? "not-allowed" : "pointer" }}
            >
              {resendLoading ? "Sending..." : "Resend Code"}
            </Link>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default OtpVerificationModal;
