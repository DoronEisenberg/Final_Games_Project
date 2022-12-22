import ProfilePic from "../ProfilePic/profilepic";
// import Game from "./components/Game";
// import ScoreEditor from "../ScoreEditor/ScoreEditor";
export default function Profile(props) {
    const { uploaderOpen } = props;
    return (
        <section>
            <div className="profile">
                <p>Here is the profile component</p>
                {uploaderOpen && <uploader tools={props.tools} />}
                <ProfilePic openSesmee={props.openSesmee} user={props.user} />
                {/* <ScoreEditor user={props.user} scoreUpdate={props.scoreUpdate} /> */}
                {/* <PersonalPeople user={props.user} scoreUpdate={props.scoreUpdate} /> */}
                {/* //////// //////// Score of {userData.firstname}{" "}
                {userData.lastname}:<p>{userData.scoretext}</p>
                <Game id={id} />
                <button onClick={goHome}>GO BACK HOME</button> */}
            </div>
        </section>
    );
}
