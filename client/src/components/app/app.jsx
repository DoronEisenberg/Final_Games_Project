import { Component } from "react";
import Logo from "../logo/logo";
import Logout from "../logout/logout";
//import PictureUploader from "./PictureUploader";
export default class App extends Component {
    //initializing state with null
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        };
    }
    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then((user) => {
                console.log("user", user);

                this.setState({
                    currentUser: user,
                });
            });
    }

    render() {
        //passing state to child component

        return (
            <div>
                <Logo user={this.state.currentUser} />
                <footer>
                    <Logout />
                </footer>
            </div>
        );
    }
}
