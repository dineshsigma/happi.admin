import { useSelector } from "react-redux";

const Influencer = () => {
  const OrgId = useSelector((state) => state.auth.org_id)

    return (
      <div className="">
          <iframe src="https://iipl.retool.com/embedded/public/9af899f0-3330-4a81-bb90-c0ed8e7ed169"
          className="iframe-style"></iframe>
      </div>
  
    )
  };
  
  export default Influencer;
  