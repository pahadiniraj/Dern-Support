import React from "react";

const Quote = ({ quote }) => {
  return (
    <div>
      {quote.map((value) => (
        <div key={value.id}>
          <p>Quote Amount: {value.amount}</p>
          <p>Created At: {new Date(value.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Quote;
