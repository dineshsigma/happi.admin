import { useSelector } from "react-redux";


const IngramOrders = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/8fbca444-2d85-4c22-bacb-d41f64558183`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default IngramOrders;
