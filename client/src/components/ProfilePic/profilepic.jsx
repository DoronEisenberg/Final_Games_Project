export default function ProfilePic(props) {
    return (
        <div>
            <img
                className="profile-img"
                src={"./ProfilePhotos/cats.JPG"}
                onClick={() => uploaderOpen()}
            />
            <br></br>
            {props.user?.firstname} {props.user?.lastname}
        </div>
    );
}
