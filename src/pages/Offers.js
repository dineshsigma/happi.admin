import { useSelector } from "react-redux";


const Offers = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/20d12cc2-0be6-435c-ab65-b182b376d01c`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default Offers;
