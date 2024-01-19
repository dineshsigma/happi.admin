import { useSelector } from "react-redux";


const InfluencerLeads = () => {
//   const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')
  
  return (
    <div className="iframe-div">
        <iframe src= {`https://iipl.retool.com/embedded/public/96732755-a49b-4e12-938d-6ffc4c5d677a`}
        className="iframe-style"></iframe>
    </div>
  )
};

export default InfluencerLeads;