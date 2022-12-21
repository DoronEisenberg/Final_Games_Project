import ProfilePic from "../ProfilePic/profilepic";
// import ScoreEditor from "../ScoreEditor/ScoreEditor";
export default function Profile(props) {
    const { uploaderOpen } = props;
    return (
        <div className="profile">
            <p>Here is the profile component</p>
            {uploaderOpen && <uploader tools={props.tools} />}
            <ProfilePic openSesmee={props.openSesmee} user={props.user} />
            {/* <ScoreEditor user={props.user} scoreUpdate={props.scoreUpdate} /> */}
            {/* <PersonalPeople user={props.user} scoreUpdate={props.scoreUpdate} /> */}
        </div>
    );
}
