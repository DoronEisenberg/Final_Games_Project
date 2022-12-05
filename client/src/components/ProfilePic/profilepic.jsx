export default function ProfilePic(props) {
    return (
        <div className="profile-img">
            <img src={props.imgUrl} onClick={() => toggleOpenUploader()} />
            {props.firstname} {props.lastname}
        </div>
    );
}
