const NavbarSkeleton = () => {
  return (
    <div className="flex justify-between items-center px-10 pt-10 animate-pulse">
      <div className="h-6 w-24 bg-gray-700 rounded"></div>
      <div className="flex gap-10">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-700 rounded-full"></div>
        ))}
        <div className="h-10 w-10 rounded-full bg-gray-700"></div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;
