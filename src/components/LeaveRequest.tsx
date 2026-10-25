import { RequestIcon } from "@/utils/icons";
import Btn from "./Btn";
import PageHeader from "./PageHeader";
import SummaryCard from "./SummaryCard";
import { LEAVE_REQUEST_SUMMARY } from "@/utils/appdata";

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

      <div className="grid grid-cols-4 gap-4 ">
        {LEAVE_REQUEST_SUMMARY.map((l) => (
          <SummaryCard
          key={l.header}
            icon={l.icon}
            iconColour={l.iconColour}
            summary="0"
            header={l.header}
            subheader={l.subheader}
          />
        ))}
      </div>
    </>
  );
}
