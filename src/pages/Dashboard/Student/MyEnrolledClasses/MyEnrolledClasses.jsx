import SectionHeader from "../../../../components/common/SectionHeader";
import useEnrolled from "../../../../hooks/useEnrolled";
import EnrolledTable from "./EnrolledTable";

const MyEnrolledClasses = () => {
  const { busket, refetch } = useEnrolled();


  return (
    <div>
        <SectionHeader heading={"Enrolled Classes"} subHeading={"Stay turned to get notified about the course schedule"}/>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Courses</th>
              <th>Course Id code:</th>
              <th>Price:</th>
            </tr>
          </thead>
          <tbody>
            {busket.map(item=><EnrolledTable key={item._id} item={item}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrolledClasses;
