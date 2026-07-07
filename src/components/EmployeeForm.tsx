import Button from "./Btn";
import React, { useEffect, useState } from "react";
import {
  createEmployee,
  updateEmployee,
  type Employee,
} from "../services/EmployeeService";
import Input from "./Input";
import { toast } from "sonner";

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
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (isEdit && employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setId(employee.id ? employee.id : "");
    }
  }, [isEdit]);

  function saveOrUpdateEmployee(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (validateForm()) {
      const data = { firstName, lastName, email };
      console.log("data::: ", employee);

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

    setErrors(errorsCopy);
    return isFormValid;
  }

  function cancel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onCloseModal();
  }

  function toaster(isSuccess: boolean, title: string, description: string) {
    if (isSuccess) {
      return toast.success(title, {
        description: description,
        position: "top-right",
        classNames: {
          success: "!bg-green-300",
        },
      });
    } else {
      return toast.error(title, {
        description: description,
        position: "top-right",
        classNames: {
          error: "!bg-rose-400",
        },
      });
    }
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
