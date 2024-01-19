import { useSelector } from "react-redux";

const PurchaseReports = () => {
  return (
    <>
      {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>Purchase Reports</h4> */}
      <div className="iframe-div">
        <iframe
          title="Report Section"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/reportEmbed?reportId=182745a1-a869-4ad2-9c65-fbc65f479d87&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </>
  );
};

export default PurchaseReports;
