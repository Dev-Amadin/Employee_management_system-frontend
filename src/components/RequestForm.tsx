import { useState } from "react";
import Btn from "./Btn";
import CustomSelect from "./CustomSelect";
import Input from "./Input";
import { LEAVE_TYPE_OPTIONS } from "@/utils/appdata";
import Textarea from "./Textarea";

type RequestFormProps = {
  onCloseModal: () => void;
  onSuccess: () => void;
};

export default function RequestForm({
  onCloseModal,
  onSuccess,
}: RequestFormProps) {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  function validateForm() {
    let isFormValid = true;

    const errorsCopy = { ...errors };

    if (type.trim()) {
      errorsCopy.type = "";
    } else {
      errorsCopy.type = "Leave type is required";
      isFormValid = false;
    }

    if (startDate.trim()) {
      errorsCopy.startDate = "";
    } else {
      errorsCopy.startDate = "Start Date is required";
      isFormValid = false;
    }

    if (endDate.trim()) {
      errorsCopy.endDate = "";
    } else {
      errorsCopy.endDate = "End Date is required";
      isFormValid = false;
    }

    const validStartDate = new Date(startDate);
    const validEndDate = new Date(endDate);

    if (validStartDate > validEndDate) {
      errorsCopy.endDate = "End Date can not be before Start Date";
      isFormValid = false;
    }

    setErrors(errorsCopy);
    return isFormValid;
  }

  function saveOrUpdate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (validateForm()) {
      onSuccess();
    }
  }

  function cancel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onCloseModal();
  }

  return (
    <form>
      <CustomSelect
        label="Type"
        name="type"
        value={type}
        onChange={(value) => {
          setType(value);
        }}
        options={LEAVE_TYPE_OPTIONS}
        errors={errors.type}
      />
      <div className="grid grid-cols-2 gap-2 my-4 ">
        <Input
          type="Date"
          name="startDate"
          labelName="Start Date"
          value={startDate}
          state={errors.startDate ? "error" : "regular"}
          error={errors.startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <Input
          type="Date"
          name="endDate"
          labelName="End Date"
          value={endDate}
          state={errors.endDate ? "error" : "regular"}
          error={errors.endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div>
      <Textarea
        name="reason"
        label="Reason"
        value={reason}
        rows={5}
        state={errors.reason ? "error" : "regular"}
        error={errors.reason}
        onChange={(event) => setReason(event.target.value)}
      />
      <div className="flex flex-row-reverse mt-6 border-t p-2">
        <div className="flex gap-2 mt-2">
          <Btn type="secondary" text="Cancel" onClick={cancel} />
          <Btn
            type="success"
            text="Submit"
            onClick={saveOrUpdate}
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </div>
    </form>
  );
}
