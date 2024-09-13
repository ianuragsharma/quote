"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const redirect = setTimeout(() => {
      if (token) {
        router.push("/quotes");
      } else {
        router.push("/login");
      }
    }, 100);

    return () => clearTimeout(redirect);
  }, [router]);

  return loading ? <LoadingSpinner /> : null;
};

export default HomePage;
