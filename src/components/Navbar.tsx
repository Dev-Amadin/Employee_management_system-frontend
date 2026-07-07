import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContextProvider";
import { BellIcon, ExitLeftIcon, HamburgerIcon } from "../utils/icons";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();
  const { setIsMenuActive } = useThemeContext();

  function signOut() {
    toast("Logged Out", {
      description: "You have successfully Logged out.",
      position: "top-right",
    });
    navigate("/");
  }

  return (
    <div className="flex items-center justify-between p-2 shadow-md bg-light">
      <div
        className="hover:bg-purple-accent/10 cursor-pointer text-primary flex items-center justify-center rounded-full p-2
      transition-all duration-300"
        onClick={() => setIsMenuActive((prev) => !prev)}
      >
        <HamburgerIcon />
      </div>
      <div className="flex items-center gap-1">
        <div className="hover:bg-purple-accent/10 cursor-pointer transition-all duration-300 text-primary flex items-center justify-center rounded-full p-2">
          <BellIcon />
        </div>
        <div
          onClick={signOut}
          className="hover:bg-purple-accent/10 cursor-pointer transition-all duration-300 text-primary flex items-center justify-center rounded-full p-2"
        >
          <ExitLeftIcon />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
