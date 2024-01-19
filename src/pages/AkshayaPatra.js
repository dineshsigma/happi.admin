import { useSelector } from "react-redux";


const AkshayaPatra = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/efc23a6f-8e6c-4546-b355-0ed712ebe547`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default AkshayaPatra;
