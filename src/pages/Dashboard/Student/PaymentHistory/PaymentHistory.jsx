import SectionHeader from "../../../../components/common/SectionHeader";
import usePaymentHistory from "../../../../hooks/usePaymentHistory";
import HistoryTable from "./HistoryTable";

const PaymentHistory = () => {
  const histories = usePaymentHistory();
  const history = histories.histories;
  console.log(history);

  return (
    <div>
        <SectionHeader heading="Payment history" subHeading="These are your payment history, newer one is on the top"/>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Transaction Id</th>
              <th>Course title</th>
              <th>Course Id code</th>
              <th>Your purchase email</th>
              <th>Price</th>
              <th>Purchase date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <HistoryTable key={item._id} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
