import { useSelector } from "react-redux";


const BranchAndBrandWiseQty = () => {
  //   const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')

  return (
    <>
    {/* <h4 style={{"text-align": "center","padding-bottom": "20px"}}>Branch And Brand Wise Qty</h4> */}
    <div className="iframe-div">
    <iframe title="Report Section" width="600" height="373.5" src="https://app.powerbi.com/reportEmbed?reportId=ce4aefb4-f7d7-440f-9264-65f8865c2106&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d" frameborder="0" allowFullScreen="true"></iframe>
    </div>
    </>
    
  )
};

export default BranchAndBrandWiseQty;