import { useSelector } from "react-redux";


const DashboardReports = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://my-deployment-031377.kb.ap-south-1.aws.elastic-cloud.com:9243/app/r/s/embarrassed-raspy-butcher`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default DashboardReports;
