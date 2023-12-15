import Breadcrumb from "../../components/Breadcrumb";
import TableThree from "../../components/TableThree";


const CustomerRegister = () => {
  return (
    <>
      <Breadcrumb pageName="Customer Register" />

      <div className="flex flex-col gap-10">
        <TableThree />

      </div>
    </>
  );
};

export default CustomerRegister;
