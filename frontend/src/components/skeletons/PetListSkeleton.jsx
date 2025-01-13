const PetListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full my-4 p-4">
      {/* Skeleton for a list item */}
      <div className="flex gap-4 items-center animate-pulse bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center gap-4 w-full">
          <div className="skeleton h-16 w-16 rounded-full bg-gray-500"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="skeleton h-4 w-32 rounded-full bg-gray-500"></div>
            <div className="skeleton h-4 w-24 rounded-full bg-gray-500"></div>
            <div className="skeleton h-4 w-40 rounded-full bg-gray-500"></div>
            <div className="skeleton h-4 w-28 rounded-full bg-gray-500"></div>
          </div>
        </div>
      </div>

      {/* Another Skeleton item */}
      <div className="flex gap-4 items-center animate-pulse bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center gap-4 w-full">
          <div className="skeleton h-16 w-16 rounded-full bg-gray-500"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="skeleton h-4 w-32 rounded-full bg-gray-500"></div>
            <div className="skeleton h-4 w-24 rounded-full bg-gray-500"></div>
            <div className="skeleton h-4 w-40 rounded-full bg-gray-500"></div>
            <div className="skeleton h-4 w-28 rounded-full bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetListSkeleton;
