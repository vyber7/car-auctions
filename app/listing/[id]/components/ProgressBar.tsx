// This component will display a bar indicating the ending time of an auction.
"use client";
import { useEffect, useState, useRef } from "react";
import useCountDown from "@/app/hooks/useCountDown";
import clsx from "clsx";
import { Bid } from "@prisma/client";
import { pusherClient } from "@/app/libs/pusher";

interface ProgressBarProps {
  endTime: Date | null;
  listingId: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ endTime, listingId }) => {
  const progress = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentEndTime, setCurrentEndTime] = useState<Date | null>(endTime);
  const countdown = useCountDown(currentEndTime as Date, listingId);

  // calculate width based on time left
  let width = currentEndTime
    ? Math.max(
        0,
        Math.min(
          100,
          ((currentEndTime.getTime() - new Date().getTime()) /
            (2 * 60 * 1000)) *
            100
        )
      )
    : 0; // 2 minutes total

  // update width every second
  useEffect(() => {
    const now = new Date();
    const distance = currentEndTime
      ? currentEndTime.getTime() - now.getTime()
      : NaN;

    if (distance <= 2 * 60 * 1000 && distance > 0) {
      setIsVisible(true);
      if (progress.current) {
        progress.current.style.width = `${Math.round(width)}%`;
      }
    } else {
      setIsVisible(false);
    }
  }, [width, currentEndTime]);

  useEffect(() => {
    if (!listingId) return;

    pusherClient.subscribe(`listing-${listingId}`);

    const endTimeHandler = (data: { newEndTime: Date }) => {
      const newEndTime = new Date(data.newEndTime);
      setCurrentEndTime(newEndTime);
      setIsVisible(true);
    };

    pusherClient.bind("new-end-time", endTimeHandler);

    return () => {
      pusherClient.unsubscribe(`listing-${listingId}`);
      pusherClient.unbind("new-end-time", endTimeHandler);
    };
  }, [listingId]);

  return (
    <div
      className={clsx(
        isVisible ? "block" : "hidden",
        "w-full bg-red-100 rounded-t-md"
      )}
    >
      <div
        ref={progress}
        className={clsx(
          isVisible ? "block" : "hidden",
          "h-1 bg-red-500 rounded-tl-md"
        )}
      ></div>
    </div>
  );
};
export default ProgressBar;
