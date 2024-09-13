"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import QuoteCard from "@/components/QuoteCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import withAuth from "@/components/withAuth";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
          { headers: { Authorization: token } }
        );
        if (response.data.data.length === 0) setHasMore(false);
        setQuotes((prev) => [...prev, ...response.data.data]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    };

    fetchQuotes();
  }, [offset]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <div className=" shadow-md ">
        <div className="max-w-7xl p-4  mx-auto flex justify-between items-center ">
          <h1 className="text-2xl md:text-3xl font-semibold">Quotes</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-7xl px-4 mx-auto my-12">
        <div className="flex flex-wrap gap-x-6 gap-y-14">
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} />
          ))}
        </div>
        <div className="md:w-[20%] mx-auto mt-6">
          {hasMore && (
            <button
              onClick={() => setOffset((prev) => prev + limit)}
              className="bg-blue-500 text-white w-full p-2 mt-4 rounded-md"
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
};

export default withAuth(QuotesPage);
