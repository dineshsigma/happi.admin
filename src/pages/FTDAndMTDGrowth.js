import { useSelector } from "react-redux";


const FTDAndMTDGrowth = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
        {/* <h4 style={{"text-align": "center","padding-bottom": "20px"}}>4 Pillars</h4> */}
        <div className="iframe-div">
        <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=036fb9b4-263f-4966-8b95-076cd5b31c71&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
        </div>
        </>
        
    )
};

export default FTDAndMTDGrowth;