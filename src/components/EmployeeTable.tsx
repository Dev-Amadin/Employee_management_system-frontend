import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  type Employee,
} from "../services/EmployeeService";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   allEmployees();
  // }, []);

  function allEmployees() {
    getAllEmployees()
      .then((response) => {
        console.log("GET_ALL_RESPONSE:: ", response);
        setEmployees(response.data.content);
      })
      .catch((error) => {
        console.log("ERROR:: ", error);
      });
  }

  function addEmployee() {
    navigate("/employee/add");
  }

  function editEmployee(id?: string) {
    if (id) {
      navigate(`/employee/edit/${id}`);
    }
  }

  function deleteEmployee(id?: string) {
    if (id) {
      deleteEmployeeById(id)
        .then((response) => {
          console.log("DELETE:: ", response);
          allEmployees();
        })
        .catch((error) => console.log("DELETE ERROR:: ", error));
    }
  }

  return (
    <div className="m-10">
      <div className="rounded-2xl shadow-xl p-4">
        <div className="flex items-center justify-between  border-b border-slate-200 pb-4">
          <h1 className="font-bold text-2xl">Employees</h1>
          <div>
            <Button type="primary" text="Add Employee" onClick={addEmployee} />
          </div>
        </div>
        <table className="w-full my-12 text-left table-fixed">
          <thead>
            <tr>
              <th className="text-lg p-2">#</th>
              <th className="text-lg p-2">First Name</th>
              <th className="text-lg p-2">Last Name</th>
              <th className="text-lg p-2">Email</th>
              <th className="text-lg p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={index}
                className="hover:bg-sky-accent/10 transition-colors duration-300"
              >
                <td className="text-sm p-2">{index + 1}</td>
                <td className="text-sm p-2">{employee.firstName}</td>
                <td className="text-sm p-2">{employee.lastName}</td>
                <td className="text-sm p-2">{employee.email}</td>
                <td>
                  <a
                    className="text-sm text-primary cursor-pointer
                 hover:text-primary-hover hover:underline p-2 mr-2"
                    onClick={() => {
                      editEmployee(employee.id);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    className="text-sm text-danger cursor-pointer
                 hover:text-shadow-danger hover:underline p-2"
                    onClick={() => {
                      deleteEmployee(employee.id);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;
