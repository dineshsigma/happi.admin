import { useSelector } from "react-redux";

const Orders = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/b98efbcc-0003-4a92-9247-15c2a03b357c`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default Orders;
  