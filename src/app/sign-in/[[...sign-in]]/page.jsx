"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [cookies, setCookie] = useCookies();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signin`, {
        email,
        password,
      })
      .then((response) => { 
        toast.success(response.data.message);
        setCookie("token", response.data.token, { path: "/user/dashboard" });
        router.push("/user/dashboard");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Sign In Form */}
      <motion.div
        className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold text-black mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 mb-6">
                Sign in to continue your experience
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
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
                    onClick={togglePasswordVisibility}
                    className="text-sm text-gray-600 hover:text-black flex items-center space-x-1 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span>{showPassword ? "Hide" : "Show"}</span>
                  </button>
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow-lg transition duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : null}
                {isLoading ? "Signing in..." : "Sign In"}
              </motion.button>
            </motion.form>

            <motion.div variants={itemVariants} className="pt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-black font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Image and Text */}
      <motion.div
        className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-8"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeOut", // Fixed easing function
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
            />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Discover a Better Experience
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-300 max-w-md mx-auto"
          >
            Join thousands of users who trust our platform for simplified,
            secure access to their digital world.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;
