import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e);

        this.setState(
            {
                [e.currentTarget.name]: e.currentTarget.value,
            },
            () => {
                console.log(this.state);
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("About to submit the form!");

        const registeredUser = {};

        registeredUser.email = this.state.email;
        registeredUser.password = this.state.password;

        console.log(registeredUser);

        fetch("/login", {
            method: "POST",
            body: JSON.stringify(registeredUser),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((response) => {
                console.log("response is: ", response);

                if (response.success) {
                    // User is logged-in
                    // -> reload page to show logged-in
                    location.replace("/");
                    console.log("ok!");
                } else {
                    console.log("no!");
                    // Update 'error' property in state
                    this.setState({ error: response.error });
                }
            });
    }

    render() {
        return (
            <div>
                <h1>This is the login component</h1>
                <div className="error">{this.state.error}</div>
                <form>
                    <div>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            placeholder="Email"
                        ></input>
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            placeholder="Password"
                        ></input>
                    </div>
                    <div>
                        <button onClick={this.handleSubmit}>Login Now</button>
                    </div>
                </form>
                <p>
                    <Link to="/register">Create an Account</Link>
                </p>
            </div>
        );
    }
}
