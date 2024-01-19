import { useSelector } from "react-redux";


const HappiPages = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/c56ab9d5-f1f1-446b-b258-5491d573db8f`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default HappiPages;
