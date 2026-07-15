import Btn from "./Btn";

type StatusChangeConfirmationProps = {
  onCancel: () => void;
  onStatusChange: (id: string, subject: string) => void;
  subject: string;
  userId: string;
  status: boolean;
};

export default function StatusChangeConfirmation({
  onCancel,
  onStatusChange,
  subject,
  userId,
  status,
}: StatusChangeConfirmationProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="p-2">
          <p className="text-sm text-pretty">
            Are you sure you want to {status? "deactivate ": "activate "}
            <span className="font-semibold">{" "}{subject}</span>
          </p>
        </div>
        <div className="flex flex-row-reverse items-baseline mt-4">
          <div className="flex gap-2 mt-2">
            <Btn type="secondary" text="Cancel" onClick={onCancel} />
            <Btn
              type="success"
              text={status? "Deactivate": "Activate"}
              onClick={() => onStatusChange(userId, subject)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
