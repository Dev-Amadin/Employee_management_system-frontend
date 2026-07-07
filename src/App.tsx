import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import EmployeeTable from "./components/EmployeeTable";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          {/* {Public} */}
          <Route>
            <Route path="/" element={<Login />} />
          </Route>

          {/* {main} */}
          <Route element={<Home />}>
            <Route path="/employees" element={<EmployeeTable />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
