import { useSelector } from "react-redux";

const Health = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/e6df18f3-6439-423f-a96d-376c27907de1?org_id=${OrgId}`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default Health;
  