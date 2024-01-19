import { useSelector } from "react-redux";

const StockPriceUpdate = () => {
  const OrgId = useSelector((state) => state.auth.org_id);
    return (
      <div className="">
          <iframe src={`https://iipl.retool.com/embedded/public/86067111-3c0f-4d8f-adc6-b0f5d7bbf31f`}
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default StockPriceUpdate;
  