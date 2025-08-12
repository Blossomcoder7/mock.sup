import { Suspense, type ReactNode } from "react";

const RenderWithSuspense = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed w-full z-[1600] bg-mw-black text-white h-screen flex items-center justify-center inset-0">
          Loading..
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default RenderWithSuspense;
