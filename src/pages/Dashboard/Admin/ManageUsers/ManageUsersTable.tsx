import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";
import { User } from "../../../../types";

interface ManageUsersTableProps {
  item: User;
  refetch: () => void;
}

const ManageUsersTable: React.FC<ManageUsersTableProps> = ({ item, refetch }) => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();
  const { _id, displayName, email, photoURL, role } = item;

  const handlePromote = (promotion: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure, you want to promote "${displayName}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Promote to ${promotion}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/students/${_id}?email=${user?.email}`, { role: promotion })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${displayName} has been promoted to ${promotion}`,
                showConfirmButton: false,
                timer: 2000,
              });
              refetch();
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
              <img src={photoURL || ""} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{displayName}</div>
            <div className="text-sm opacity-50">Email: {email}</div>
          </div>
        </div>
      </td>
      <td>{!role ? "student" : role}</td>
      <th>
        {role === "student" || !role ? (
          <button disabled className="btn btn-error btn-xs">
            Demote
          </button>
        ) : (
          <button
            onClick={() => handlePromote("student")}
            className="btn btn-error btn-xs"
          >
            Demote
          </button>
        )}
      </th>
      <th>
        {role === "instructor" ? (
          <button className="btn btn-info btn-xs" disabled>
            Instructor
          </button>
        ) : (
          <button
            onClick={() => handlePromote("instructor")}
            className="btn btn-info btn-xs"
          >
            Instructor
          </button>
        )}
      </th>
      <th>
        {role === "admin" ? (
          <button className="btn btn-accent btn-xs" disabled>
            Admin
          </button>
        ) : (
          <button
            onClick={() => handlePromote("admin")}
            className="btn btn-accent btn-xs"
          >
            Admin
          </button>
        )}
      </th>
    </tr>
  );
};

export default ManageUsersTable;
