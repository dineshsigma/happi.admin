import { useSelector } from "react-redux";


const EmployeeLeads = () => {
  const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        {/* <iframe title="htFrame" src= {`https://iipl.retool.com/embedded/public/a75b2213-6ee5-405e-82c6-faff9ab1c4a0`}
        className="iframe-style"></iframe> */}
        <iframe src= {`https://iipl.retool.com/embedded/public/92e2f6ee-65ca-40bd-a962-5f38f488b005`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default EmployeeLeads;
