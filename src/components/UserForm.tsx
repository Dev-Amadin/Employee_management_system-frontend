import { useEffect, useState } from "react";
import Input from "./Input";
import CustomSelect from "./CustomSelect";
import Btn from "./Btn";
import { DEPARTMENT_OPTIONS, ROLES_OPTIONS } from "@/utils/appdata";
import { createUser, updateUser, type User } from "@/services/UserService";
import { toaster } from "@/utils/commons";
import { searchEmployees, type Employee } from "@/services/EmployeeService";

type UserFormProps = {
  onCloseModal: () => void;
  onSuccess: () => void;
  isEdit: boolean;
  user?: User;
};

export default function UserForm({
  onCloseModal,
  onSuccess,
  isEdit,
  user,
}: UserFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [openEmpSearch, setOpenEmpSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    employeeId: "",
    role: "",
  });

  useEffect(() => {
    if (isEdit && user) {
      setUsername(user.username);
      setPassword(user.password);
      setEmployeeId(user.employeeId);
      setRole(user.role);
      setId(user.id ? user.id : "");
    }
  }, [isEdit]);

  function saveOrUpdateUser(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (validateForm()) {
      const data = { username, password, employeeId, role };
      console.log("data::: ", data);

      if (isEdit) {
        updateUser(id, data)
          .then(() => {
            onCloseModal();
            toaster(
              true,
              "User Updated",
              `You have successfully updated User ${data.username}.`,
            );

            onSuccess();
          })
          .catch((error) => {
            console.log("UPDATE EMPLOYEE ERROR:: ", error);
            toaster(
              false,
              "Error Occured",
              `An error occured while trying to update user ${data.username}`,
            );
          });
      } else {
        createUser(data)
          .then(() => {
            onCloseModal();
            toaster(
              true,
              "User Created",
              `You have successfully created ${data.username} as a user.`,
            );
            onSuccess();
          })
          .catch((error) => {
            console.log("CREATE EMPLOYEE ERROR:: ", error.message);
            toaster(
              false,
              "Error Occured",
              `An error occured while trying to create ${data.username} as a user. ${error.message}`,
            );
          });
      }
    }
  }

  function validateForm() {
    let isFormValid = true;

    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "Username is required";
      isFormValid = false;
    }

    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required";
      isFormValid = false;
    }

    //   if (employeeId.trim()) {
    //     errorsCopy.employeeId = "";
    //   } else {
    //     errorsCopy.employeeId = "Employee is required";
    //     isFormValid = false;
    //   }

    if (role && role.trim()) {
      errorsCopy.role = "";
    } else {
      errorsCopy.role = "Role is required";
      isFormValid = false;
    }

    setErrors(errorsCopy);
    return isFormValid;
  }

  function cancel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onCloseModal();
  }

  function handleEmployeesSearch(value: string) {
    if (!value || value.trim().length <= 2) return;

    setOpenEmpSearch(true);
    setIsSearching(true);
    searchEmployees(0, 10, value)
      .then((response) => {
        console.log("SEARCH_EMPS:: ", response);
        setEmployees(response.data.content);
        // setTotalElements(response.data.page.totalElements);
        setIsSearching(false);
      })
      .catch((error) => {
        console.log("ERROR:: ", error);
        setIsSearching(false);
      });
  }

  function handleSelectEmployee(emp: Employee) {
    setEmployeeId(emp.id || "");
    setEmployeeName(`${emp.firstName} ${emp.lastName}`);
    setOpenEmpSearch(false);
  }

  return (
    <form>
      <div className="grid grid-cols-2 gap-2 my-4">
        <Input
          type="text"
          name="username"
          labelName="Username"
          value={username}
          state={errors.username ? "error" : "regular"}
          error={errors.username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          type="password"
          name="password"
          labelName="Password"
          value={password}
          state={errors.password ? "error" : "regular"}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="employee">
            Employee
            {employeeName && <span className="font-semibold text-primary">: {employeeName}</span>}
          </label>
          <input
            type="text"
            name="employee"
            className="bg-white border py-2 px-1.5 focus-within:outline focus-within:outline-primary text-xs rounded-md"
            onChange={(e) => {
              handleEmployeesSearch(e.target.value);
            }}
            autoComplete="off"
            placeholder="Type in employee"
          />
          {openEmpSearch &&
            (employees.length ? (
              <div className="rounded-md shadow-md p-2 z-50">
                {employees.map((emp) => (
                  <ul className="p-2 hover:bg-purple-accent/10 hover:cursor-pointer mb-1 text-xs rounded-md">
                    <a
                      onClick={() => {
                        handleSelectEmployee(emp);
                      }}
                    >
                      {emp.firstName} {emp.lastName}
                    </a>
                  </ul>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center p-2">
                  <p>No employees match found</p>
                </div>
              </>
            ))}
        </div>

        <CustomSelect
          label="Role"
          name="role"
          value={role}
          onChange={(value) => {
            setRole(value);
          }}
          options={ROLES_OPTIONS}
          errors={errors.role}
        />
      </div>
      <div className="flex flex-row-reverse mt-6 border-t p-2">
        <div className="flex gap-2 mt-2">
          <Btn type="secondary" text="Cancel" onClick={cancel} />
          <Btn type="success" text="Submit" onClick={saveOrUpdateUser} />
        </div>
      </div>
    </form>
  );
}
