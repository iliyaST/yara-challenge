import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center gap-5 flex-wrap bg-orange-300 p-3">
      <NavTab
        active={pathname === "/products"}
        label="Products"
        location="/products"
      />
      <NavTab
        active={pathname === "/warehouses"}
        label="Warehouses"
        location="/warehouses"
      />
    </nav>
  );
};

const NavTab = ({
  active,
  label,
  location,
}: {
  active: boolean;
  label: string;
  location: string;
}) => {
  return (
    <NavLink
      to={location}
      className={`block p-2 ${
        active ? `bg-orange-400 rounded` : ""
      } lg:inline-block lg:mt-0 text-white hover:text-stone-100`}
    >
      {label}
    </NavLink>
  );
};

export default Navbar;
