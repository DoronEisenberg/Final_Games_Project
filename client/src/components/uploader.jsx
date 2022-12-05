import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: false,
            src: false,
        };
        fetch("/profilepic", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((image) => {
                //console.log("image", image);
                this.images.push(image);
            });
    }

    render() {
        return (
            <div>
                <h5>Picture Uploader</h5>

                <input type="file" />
                <br />
                <div>
                    <p>No Preview</p>
                </div>
                <hr />
                <button>Upload</button>
            </div>
        );
    }
}
