import { useSelector } from "react-redux";

const ItemModelWiseAccessories = () => {
  //   const OrgId = useSelector((state) => state.auth.org_id)
  // console.log(OrgId, 'org_id__________')

  return (
    <>
      {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>
      Item Modelwise Accessories
      </h4> */}
      <div className="iframe-div">
        <iframe
          title="Report Section"
          width="600"
          height="373.5"
          src="https://app.powerbi.com/reportEmbed?reportId=22892a01-de8c-45a7-b81b-df27b569728a&autoAuth=true&ctid=ba784b85-00b3-4cc1-963f-f0e2efaad20d"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
      </div>
    </>
  );
};

export default ItemModelWiseAccessories;
