import React from "react";
import { Booking } from "../../../../types";

interface EnrolledTableProps {
  item: Booking;
}

const EnrolledTable: React.FC<EnrolledTableProps> = ({ item }) => {
    const { name, image, _id, price } = item;

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={image}
                  alt="Course"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
            </div>
          </div>
        </td>
        <td>
          {_id}
        </td>
        <td>
            ${price}
        </td>
      </tr>
    </>
  );
};

export default EnrolledTable;
