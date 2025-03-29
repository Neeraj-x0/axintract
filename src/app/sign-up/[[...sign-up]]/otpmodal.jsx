import React, { useState } from "react";
import { Modal, Flex, Input, Typography, Button, message } from "antd";

const { Title, Text } = Typography;

const OtpVerificationModal = ({
  visible,
  onCancel,
  onVerify,
  email,
  error,
}) => {
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);

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
        >
          Verify
        </Button>
      </Flex>
    </Modal>
  );
};

export default OtpVerificationModal;
