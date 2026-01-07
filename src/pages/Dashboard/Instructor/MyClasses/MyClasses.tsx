import React from "react";
import SectionHeader from "../../../../components/common/SectionHeader";
import useInstructorClass from "../../../../hooks/useInstructorClass";
import MyClassTable from "./MyClassTable";

const MyClasses: React.FC = () => {
  const { classes } = useInstructorClass();
  return (
    <div>
      <SectionHeader
        heading={"My all classes"}
        subHeading={`You currently have ${classes.length} classes`}
      ></SectionHeader>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Class and Thumbnail</th>
              <th>Enrolled students</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item) => (
              <MyClassTable key={item._id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
