import { useSelector } from "react-redux";

const CartUserDetails = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/a29ead64-c620-456b-93e5-84c655496129`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default CartUserDetails;
  