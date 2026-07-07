import type { Employee } from "@/services/EmployeeService";
import Btn from "./Btn";

type DeleteConfirmationProps = {
  onCancel: () => void;
  onDelete: (employee?: Employee) => void;
  employee?: Employee;
};

export default function DeleteConfirmation({
  onCancel,
  onDelete,
  employee,
}: DeleteConfirmationProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="p-2">
          <p className="text-sm text-pretty">
            Are you sure you want to delete{" "}
            {employee && (
              <span className="font-semibold">
                {employee.firstName} {employee.lastName}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-row-reverse items-baseline mt-4">
          <div className="flex gap-2 mt-2">
            <Btn type="secondary" text="Cancel" onClick={onCancel} />
            <Btn
              type="danger"
              text="Delete"
              onClick={() => onDelete(employee)}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
