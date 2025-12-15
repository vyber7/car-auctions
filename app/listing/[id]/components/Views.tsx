"use client";

import axios from "axios";
import { useEffect } from "react";

interface ViewsProps {
  listingId: string;
}

const Views: React.FC<ViewsProps> = ({ listingId }) => {
  useEffect(() => {
    axios
      .post("/api/listings/views", { id: listingId })
      .then((res) => {
        console.log("View recorded", res.data);
      })
      .catch((err) => {
        console.log("Error recording view", err);
      });
  }, [listingId]);
  return null;
};

export default Views;
