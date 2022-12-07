// export default function ProfilePic(props) {
//     return (
//         <div>
//             <img
//                 className="profile-img"
//                 src={"./ProfilePhotos/cats.JPG"}
//                 onClick={() => props.uploaderOpen()}
//             />
//             <br></br>
//             {props.user?.firstname} {props.user?.lastname}
//         </div>
//     );
// }

import { Component } from "react";

export default class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    render() {
        const profilepic =
            this.props.user?.profilepic_url || "/ProfilePhotos/cats.JPG";
        return (
            <div>
                {this.props.user && (
                    <img
                        className="profilePic"
                        onClick={this.props.openSesmee}
                        src={profilepic}
                        alt={`${this.props.user.firstname} ${this.props.user.lastname}`}
                    />
                )}
                {/* if truthy than render  */}
                {this.props.user && (
                    <p>
                        {this.props.user.firstname} {this.props.user.lastname}
                    </p>
                )}
            </div>
        );
    }
}
