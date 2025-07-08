import { useEffect, useState } from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import GooeyNav from "./GooeyNav";
import NavbarSkeleton from "./NavbarSkeleton";

interface NavItem {
  label: string;
  href: string;
}

const items: NavItem[] = [
  { label: "Home", href: "/dashboard" },
  { label: "Interact", href: "/interact" },
  { label: "Gallery", href: "/mypost" },
];

const Navbar = ({ activePath }: { activePath: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const index = items.findIndex((item) => item.href === activePath);
    setActiveIndex(index !== -1 ? index : 0);

    return () => setIsMounted(false);
  }, [activePath]);

  if (!isMounted) {
    return <NavbarSkeleton />;
  }

  return (
    <div className="w-full px-4 sm:px-6 sm:py-18 lg:px-10 pt-6 sm:pt-8 lg:pt-10 font-michroma">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 sm:gap-y-0">
        <h1 className="text-xl sm:text-2xl text-[#cfbfa0] tracking-widest">
          POSTIFY
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-y-4 sm:gap-y-0">
          <div className="sm:mx-12 lg:mx-20 text-xs md:text-[14px] flex flex-col sm:flex-row items-center gap-y-0 md:gap-y-10">
            <GooeyNav
              items={items}
              initialActiveIndex={activeIndex}
              key={`gooey-${activeIndex}`}
            />
            <SignedIn>
              <div className="ml-0 sm:ml-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
