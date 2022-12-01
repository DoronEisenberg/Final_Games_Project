import { Component } from "react";
import "./logo.css";
export default class Logo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <img className="logo" src="/Logo.png" alt="logo" />

                {this.props.user && (
                    <p>
                        Welcome back {this.props.user.firstname}{" "}
                        {this.props.user.lastname}! lovely email!{" "}
                        {this.props.user.email}
                    </p>
                )}
            </div>
        );
    }
}
