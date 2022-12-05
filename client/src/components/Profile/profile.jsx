//import { Component } from "react";
//import uploader from "./uploader";

export default function Profile(props) {
    const { uploaderOpen } = props;
    return (
        <div className="profile">
            {uploaderOpen && <uploader tools={props.tools} />}
        </div>
    );
}
