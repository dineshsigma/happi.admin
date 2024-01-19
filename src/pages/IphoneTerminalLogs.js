import { useSelector } from "react-redux";


const IphoneTerminalLogs = () => {
    return (
        <>
            {/* <h4 style={{ "text-align": "center", "padding-bottom": "20px" }}>I phone Terminal Logs</h4> */}
            <div className="iframe-div">
                <iframe title="Report Section" width="600" height="373.5" src="https://iipl.retool.com/embedded/public/e4bffa36-898a-430a-924c-6a903c7d3a29" frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </>
    )
};

export default IphoneTerminalLogs;