import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import assets from "../assets/assets";
import logo from "../assets/logo.png";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between py-4 px-6 font-medium shadow-md bg-white">
      {/* Logo */}
      <div className="">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-20 h-10 object-contain" />
          <h2 className="text-lg font-semibold whitespace-nowrap">
            Luxuriance-Fashion
          </h2>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-rose-700 transition ${
                isActive ? "text-rose-700 font-semibold" : ""
              }`
            }
          >
            <p>{link.label}</p>
            <hr className="w-2/4 border-none h-[2px] bg-rose-700 hidden group-[.active]:block" />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          src={assets.search_icon}
          className="w-12 cursor-pointer hover:scale-110 transition"
          alt="search"
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-8 cursor-pointer hover:scale-110 transition"
            alt="profile"
          />
          {/* drop down */}
          {token && (
            <div className="group-hover:opacity-100 opacity-0 group-hover:translate-y-0 -translate-y-2 transition-all duration-200 absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-3">
              <p className="cursor-pointer hover:text-rose-700">My Profile</p>
              <p
                onClick={() => navigate("/orders")}
                className="cursor-pointer hover:text-rose-700"
              >
                Orders
              </p>
              <p
                onClick={logout}
                className="cursor-pointer hover:text-rose-700"
              >
                Log Out
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="cart"
            className="w-8 hover:scale-110 transition"
          />
          <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-rose-600 text-white rounded-full text-[10px]">
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <img
          onClick={() => setMenuOpen(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-10 cursor-pointer sm:hidden"
        />
      </div>
      {/* Mobile Menu */}

      <div
        className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${
          menuOpen ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropDown_icon}
              className="h-4 rotate-180"
              alt="no"
            />
            <p>back</p>
          </div>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
