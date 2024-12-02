//import getCurrentUser from "@/app/actions/getCurrentUser";
//import Avatar from "@/app/components/Avatar";
import prisma from "@/app/libs/prismadb";
import Form from "./Form";

interface CommentsProps {
  listingId: string;
}

const Comments: React.FC<CommentsProps> = async ({ listingId }) => {
  //const currentUser = await getCurrentUser();

  const comments = await prisma.comment.findMany({
    where: {
      listingId: listingId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="mb-2 p-4 border shadow-md rounded-md shadow-gray-400">
      <h1 className="pb-4">Comments & Bids</h1>
      <Form listingId={listingId} />
      <ul className="flex flex-col gap-2">
        {comments.map((comment) => {
          let date = comment.createdAt.toDateString();
          date = date.slice(4, 10);
          let name = comment.user?.name?.split(" ")[0];
          const capitalize = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          };

          return (
            <li key={comment.id} className="mb-2">
              <div className="flex">
                <div className="pr-2 font-bold ">
                  {capitalize(name as string)}
                </div>
                <div className="pl-2 text-gray-400">{date}</div>
              </div>
              <div className="p-2 rounded-md bg-gray-200 w-fit">
                {comment.body}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
