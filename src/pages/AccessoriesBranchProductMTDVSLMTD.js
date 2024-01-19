import { useSelector } from "react-redux";


const AccessoriesBranchProductMTDVSLMTD = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Accessories Branch,Product MTD VS LMTD</h4> */}
            <div className="iframe-div">
                <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=0d25e86e-5fe7-4903-9de7-4ff5e9a8bd42&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>

    )
};

export default AccessoriesBranchProductMTDVSLMTD;