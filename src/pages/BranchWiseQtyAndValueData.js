import { useSelector } from "react-redux";


const BranchWiseQtyAndValueData = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Branch wise Qty and Value Data</h4> */}
            <div className="iframe-div">
            <iframe title="Branch wise Qty and Value data" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=b5524c4d-fe4b-4252-bf06-d6753377aac0&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>

    )
};

export default BranchWiseQtyAndValueData;