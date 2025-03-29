"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useClerk, useSignUp } from "@clerk/nextjs";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { API_URL } from "@/constants";
import OtpVerificationModal from "./otpmodal";
const SignUpPage = () => {
  const { isSignedIn, loaded } = useClerk();
  const { signUp } = useSignUp();
  const router = useRouter();

  // State Management with improved organization
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneNumber: "",
  });
  const [cookies, setCookie] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [modalError, setModalError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Optimized password visibility toggle
  const togglePasswordVisibility = useCallback((field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  // Memoized form validation for better performance
  const validateForm = useCallback(() => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please provide your full name");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  }, [formData]);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  // Optimized form submission with proper error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const signUpAttempt = await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        password: formData.password,
      });

      // Parallel API call for better performance

      const emailVerificationPromise =
        signUpAttempt.prepareEmailAddressVerification();

      // Wait for both operations to complete
      await Promise.all([emailVerificationPromise]);

      // Show OTP verification modal
      setShowOtpModal(true);
    } catch (err) {
      // More detailed error handling
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "API connection failed");
      } else if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].message);
      } else {
        setError("Sign-up failed. Please try again.");
      }
      console.error("Sign-up error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (otp) => {
    try {
      await signUp.attemptEmailAddressVerification({ code: otp });
      setModalError("");
      await axios.post(
        `${API_URL}/api/user`,
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          companyName: formData.companyName,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `signupSuccess`,
          },
        }
      );
      router.push("/user/dashboard");
    } catch (err) {
      setError("Verification failed. Please try again.");
      setModalError("Verification failed. Please try again.");
    }
  };

  // Optimized input handler with debounce pattern
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error message when user types
      if (error) setError("");
    },
    [error]
  );

  // Efficient redirect logic
  useEffect(() => {
    if (loaded && isSignedIn) {
      router.push("/user/dashboard");
    }
  }, [loaded, isSignedIn, router]);

  // Early return during loading state
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Sign-Up Form - Optimized for performance */}
      <motion.div
        className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex items-center justify-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key="form-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-600 mb-4">
                  Join our platform and unlock new possibilities
                </p>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
              >
                {/* Name Fields */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.005 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                      placeholder="John"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.005 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                      placeholder="Doe"
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Phone Number Field - Optimized for smoother interaction */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <motion.div
                    className="flex group focus-within:ring-2 focus-within:ring-black rounded-lg overflow-hidden"
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-200">
                      <img
                        src="https://flagcdn.com/w20/in.webp"
                        alt="India"
                        className="mr-2 h-4 w-auto"
                        loading="lazy"
                      />
                      <span className="text-gray-700 whitespace-nowrap">
                        +91
                      </span>
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 text-black placeholder-gray-400 focus:outline-none transition"
                      placeholder="98765 43210"
                      autoComplete="tel-national"
                      pattern="[0-9]{10}"
                      required
                    />
                  </motion.div>
                </div>

                {/* Company Name Field */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="Axdone360"
                    autoComplete="organization"
                    required
                  />
                </div>

                {/* Password Fields - Optimized for security and UX */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("password")}
                      className="text-sm text-gray-600 hover:text-black flex items-center space-x-1 focus:outline-none"
                      aria-label={
                        passwordVisibility.password
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {passwordVisibility.password ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                      <span className="hidden sm:inline">
                        {passwordVisibility.password ? "Hide" : "Show"}
                      </span>
                    </button>
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    id="password"
                    name="password"
                    type={passwordVisibility.password ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      className="text-sm text-gray-600 hover:text-black flex items-center space-x-1 focus:outline-none"
                      aria-label={
                        passwordVisibility.confirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {passwordVisibility.confirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                      <span className="hidden sm:inline">
                        {passwordVisibility.confirmPassword ? "Hide" : "Show"}
                      </span>
                    </button>
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      passwordVisibility.confirmPassword ? "text" : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                </div>
                <div id="clerk-captcha"></div>

                {/* Submit Button - Optimized for a better touch experience */}
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 mt-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow transition duration-200 flex items-center justify-center ${
                    isLoading ? "opacity-90" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </motion.button>
              </motion.form>

              {/* Authentication Transition */}
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-black font-medium hover:underline transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side: Visual Narrative - Optimized for performance */}
      <motion.div
        className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="mb-8 relative"
          >
            <div className="gooey-effect absolute inset-0 z-0"></div>
            <Image
              src="https://res.cloudinary.com/dguddaxjl/image/upload/v1743076197/media-uploads/1743076196827-ghamsvof50g.png"
              alt="Abstract Design"
              width={400}
              height={400}
              className="relative z-10"
              priority={true}
              loading="eager"
            />
          </motion.div>
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Your Journey Begins Here
          </motion.h2>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-300 max-w-md mx-auto"
          >
            Embark on a transformative digital experience, where possibilities
            are limited only by imagination.
          </motion.p>
        </div>
      </motion.div>
      <OtpVerificationModal
        visible={showOtpModal}
        onCancel={() => setShowOtpModal(false)}
        onVerify={handleVerify}
        email={formData.email}
        error={modalError}
      />
    </div>
  );
};

export default SignUpPage;
