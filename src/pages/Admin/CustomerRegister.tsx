import Breadcrumb from "../../components/Breadcrumb";
import TableThree from "../../components/TableThree";
import TableTwo from "../../components/TableTwo";


const CustomerRegister = () => {
  return (
    <>
      <Breadcrumb pageName="Customer Register" />

      <div className="flex flex-col gap-10">
        <TableThree />
        {/* <TableThree /> */}
        <TableTwo />
      </div>
    </>
  );
};

export default CustomerRegister;
