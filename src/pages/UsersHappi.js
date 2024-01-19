import { useSelector } from "react-redux";

const UsersHappi = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/cec17873-c7c2-4f60-a359-a0f5a51c769d`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default UsersHappi;
  