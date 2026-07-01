import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useThemeContext } from "../context/ThemeContextProvider";

function Home() {
  const { isMenuActive } = useThemeContext();

  return (
    <div className="h-screen bg-slate-50">
      <div className="flex h-screen">
        <div className={`${isMenuActive ? "w-64" : "w-0"} transition-all duration-300 `}>
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className="flex flex-col ">
            <div className="h-14">
              <Navbar />
            </div>
            <div className="bg-green-300">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
