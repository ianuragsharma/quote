"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !otp.trim()) {
      setError("Both fields are required");
      return;
    }
    try {
      const response = await axios.post(
        "https://assignment.stage.crafto.app/login",
        {
          username,
          otp: "1234",
        }
      );
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      router.push("/quotes");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
