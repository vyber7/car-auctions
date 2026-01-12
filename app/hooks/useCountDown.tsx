// Hook for countdown timer
import { useEffect, useState } from "react";
import { pusherClient } from "@/app/libs/pusher";

const useCountDown = (targetDate: Date, listingId?: string) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [targetDateState, setTargetDateState] = useState<Date>(targetDate);

  useEffect(() => {
    if (!targetDateState) {
      return;
    }
    const interval = setInterval(() => {
      const now = new Date();
      const distance = targetDateState.getTime() - now.getTime();

      if (distance <= 0) {
        setTimeLeft("Ending...");
        clearInterval(interval);
        return;
      }
      const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (weeks > 0) {
        setTimeLeft(`${weeks}w ${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateState]);

  useEffect(() => {
    if (!listingId) {
      return;
    }

    const channelName = `listing-${listingId}`;
    const channel = pusherClient.subscribe(channelName);

    const endTimeHandler = (data: { newEndTime: Date }) => {
      const newEndTime = new Date(data.newEndTime);
      setTargetDateState(newEndTime);
    };

    channel.bind("new-end-time", endTimeHandler);

    return () => {
      channel.unbind("new-end-time", endTimeHandler);
      pusherClient.unsubscribe(channelName);
    };
  }, [listingId]);

  return timeLeft;
};

export default useCountDown;
