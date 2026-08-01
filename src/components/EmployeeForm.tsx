import Button from "./Btn";
import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeesWithSpecification,
  updateEmployee,
  type Employee,
} from "../services/EmployeeService";
import Input from "./Input";
import { toaster } from "@/utils/commons";
import CustomSelect from "./CustomSelect";
import { DEPARTMENT_OPTIONS } from "@/utils/appdata";

type EmployeeFormProps = {
  onCloseModal: () => void;
  onSuccess: () => void;
  isEdit: boolean;
  employee?: Employee;
};

function EmployeeForm({
  onCloseModal,
  onSuccess,
  isEdit,
  employee,
}: EmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [id, setId] = useState("");

  const [managerId, setManagerId] = useState("");
  const [query, setQuery] = useState("");
  const [openManagerSearch, setOpenManagerSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [managers, setManagers] = useState<Employee[]>([]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (isEdit && employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setDepartment(employee.department);
      setQuery(employee.managerName || "");
      setId(employee.id ? employee.id : "");
    }
  }, [isEdit]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setManagers([]);
      return;
    }
    const timer = setTimeout(() => {
      handleManagerSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function saveOrUpdateEmployee(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (validateForm()) {
      const data = { firstName, lastName, email, department, managerId };
      console.log("data::: ", data);

      if (isEdit) {
        updateEmployee(id, data)
          .then(() => {
            onCloseModal();
            toaster(
              true,
              "Employee Updated",
              `You have successfully updated employee ${data.firstName} ${data.lastName}.`,
            );

            onSuccess();
          })
          .catch((error) => {
            console.log("UPDATE EMPLOYEE ERROR:: ", error);
            toaster(
              false,
              "Error Occured",
              `An error occured while trying to update employee ${data.firstName} ${data.lastName}`,
            );
          });
      } else {
        createEmployee(data)
          .then(() => {
            onCloseModal();
            toaster(
              true,
              "Employee Created",
              `You have successfully created ${data.firstName} ${data.lastName} as an employee.`,
            );
            onSuccess();
          })
          .catch((error) => {
            console.log("CREATE EMPLOYEE ERROR:: ", error);
            toaster(
              false,
              "Error Occured",
              `An error occured while trying to create ${data.firstName} ${data.lastName} as an employee.`,
            );
          });
      }
    }
  }

  function validateForm() {
    let isFormValid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      isFormValid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      isFormValid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      isFormValid = false;
    }

    if (department.trim()) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Department is required";
      isFormValid = false;
    }

    setErrors(errorsCopy);
    return isFormValid;
  }

  function cancel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onCloseModal();
  }

  function handleManagerSearch(value: string) {
    setIsSearching(true);
    getEmployeesWithSpecification(0, 10, value)
      .then((response) => {
        console.log("SEARCH_EMPS:: ", response);
        setManagers(response.data.content);
        setIsSearching(false);
      })
      .catch((error) => {
        console.log("ERROR:: ", error);
        setIsSearching(false);
      });
  }

  function handleSelectManager(manager: Employee) {
    setManagerId(manager.id || "");
    setQuery(`${manager.firstName} ${manager.lastName}`);
    setOpenManagerSearch(false);
  }

  return (
    <form>
      <div className="grid grid-cols-2 gap-2 my-4">
        <Input
          type="text"
          name="firstName"
          labelName="First Name"
          value={firstName}
          state={errors.firstName ? "error" : "regular"}
          error={errors.firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <Input
          type="text"
          name="lastName"
          labelName="Last Name"
          value={lastName}
          state={errors.lastName ? "error" : "regular"}
          error={errors.lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <Input
          type="email"
          name="email"
          labelName="Email"
          value={email}
          state={errors.email ? "error" : "regular"}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <CustomSelect
          isDisable={false}
          label="Department"
          name="department"
          value={department}
          onChange={(value) => {
            setDepartment(value);
          }}
          options={DEPARTMENT_OPTIONS}
          errors={errors.department}
        />
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="manger">Manager</label>
          <input
            type="text"
            name="manger"
            className="bg-white border py-2 px-1.5 focus-within:outline focus-within:outline-primary text-xs rounded-md"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            autoComplete="off"
            placeholder="Type in employee"
            onFocus={() => setOpenManagerSearch(true)}
            onBlur={() => {
              setOpenManagerSearch(false);
              setManagers([]);
            }}
          />
          {openManagerSearch && (
            <div className="rounded-md shadow-md p-2 absolute mt-1 right-0 left-0 top-full bg-white">
              {isSearching ? (
                <div className="p-3 text-center">Searching...</div>
              ) : managers.length === 0 ? (
                <div className="p-3 text-center">No Employee found.</div>
              ) : (
                managers.map((emp) => (
                  <ul
                    key={emp.id}
                    className="p-2 hover:bg-purple-accent/10 hover:cursor-pointer mb-1 text-xs rounded-md"
                    onMouseDown={() => {
                      handleSelectManager(emp);
                    }}
                  >
                    <a>
                      {emp.firstName} {emp.lastName}
                    </a>
                  </ul>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse mt-6 border-t p-2">
        <div className="flex gap-2 mt-2">
          <Button type="secondary" text="Cancel" onClick={cancel} />
          <Button type="success" text="Submit" onClick={saveOrUpdateEmployee} />
        </div>
      </div>
    </form>
  );
}

export default EmployeeForm;
