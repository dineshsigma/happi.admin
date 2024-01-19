import { useSelector } from "react-redux";


const GPReports = () => {
    //   const OrgId = useSelector((state) => state.auth.org_id)
    // console.log(OrgId, 'org_id__________')

    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>GP Report</h4> */}
            <div className="iframe-div">
                <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=07e12dac-b6d4-4e5f-a734-a35b63c92b42&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>

    )
};

export default GPReports;