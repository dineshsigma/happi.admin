import { useSelector } from "react-redux";

const IngramOrdersHappi = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/3e5195a5-3314-4303-b693-42c2ee8a1b2d`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default IngramOrdersHappi;
  