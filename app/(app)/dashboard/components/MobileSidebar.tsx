interface IMobileSidebar {
  data?: any;
}
export default function MobileSidebar({}: IMobileSidebar) {
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      MobileSidebar
    </div>
  );
}
