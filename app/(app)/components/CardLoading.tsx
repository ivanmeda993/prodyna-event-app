import CardSkeleton from "@/app/components/CardSkeleton";

const CardLoading = () => {
  return (
    <div className="w-full flex items-center justify-center  mt-44">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="p-2">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default CardLoading;
