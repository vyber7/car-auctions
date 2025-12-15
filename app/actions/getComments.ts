import prisma from "../libs/prismadb";

async function getComments(listingId: string) {
  try {
    if (!listingId) {
      throw new Error("Listing ID is required");
    }

    const comments = await prisma.comment.findMany({
      where: { listingId },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export default getComments;
