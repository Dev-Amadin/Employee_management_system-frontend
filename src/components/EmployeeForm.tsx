import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService";
import Input from "./Input";

function EmployeeForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          console.log("RESPONSE:: ", response);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log("ERROR:: ", error);
        });
    }
  }, []);

  function saveOrUpdateEmployee(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log("data::: ", employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log("RESPONSE:: ", response.data);
            navigate("/employees");
          })
          .catch((error) => console.log("UPDATE EMPLOYEE ERROR:: ", error));
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log("RESPONSE:: ", response.data);
            navigate("/employees");
          })
          .catch((error) => console.log("CREATE EMPLOYEE ERROR:: ", error));
      }
    }
  }

  function cancel() {
    navigate("/employees");
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

  function pageTitle() {
    if (id) {
      return <h1 className="font-bold text-2xl">Edit Employee</h1>;
    } else {
      return <h1 className="font-bold text-2xl">Add Employee</h1>;
    }
  }

  return (
    <div className="m-10 text-cen w-xl">
      <div className="rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between  border-b border-slate-200 pb-4">
          {pageTitle()}
        </div>
          <form >
              <div className="flex flex-col gap-2 my-4">
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
              <div className="flex gap-4 justify-end">
                <Button type="secondary" text="Cancel" onClick={cancel} />
                <Button
                  type="success"
                  text="Submit"
                  onClick={saveOrUpdateEmployee}
                />
              </div>
        
          </form>
   
      </div>
    </div>
  );
}

export default EmployeeForm;
