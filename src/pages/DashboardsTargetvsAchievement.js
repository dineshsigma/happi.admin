import { useSelector } from "react-redux";

const DashboardsTargetvsAchievement = () => {
  //   const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')

  return (
    <>
      {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>
      Branchwise Accessories
      </h4> */}
      <div className="iframe-div">
        <iframe
          title="Report Section"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/reportEmbed?reportId=92e76ffe-19c7-49e7-bac8-2de2757aa788&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </>
  );
};

export default DashboardsTargetvsAchievement;
