import axios from "axios";

const EMPLOYEE_BASE_URL = "http://localhost:8080/api/dev/ems/employee";

export function getAllEmployees(page:number, size:number) {
  return axios.get(EMPLOYEE_BASE_URL, {params:{
    page: page,
    size: size
  }});
}

export function createEmployee(employee: Employee) {
  return axios.post(EMPLOYEE_BASE_URL, employee);
}

export function getEmployeeById(id: string) {
  return axios.get<Employee>(`${EMPLOYEE_BASE_URL}/${id}`);
}

export function updateEmployee(employeeId: string, employee: Employee) {
  return axios.put<Employee>(`${EMPLOYEE_BASE_URL}/${employeeId}`, employee);
}

export function deleteEmployeeById(id: string) {
  return axios.delete(`${EMPLOYEE_BASE_URL}/${id}`);
}

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type Page = {
    size: number;
    number: number;
    totalElements?: number;
    totalPages?: number;
};
