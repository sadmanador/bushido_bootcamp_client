import React from "react";
import SectionHeader from "../../../../components/common/SectionHeader";
import useStudents from "../../../../hooks/useStudents";
import ManageUsersTable from "./ManageUsersTable";

const ManageUsers: React.FC = () => {
  const { students, refetch } = useStudents();

  return (
    <div>
      <SectionHeader
        heading={"Manage students"}
        subHeading={"Observe and Promote anyone when necessary"}
      />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Details</th>
              <th>Position</th>
              <th>Demission</th>
              <th>Promote to Instructor</th>
              <th>Promote to Admin</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item) => (
              <ManageUsersTable key={item._id} item={item} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
