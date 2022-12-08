import { Component } from "react";
// import SubmitButton from "../SubmitButton";
export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
        this.editBio = this.editBio.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    ////// METHODS /////
    editBio() {
        this.setState({ editing: true });
    }
    handleInputChange(e) {
        console.log(e);
        const text = e.currentTarget.value;
        this.setState({
            [e.currentTarget.name]: text,
        });
    }
    /*
    handleToggle() {
        this.setState({
            editBio: true,
        });
    }

    handleSubmit() {
        fetch("/updatebio", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((userData) => {
                console.log("userData in BIO: ", userData);
                this.setState({
                    editBio: false,
                    userData: userData,
                });
            })
            .catch((error) => {
                console.log("PROBLEM IN BIO: ", error);
            });
    }

    componentDidMount() {
        console.log("here inside biohook");
        fetch("/userprofile")
            .then((res) => res.json())
            .then((userData) => {
                console.log("BIO USER DATA FETCH: ", userData);
                this.setState({ userData: userData });
            })
            .catch((error) => {
                console.log("ERROR FETCH BIO: ", error);
            });
    }

    //
    componentDidUpdate() {
        if (this.state.biotext !== this.props.userData.biotext) {
            this.setState({
                biotext: this.props.userData.biotext,
            });
        }
    }
    */
    render() {
        const bio = this.props.user?.bio || "";
        return (
            <div>
                <p>bio</p>
                <div>
                    {!this.state.editing && (
                        <div>
                            <div className="biotext">{bio}</div>
                            <button onClick={this.editBio}>edit bio</button>
                        </div>
                    )}
                    {this.state.editing && (
                        <div>
                            <input
                                type="text"
                                name="inputBio"
                                onChange={this.handleInputChange}
                                placeholder="add a bio"
                            ></input>
                            <button
                                route="/BioEditor"
                                payload={{ inputBio: this.state.inputBio }}
                                onClick={() => {
                                    this.setState({ editing: false });
                                    this.props.bioUpdate(this.state.inputBio);
                                }}
                                onError={() => {}}
                                text="save"
                            >
                                SUBMIT
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
//console.log("this.editBio", this.editBio);
