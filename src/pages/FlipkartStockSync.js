import { useSelector } from "react-redux";


const FlipkartStockSync = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/67599e80-d8c4-455b-81b0-464f9b656b7e`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default FlipkartStockSync;
