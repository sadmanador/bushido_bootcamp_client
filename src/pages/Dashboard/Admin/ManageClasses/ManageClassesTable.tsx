import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";
import useClasses from "../../../../hooks/useClasses";
import { ClassItem } from "../../../../types";

interface ManageClassesTableProps {
  item: ClassItem;
}

const ManageClassesTable: React.FC<ManageClassesTableProps> = ({ item }) => {
  const { refetch } = useClasses();
  const { user } = useAuth();
  const [feedbackMessage, setFeedback] = useState<string | null>(null);
  const [axiosSecure] = useAxiosSecureToken();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    name,
    image,
    instructor,
    email,
    seats,
    price,
    status,
    _id,
  } = item;

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const changeStatus = (newStatus: string) => {
    if (feedbackMessage == null) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please add a feedback before changing the status!!!",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    const updatedData = {
      feedback: feedbackMessage,
      status: newStatus,
    };

    Swal.fire({
      title: "Are you sure?",
      text: `You want to set a ${newStatus} to ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(
            `/classes/manageClasses/${_id}?email=${user?.email}`,
            updatedData
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Class successfully Updated",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
      }
    });
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={image} alt="Class" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">Price: ${price}</div>
          </div>
        </div>
      </td>
      <td>
        {instructor}
        <br />
        <span className="badge badge-ghost badge-sm">Email: {email}</span>
      </td>
      <td>{seats} seats</td>
      {status === "approved" || status === "denied" ? (
        <td>
          <div>
            <Button className="btn btn-info btn-sm" disabled>
              Feedback
            </Button>
          </div>
        </td>
      ) : (
        <td>
          <div>
            <Button className="btn btn-info btn-sm" onClick={handleOpen}>
              Feedback
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Write your valued feedback here
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    <textarea
                      onBlur={(event => setFeedback(event.target.value))}
                      className="textarea textarea-bordered"
                      placeholder="feedback"
                    ></textarea>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </div>
        </td>
      )}
      <th>
        {status === "pending" ? (
          <select
            defaultValue={status}
            onChange={(event) => changeStatus(event.target.value)}
            className="select select-bordered "
          >
            <option disabled value="pending">{status}</option>
            <option value="approved">Approved</option>
            <option value="denied">Deny</option>
          </select>
        ) : (
          <select
            disabled
            defaultValue={status}
            className="select select-bordered "
          >
            <option>{status}</option>
            <option>Approved</option>
            <option>Deny</option>
          </select>
        )}
      </th>
    </tr>
  );
};

export default ManageClassesTable;
