"use client";

import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

interface CoverImageProps {
  listingId: string;
  url?: string;
  owner?: boolean;
}

const CoverImage: React.FC<CoverImageProps> = ({ listingId, url, owner }) => {
  const [imageUrl, setImageUrl] = useState<string>(url || "");
  const handleUpload = (result: any) => {
    setImageUrl(result.info.secure_url);
    axios.post(`/api/listing/${listingId}/cover-image`, {
      url: result.info.secure_url,
    });
  };

  return (
    <>
      <div className="rounded-b-md shadow-md flex flex-col justify-between bg-white shadow-gray-400">
        {imageUrl && (
          <CldImage
            key={imageUrl}
            width={500}
            height={300}
            src={imageUrl}
            crop="fill"
            alt="Uploaded Image"
            className="rounded-b-md w-full object-cover"
          />
        )}
        {!imageUrl && (
          <Image
            src="/images/default-vehicle-image.png"
            alt="Vehicle Image"
            width={500}
            height={300}
            className="w-full object-cover"
          />
        )}
      </div>
      {owner && (
        <CldUploadButton
          options={{
            maxFiles: 1,
            resourceType: "image",
            folder: `listing-${listingId}`,
          }}
          onSuccess={handleUpload}
          uploadPreset="auctions"
          className="absolute top-2 right-2 md:top-4 md:right-4 text-blue-500 bg-white rounded-md w-fit"
        >
          {imageUrl ? (
            <div className="flex items-center gap-1">
              <FaRegEdit />
              <span>Edit Image</span>
            </div>
          ) : (
            "Add Cover Image"
          )}
        </CldUploadButton>
      )}
    </>
  );
};

export default CoverImage;
