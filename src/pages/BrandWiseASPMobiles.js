import { useSelector } from "react-redux";


const BranchWiseASPMobiles = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
        {/* <h4 style={{"text-align": "center","padding-bottom": "20px"}}>Brand Wise ASP-Mobiles</h4> */}
        <div className="iframe-div">
        <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=6cee9c31-940b-489a-937a-5f8cb6c42d64&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
        </div>
        </>
        
    )
};

export default BranchWiseASPMobiles;