import { RequestIcon } from "@/utils/icons";
import Btn from "./Btn";
import PageHeader from "./PageHeader";
import SummaryCard from "./SummaryCard";

export default function LeaveRequest() {
  return (
    <>
      <PageHeader
        title="Leave Request"
        subheading="Details of Employee leave"
        className="mb-6"
        button={<Btn text="New Request" type="primary" onClick={() => {}} />}
        icon={<RequestIcon size="size-6" />}
      />

      <SummaryCard
        icon={<RequestIcon />}
        iconColour="text-primary bg-primary/20"
        summary="0"
        header="Pending Request"
        subheader="awaiting approval"
      />
      
    </>
  );
}
