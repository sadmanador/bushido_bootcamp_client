import SectionHeader from "../../../../components/common/SectionHeader";
import useClasses from "../../../../hooks/useClasses";
import ManageClassesTable from "./ManageClassesTable";

const MangeClasses = () => {
    const {classes} = useClasses();



  return (
    <div>
      <SectionHeader
        heading={"Manage Classes"}
        subHeading={"Add a feedback message before changing the status"}
      ></SectionHeader>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name & details</th>
              <th>Instructor&apos;s info</th>
              <th>Seats</th>
              <th>Feedback</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(item=><ManageClassesTable key={item._id} item={item}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeClasses;
