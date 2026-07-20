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
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");
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
      setQuery(user.employeeName || "");
      setEmployeeId(user.employeeId);
      setRole(user.role);
      setId(user.id || "");
    }
  }, [isEdit]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setEmployees([]);
    //   setUsername("");
      return;
    }
    const timer = setTimeout(() => {
      handleEmployeesSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

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

    if (employeeId.trim()) {
      errorsCopy.employeeId = "";
    } else {
      errorsCopy.employeeId = "Employee is required";
      isFormValid = false;
    }

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
    setQuery(`${emp.firstName} ${emp.lastName}`);
    setUsername(`${emp.firstName}.${emp.lastName}`)
    setOpenEmpSearch(false);
  }

  return (
    <form>
      <div className="grid grid-cols-2 gap-2 my-4">
         <div className="flex flex-col gap-1">
          <label htmlFor="employee">Employee</label>
          <input
            type="text"
            name="employee"
            className="bg-white border py-2 px-1.5 focus-within:outline focus-within:outline-primary text-xs rounded-md"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            autoComplete="off"
            placeholder="Type in employee"
            onFocus={() => setOpenEmpSearch(true)}
            onBlur={() => {
              setOpenEmpSearch(false);
              setEmployees([]);
            }}
          />
          {errors.employeeId && <p className="text-danger text-xs">{errors.employeeId}</p>}
          {openEmpSearch && (
            <div className="rounded-md shadow-md p-2">
              {isSearching ? (
                <div className="p-3">Searching...</div>
              ) : employees.length === 0 ? (
                <div className="p-3">No Employee found.</div>
              ) : (
                employees.map((emp) => (
                  <ul
                    key={emp.id}
                    className="p-2 hover:bg-purple-accent/10 hover:cursor-pointer mb-1 text-xs rounded-md"
                    onMouseDown={() => {
                      handleSelectEmployee(emp);
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
