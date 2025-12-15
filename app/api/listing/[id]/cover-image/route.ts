import prisma from "../../../../libs/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id: listingId } = await params;
  const body = await request.json();
  const { url: coverImageUrl } = body;

  if (!coverImageUrl) {
    return new Response(
      JSON.stringify({ message: "No cover image URL provided" }),
      { status: 400 }
    );
  }

  // Update the listing with the new cover image URL
  try {
    await prisma.listing.update({
      where: { id: listingId },
      data: { coverImage: coverImageUrl },
    });

    return new Response(
      JSON.stringify({
        message: "Cover image updated successfully",
        coverImageUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cover image:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update cover image" }),
      { status: 500 }
    );
  }
}
