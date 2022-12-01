import { Component } from "react";
import Logo from "../logo/logo";
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
        return <Logo user={this.state.currentUser} />;
    }
}
