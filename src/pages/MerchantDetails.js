import { useSelector } from "react-redux";

const MerchantDetails = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default MerchantDetails;
  