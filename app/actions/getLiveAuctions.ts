import prisma from "@/app/libs/prismadb";

async function getLiveAuctions() {
  try {
    const liveAuctions = await prisma.listing.findMany({
      where: {
        status: "LIVE",
      },
    });
    return liveAuctions;
  } catch (error) {
    console.error("Error fetching live auctions:", error);
    return [];
  }
}
export default getLiveAuctions;
