
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="h-screen bg-slate-50">
      
            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-2 ">
                  <Sidebar/>
                </div>
                <div className="col-span-10">
                    <div className="flex flex-col ">
                        <div className="h-14">
                          <Navbar/>
                        </div>
                        <div className="bg-green-300"> <Outlet/></div>
                    </div>
                </div>
            </div>
           
    </div>
  );
}

export default Home;
