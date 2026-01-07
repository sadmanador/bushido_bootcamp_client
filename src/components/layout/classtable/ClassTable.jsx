import axios from "axios";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useBusket from "../../../hooks/useBusket";

const ClassTable = ({ item }) => {
  const { price, name, image, _id } = item;
  const { refetch } = useBusket();

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://server-five-lemon.vercel.app/taken-courses/${id}`)
          .then((res) => {
            const data = res.data;
            if (data.deletedCount > 0) {
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
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>${price}</td>
      <th>
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-ghost btn-xs hover:bg-red-500 hover:text-white"
        >
          Delete
          <RiDeleteBack2Fill className="text-xl text-red-600 hover:text-black" />
        </button>
      </th>
      <th>
        <Link to={`payment/${_id}`} className="btn-custom">
          Pay
        </Link>
      </th>
    </tr>
  );
};

export default ClassTable;
