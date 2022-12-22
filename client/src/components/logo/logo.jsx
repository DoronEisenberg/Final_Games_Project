import { Component } from "react";
import "./logo.css";
export default class Logo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <header>
                    <div className="componentone" />
                    <img className="logo" src="/tenor1.gif" alt="logo" />

                    {this.props.user && (
                        <p>
                            <br></br>
                            Welcome back <br></br>
                            {this.props.user.firstname} &nbsp;
                            {this.props.user.lastname}!<br></br>E-mail:{" "}
                            {this.props.user.email}
                        </p>
                    )}
                </header>
            </div>
        );
    }
}
