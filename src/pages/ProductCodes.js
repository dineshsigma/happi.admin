import { useSelector } from "react-redux";

const ProductCodes = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/fb59b512-bb42-4f39-80f1-b5cc664b440c`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default ProductCodes;
  