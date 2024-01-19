import { useSelector } from "react-redux";

const HappiCare = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/f2b2445b-f86a-4264-ad39-f50a72222036?org_id=${OrgId}`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default HappiCare;
  