import { NavLink } from "react-router-dom";
import logo from "../assets/login_svg.svg";
import { useThemeContext } from "../context/ThemeContextProvider";
import { CancelIcon, UserIcon } from "../utils/icons";
import { SiderbarLinks } from "@/utils/appdata";

function Sidebar() {
  const { setIsMenuActive } = useThemeContext();

  const normalLink =
    "flex items-center gap-2 text-slate-900 text-sm capitalize p-2 hover:bg-purple-accent/10 transition-colors duration-300 rounded-md mb-2";
  const activeLink =
    "flex items-center gap-2 text-white bg-primary text-sm capitalize p-2 rounded-md mb-2 pointer-events-none";

  return (
    <div className="h-screen shadow-md bg-light overflow-hidden">
      <div className="flex items-center justify-between p-2 text-primary">
        <div className="flex items-center gap-1">
          <div className="bg-purple-accent/10 text-xs flex items-center justify-center rounded-full p-2">
            <img src={logo} className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold uppercase">Brand</h1>
        </div>
        <div
          className="rounded-full cursor-pointer hover:bg-purple-accent/10 transition-colors duration-300 p-2"
          onClick={() => setIsMenuActive((prev) => !prev)}
        >
          <CancelIcon size="size-3" />
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-between mx-4">
        <div className="mt-4 ">
          {SiderbarLinks.map((links, index) => (
            <div key={index} className="mb-2">
              <h2 className="text-md text-primary uppercase mb-1">
                {links.title}
              </h2>
              {links.links.map((link, index) => (
                <NavLink
                  key={index}
                  to={`/${link.link}`}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <span>{link.icon}</span>
                  {link.name}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center mt-20 p-2">
          <div className="flex items-center justify-center size-10 border border-primary rounded-full">
            <UserIcon/>
          </div>
          <div className="p-2">
            <h2 className="text-md font-semibold capitalize">Test user</h2>
            <p className="text-xs uppercase">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
