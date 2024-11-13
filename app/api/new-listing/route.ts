import getCurrentUser from "../../../app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  try {
    const body = await req.json();

    console.log("Server Data: ", body);

    const { year, make, model, miles, price, location, description } = body;

    console.log("User: ", currentUser);

    if (
      !year ||
      !make ||
      !model ||
      !miles ||
      !price ||
      !location ||
      !description
    ) {
      return new NextResponse("Missing Information", { status: 400 });
    }

    const listing = {
      year: +year,
      make,
      model,
      miles: +miles,
      price: +price,
      location,
      description,
    };
    console.log("Listing to Create: ", listing);
    await prisma.listing.create({
      data: {
        userId: currentUser?.id,
        year: listing.year,
        make: listing.make,
        model: listing.model,
        price: listing.price,
        miles: listing.miles,
        location: listing.location,
        description: listing.description,
      },
    });
    console.log("Listing created successfully");
    return NextResponse.json(listing, { status: 201 });
  } catch (error: any) {
    console.log(error, "LISTING_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
