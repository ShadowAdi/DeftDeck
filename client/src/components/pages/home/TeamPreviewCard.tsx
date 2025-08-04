import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import React from "react";

const TeamPreviewCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create-team"); 
  };

  return (
    <div
      onClick={handleClick}
      className=" border-dashed border-2
 border-gray-200  hover:border-gray-300 transition-colors cursor-pointer rounded-xl flex flex-col items-center justify-center h-64   w-full max-w-md mx-auto shadow-sm hover:shadow-md "
    >
      <div className="flex flex-row items-center justify-center space-x-3">
        <PlusIcon className="text-gray-700" />
        <span className="text-lg font-semibold text-gray-700 ">
          Create Team
        </span>
      </div>
    </div>
  );
};

export default TeamPreviewCard;
