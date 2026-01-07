import React from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axiosPublic from "../../../api/axiosPublic";
import useBusket from "../../../hooks/useBusket";
import { Booking } from "../../../types";

interface ClassTableProps {
  item: Booking;
}

const ClassTable: React.FC<ClassTableProps> = ({ item }) => {
  const { price, name, image, _id } = item;
  const { refetch } = useBusket();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c33827",
      cancelButtonColor: "#1e293b",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/taken-courses/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The class has been removed from your list.',
                background: '#1e293b',
                color: '#fff',
                confirmButtonColor: '#c33827'
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
            <div className="mask mask-squircle w-12 h-12 border border-white/10">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-bold text-white">{name}</div>
          </div>
        </div>
      </td>
      <td className="text-slate-300 font-medium">${price}</td>
      <th>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/10 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <RiDeleteBack2Fill className="text-lg" />
          Delete
        </button>
      </th>
      <th>
        <Link to={`payment/${_id}`} className="btn-custom py-2 px-6 rounded-full text-xs uppercase tracking-widest font-bold">
          Pay Now
        </Link>
      </th>
    </tr>
  );
};

export default ClassTable;
