import getCurrentUser from "../../../app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";
//import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
//import { getSession } from "next-auth/react";

// interface Listing {
//   year: number;
//   make: string;
//   model: string;
//   miles: number;
//   price: number;
//   description: string;
// }

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  try {
    //const loggedInUser = await getSession();
    //console.log("getSessionResult", loggedInUser);
    const body = await req.json();

    //console.log("Request Object: ", req);

    console.log("Server Data: ", body);

    const { year, make, model, miles, price, location, description } = body;

    console.log("User: ", currentUser);

    //console.log(year, miles, price);
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
