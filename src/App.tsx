import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import EmployeeTable from "./components/EmployeeTable";
import { Toaster } from "./components/ui/sonner";
import Users from "./components/Users";
import LeaveRequest from "./components/LeaveRequest";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* {Public} */}
          <Route>
            <Route path="/" element={<Login />} />
          </Route>

          {/* {main} */}
          <Route element={<Home />}>
            <Route path="/employees" element={<EmployeeTable />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/leave-request" element={<LeaveRequest />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
