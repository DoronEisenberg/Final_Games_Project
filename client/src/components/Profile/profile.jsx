import ProfilePic from "../ProfilePic/profilepic";
import BioEditor from "../BioEditor/BioEditor";
export default function Profile(props) {
    const { uploaderOpen } = props;
    return (
        <div className="profile">
            <p>Here is the profile component</p>
            {uploaderOpen && <uploader tools={props.tools} />}
            <ProfilePic openSesmee={props.openSesmee} user={props.user} />
            <BioEditor user={props.user} bioUpdate={props.bioUpdate} />
        </div>
    );
}
