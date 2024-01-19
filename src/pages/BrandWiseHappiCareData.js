import { useSelector } from "react-redux";


const BrandWiseHappiCareData = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Brand Wise Happi Care Data</h4> */}
            <div className="iframe-div">
                <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=0c863697-821f-47f2-a66e-231f89cd362f&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>

    )
};

export default BrandWiseHappiCareData;