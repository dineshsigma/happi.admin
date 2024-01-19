import { useSelector } from "react-redux";


const ItemModelWiseMTDVSLMTDQTY = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Item Model Wise MTD VS LMTD Qty</h4> */}
            <div className="iframe-div">

                <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=a72b359a-f8bf-4c19-b4c1-416b41dd27c7&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>

    )
};

export default ItemModelWiseMTDVSLMTDQTY;