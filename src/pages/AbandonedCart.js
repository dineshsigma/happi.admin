import { useSelector } from "react-redux";

const AbandonedCart = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/676a07f7-0afd-4724-83dc-17cde22d9d45`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default AbandonedCart;
  