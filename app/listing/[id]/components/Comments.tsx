"use client";
//import getCurrentUser from "@/app/actions/getCurrentUser";
//import Avatar from "@/app/components/Avatar";
import { User } from "next-auth";
import Form from "./CommentForm";
import { Comment, Bid } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import CommentBox from "./CommentBox";

interface CommentsProps {
  initialComments: (Comment & { user: User | null })[];
  initialBids: (Bid & { user: { name: string | null } })[];
  listingId: string;
}

const Comments: React.FC<CommentsProps> = ({
  initialComments,
  initialBids,
  listingId,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [bids, setBids] = useState(initialBids);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusherClient.subscribe(`listing-${listingId}`);
    // topRef.current?.scrollIntoView({ behavior: "smooth" });

    const commentHandler = (comment: Comment & { user: User | null }) => {
      setComments((current) => {
        if (find(current, { id: comment.id })) {
          return current;
        }

        return [comment, ...current];
      });
      // topRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    pusherClient.bind("new-comment", commentHandler);

    return () => {
      pusherClient.unsubscribe(`listing-${listingId}`);
      pusherClient.unbind("new-comment", commentHandler);
    };
  }, [listingId]);

  useEffect(() => {
    pusherClient.subscribe(`listing-${listingId}`);

    const bidHandler = (bid: Bid & { user: { name: string | null } }) => {
      setBids((current) => {
        if (find(current, { id: bid.id })) {
          return current;
        }

        return [bid, ...current];
      });
    };

    pusherClient.bind("new-bid", bidHandler);

    return () => {
      pusherClient.unsubscribe(`listing-${listingId}`);
      pusherClient.unbind("new-bid", bidHandler);
    };
  }, [listingId]);

  return (
    <div
      id="comments"
      className="p-2 md:p-4 border shadow-md rounded-md shadow-gray-400 bg-white"
    >
      <h1 className="pb-2 md:pb-4">Comments & Bids</h1>
      <Form listingId={listingId} />
      <div ref={topRef}></div>
      <CommentBox comments={comments} bids={bids} />
    </div>
  );
};

export default Comments;
