import { useSelector } from "react-redux";


const TargetAssign = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/78b8e6f3-8fc6-41b2-819a-1a8848158605?org_id=${OrgId}`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default TargetAssign;
  