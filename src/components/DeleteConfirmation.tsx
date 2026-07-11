
import Btn from "./Btn";

type DeleteConfirmationProps = {
  onCancel: () => void;
  onDelete: (id: string, subject:string) => void;
  subject: string;
  deleteId: string;
};

export default function DeleteConfirmation({
  onCancel,
  onDelete,
  subject,
  deleteId
}: DeleteConfirmationProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="p-2">
          <p className="text-sm text-pretty">
            Are you sure you want to delete{" "}
              <span className="font-semibold">
                {subject}
              </span>
          </p>
        </div>
        <div className="flex flex-row-reverse items-baseline mt-4">
          <div className="flex gap-2 mt-2">
            <Btn type="secondary" text="Cancel" onClick={onCancel} />
            <Btn
              type="danger"
              text="Delete"
              onClick={() => onDelete(deleteId, subject)}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
