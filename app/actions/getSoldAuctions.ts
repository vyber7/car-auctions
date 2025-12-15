// This file will contain the logic to fetch sold auctions
import prisma from "@/app/libs/prismadb";

async function getSoldAuctions() {
  try {
    const soldAuctions = await prisma.listing.findMany({
      where: {
        result: "SOLD",
      },
    });
    return soldAuctions;
  } catch (error) {
    console.error("Error fetching sold auctions:", error);
    return [];
  }
}
export default getSoldAuctions;
