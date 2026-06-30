import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/home";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* {Public} */}
          <Route>
            <Route path="/" element={<Login />} />
          </Route>

          {/* {main} */}
          <Route element={<Home />}>
            <Route path="/employees" element={<EmployeeTable />}></Route>
            <Route path="/employee/add" element={<EmployeeForm />}></Route>
            <Route path="/employee/edit/:id" element={<EmployeeForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
