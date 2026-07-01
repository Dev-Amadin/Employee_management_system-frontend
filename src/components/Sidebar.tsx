import { NavLink } from "react-router-dom";
import { SiderbarLinks } from "../utils/Appdata";
import  logo  from "../assets/login_svg.svg";
import { useThemeContext } from "../context/ThemeContextProvider";

function Sidebar() {

    const {setIsMenuActive} = useThemeContext();


  return (
    <div className="h-screen shadow-md overflow-auto">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-1">
          <div className="bg-purple-accent/10 text-primary text-xs flex items-center justify-center rounded-full p-2">
            <img src={logo} className="h-6 w-6"  />
          </div>
          <h1 className="text-xl font-semibold text-primary uppercase">
            Brand
          </h1>
        </div>
        <div className="rounded-full cursor-pointer hover:bg-purple-accent/10 transition-colors duration-300 p-2"
        onClick={() => setIsMenuActive((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="mt-4 mx-4">
        {SiderbarLinks.map((links, index) => (
          <div key={index} className="mb-2">
            <h2 className="text-md text-primary uppercase mb-1">
              {links.title}
            </h2>
            {links.links.map((link, index) => (
              <NavLink
                key={index}
                to={`/${link.link}`}
                className="flex items-center gap-2 text-slate-900 text-sm capitalize p-2
         hover:bg-purple-accent/10 transition-colors duration-300 rounded-md"
              >
                <span>{link.icon}</span>
                {link.name}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
