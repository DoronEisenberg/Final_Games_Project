function ImageUploader(props) {
    function uploadImage() {
        //use FormData API to send file to the server
        const file = document.querySelector("input[type=file]").files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("file", file);

        fetch("/profilepic", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                console.log("/profile picture  results", result.image);
                if (result.success) {
                    props.handleSuccess(result.image);
                } else {
                    console.log("result: ", result);
                }
            });
    }
    return (
        <div className="modal">
            <div className="modalContainer">
                <h1>Upload your photo finally!!!</h1>
                <div>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        name="profilePic"
                        placeholder="choose image ..."
                    ></input>
                </div>
                <div>
                    <button onClick={uploadImage}>upload</button>
                    {
                        <button onClick={props.clickHandler}>
                            Back (From uploader
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
export default ImageUploader;
