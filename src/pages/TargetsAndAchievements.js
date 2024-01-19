import { useSelector } from "react-redux";


const TargetsAndAchievements = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
        {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Target And Achievements</h4> */}
        <div className="iframe-div">
        <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=7c8956cd-cfa5-4a2d-9d33-9777c6a7d999&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
        </div>
        </>
        
    )
};

export default TargetsAndAchievements;