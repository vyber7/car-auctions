//import getCurrentUser from "@/app/actions/getCurrentUser";
//import Avatar from "@/app/components/Avatar";
import prisma from "@/app/libs/prismadb";

interface BodyProps {
  listingId: string;
}

const Body: React.FC<BodyProps> = async ({ listingId }) => {
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
      <ul className="flex flex-col gap-2">
        {comments.map((comment) => {
          let date = comment.createdAt.toDateString();
          date = date.slice(4, 10);

          return (
            <li key={comment.id} className="flex justify-start">
              <div className="font-bold p-2 pl-0 w-1/5 text-right">
                {comment.user?.name}
              </div>
              <div className="flex w-4/5">
                <div className="p-2 rounded-md bg-gray-200">{comment.body}</div>
                <div className="pl-1 text-xs text-gray-500 min-w-12">
                  {date}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Body;
