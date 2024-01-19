import { useSelector } from "react-redux";


const VivoAndOppo = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Vivo and Oppo</h4> */}
            <div className="iframe-div">
                <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=d8029602-6796-4e97-9b9b-1e7914468c47&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>

    )
};

export default VivoAndOppo;