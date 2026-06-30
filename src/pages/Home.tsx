
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="h-screen bg-slate-50">
      
            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-2 ">
                  <Sidebar/>
                </div>
                <div className="bg-purple-200 col-span-10">
                    <div className="flex flex-col ">
                        <div className="bg-amber-200 h-12"></div>
                        <div className="bg-green-300"> <Outlet/></div>
                    </div>
                </div>
            </div>
           
    </div>
  );
}

export default Home;
