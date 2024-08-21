export default function NavigationPanel() {
  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <div className="h-[150px] w-[150px] rounded-full bg-gray-300"></div>
      <div>
        <div className="text-center text-2xl font-medium">Derek Tran</div>
        <div className="text-center">@datderek</div>
      </div>
      <div className="w-[150px] px-4 py-2 rounded-xl text-left bg-gray-800 text-white font-medium text-xl">
        Feed
      </div>
      <div className="w-[150px] px-4 py-2 rounded-xl text-left font-medium text-xl">
        Explore
      </div>
      <div className="w-[150px] px-4 py-2 rounded-xl text-left font-medium text-xl">
        Calendar
      </div>
    </div>
  );
}
