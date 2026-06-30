import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/employees" element={<EmployeeTable />}></Route>
          <Route path="/employee/add" element={<EmployeeForm />}></Route>
          <Route path="/employee/edit/:id" element={<EmployeeForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
