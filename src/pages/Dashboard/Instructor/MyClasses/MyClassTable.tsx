import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ClassItem } from "../../../../types";

interface MyClassTableProps {
  item: ClassItem;
}

const MyClassTable: React.FC<MyClassTableProps> = ({ item }) => {
  const { name, image, enrolled, status, feedback, price, _id, seats } = item;
  
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
            <div className="text-sm opacity-50">Seats available: {seats}</div>
          </div>
        </div>
      </td>
      <td>{enrolled}</td>
      <td>
        {status === 'denied' ? (
          <span className="text-red-600 font-medium capitalize">{status}</span>
        ) : (
          <span className="text-green-500 font-medium capitalize">{status}</span>
        )}
      </td>
      <td className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {feedback ? feedback : "No feedback"}
      </td>
      <th>
        <Link to={`${_id}`} className="btn btn-ghost btn-xs text-bushido-red hover:bg-bushido-red/10 transition-colors flex items-center gap-1">
          <AiFillEdit className="text-lg" /> Edit
        </Link>
      </th>
    </tr>
  );
};

export default MyClassTable;
