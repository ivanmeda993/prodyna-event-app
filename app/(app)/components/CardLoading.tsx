import CardSkeleton from "@/app/components/CardSkeleton";

const CardLoading = () => {
  return (
    <div className="w-full flex items-center justify-center  pt-24">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="p-2">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default CardLoading;
