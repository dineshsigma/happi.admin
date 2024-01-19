import { useSelector } from "react-redux";

const HappiPremierLeague = () => {
  return (
    <>
      <div className="iframe-div">
        <iframe
          title="Report Section"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/reportEmbed?reportId=c4912ee9-3b13-4e92-8434-43d861d7f4c7&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </>
  );
};
export default HappiPremierLeague;
