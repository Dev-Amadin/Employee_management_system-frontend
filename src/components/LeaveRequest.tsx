import { RequestIcon } from "@/utils/icons";
import Btn from "./Btn";
import PageHeader from "./PageHeader";
import SummaryCard from "./SummaryCard";
import { LEAVE_REQUEST_SUMMARY, PAGEABLE } from "@/utils/appdata";
import { useState } from "react";
import Subnav from "./Subnav";
import { DataTable } from "./DataTable";
import type { PaginationState } from "@tanstack/react-table";
import { getLeaveRequestCols } from "@/services/RequestService";
import Modal from "./Modal";
import RequestForm from "./RequestForm";

export default function LeaveRequest() {
  const STATUS_DATA = ["All", "Pending", "Approved", "Rejected"];
  const [sublink, setSublink] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGEABLE.page,
    pageSize: PAGEABLE.size,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const columns = getLeaveRequestCols();

  function handleAdd() {
    setIsEdit(false);
    setOpenAddModal(true);
  }

  return (
    <>
      <PageHeader
        title="Leave Request"
        subheading="Details of Employee leave"
        className="mb-6"
        button={
          <Btn
            text="New Request"
            type="primary"
            onClick={() => {
              handleAdd();
            }}
          />
        }
        icon={<RequestIcon size="size-6" />}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
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

      <Subnav
        currentLink={sublink}
        data={STATUS_DATA}
        onClick={(link) => setSublink(link)}
      />

      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={leaveRequests}
        pagination={pagination}
        totalElements={totalElements}
        onPaginationChange={setPagination}
      />

      <Modal
        size="sm:max-w-2xl"
        title={isEdit ? "Update Leave Request" : "New Leave Request"}
        subtitle={`Fill all the necessary fields for request ${isEdit ? "update." : "creation."}`}
        open={openAddModal}
        setOpen={setOpenAddModal}
        children={
          <RequestForm
            onCloseModal={() => {
              setOpenAddModal(false);
            }}
            onSuccess={() => {}}
          />
        }
        footer={false}
      />
    </>
  );
}
