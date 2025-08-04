import React from "react";

const ImageInput = ({
  imageUrl,
  imagePreview,
  className
}: {
  imageUrl: string;
  imagePreview: string;
  className:string
}) => {
  return (
    <img
      src={imageUrl}
      alt={imagePreview}
      className={`mt-2 w-full max-w-lg object-cover  rounded-lg ${className}`}
    />
  );
};

export default ImageInput;
