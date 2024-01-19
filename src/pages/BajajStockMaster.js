import { useSelector } from "react-redux";


const BajajStockMaster = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/4966610a-777c-44b7-b2bc-6d1227e0c757`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default BajajStockMaster;
