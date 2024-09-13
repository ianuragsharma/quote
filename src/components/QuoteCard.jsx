"use client";

import { format } from "date-fns";

const QuoteCard = ({ quote }) => {
  const date = new Date(quote.createdAt);

  return (
    <div className="bg-white shadow-xl rounded-md overflow-hidden w-full md:w-[280px]">
      <div className="relative">
        <img
          height={400}
          width={300}
          src={quote?.mediaUrl}
          alt="Quote Image"
          className="w-full h-64 object-cover"
        />
        <div className="absolute h-full text-center overflow-hidden text-lg font-medium bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          {quote.text}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">Posted by: {quote.username}</p>
        <p className="text-sm text-gray-600">
          Created at: {format(date, "MMMM do, yy h:mm a")}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
