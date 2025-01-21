//#todo make the button use from   shadcn?
export const EdwixButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="flex justify-center border-black items-center w-fit max-w-full h-fit px-6 pl-12 py-2  border rounded-full cursor-pointer shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-shadow duration-300 self-start">
      <span className="">{children}</span>
    </button>
  );
};
