"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
