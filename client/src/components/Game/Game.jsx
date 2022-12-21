import React from "react";
import "./Game.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ColorKeyboard from "../ColorKeyboard";
import timeout from "../../utils/util";
import green from "../../audiobuttons/StringsPhased1.mp3";
import sky from "../../audiobuttons/StringsPhased2.mp3";
import pink from "../../audiobuttons/StringsPhased3.mp3";
import orange from "../../audiobuttons/StringsPhased4.mp3";
import theend from "../../audiobuttons/Laugh.mp3";

function Game() {
    const [isOn, setIsOn] = useState(false);

    const colorList = ["orange", "pink", "sky", "green"];

    const initPlay = {
        isDisplay: false,
        colors: [],
        score: 0,
        userPlay: false,
        userColors: [],
    };
    const navigate = useNavigate();
    const [play, setPlay] = useState(initPlay);
    const [flashColor, setFlashColor] = useState("");

    const goHome = () => {
        navigate("/");
    };

    ///////   Here the is sound function  is called
    function playFirst(v) {
        if (v === "orange") {
            new Audio(orange).play();
        } else if (v === "pink") {
            new Audio(pink).play();
        } else if (v === "sky") {
            new Audio(sky).play();
        } else if (v === "green") {
            new Audio(green).play();
        } else if (v === "theend") {
            new Audio(theend).play();
        }
    }
    function gameOver(theend) {
        new Audio(theend).play();
    }

    function startHandle() {
        setIsOn(true);
    }

    useEffect(() => {
        console.log("runnning first useEffect");
        if (isOn) {
            setPlay({ ...initPlay, isDisplay: true });
        } else {
            setPlay(initPlay);
        }
    }, [isOn]);

    useEffect(() => {
        console.log("runnning second useEffect");

        if (isOn && play.isDisplay) {
            let newColor = colorList[Math.floor(Math.random() * 4)];
            console.log(newColor);
            console.log("what is this", play.colors);

            const copyColors = [...play.colors];
            copyColors.push(newColor);
            setPlay({ ...play, colors: copyColors });
            console.log(copyColors);
        }
    }, [isOn, play.isDisplay]);

    useEffect(() => {
        console.log("runnning third useEffect");

        if (isOn && play.isDisplay && play.colors.length) {
            displayColors();
        }
    }, [isOn, play.isDisplay, play.colors.length]);

    async function displayColors() {
        await timeout(1000);
        for (let i = 0; i < play.colors.length; i++) {
            setFlashColor(play.colors[i]); ///// when flash play color is changed
            playFirst(play.colors[i]); ///// when flash play sound
            await timeout(300); //// time delay for flash play
            setFlashColor("");
            await timeout(300);

            if (i === play.colors.length - 1) {
                const copyColors = [...play.colors];

                setPlay({
                    ...play,
                    isDisplay: false,
                    userPlay: true,
                    userColors: copyColors.reverse(),
                });
            }
        }
    }

    async function keyboardClickHandle(color) {
        if (!play.isDisplay && play.userPlay) {
            const copyUserColors = [...play.userColors];
            const lastColor = copyUserColors.pop();
            setFlashColor(color);
            console.log(
                "inside keyboardClickHandle",
                play.userColors,
                color,
                lastColor
            );

            if (color === lastColor) {
                if (copyUserColors.length) {
                    setPlay({ ...play, userColors: copyUserColors });
                } else {
                    await timeout(1000);
                    setPlay({
                        ...play,
                        isDisplay: true,
                        userPlay: false,
                        score: play.colors.length,
                        gameover: true, ////
                        userColors: [],
                    });
                }
            } else {
                await timeout(1000);
                setPlay({ ...initPlay, score: play.colors.length });
            }
            await timeout(1000);
            setFlashColor("");
        }
    }

    function closeHandle() {
        setIsOn(false);
    }

    return (
        <div className="Game">
            <header className="Game-header">
                <div className="gameWrapper">
                    {colorList &&
                        colorList.map((v, i) => (
                            // console.log("v", v),
                            <ColorKeyboard
                                onClick={() => {
                                    keyboardClickHandle(v);
                                    playFirst(v); //// sound.play
                                }}
                                flash={flashColor === v}
                                color={v}
                                key={v}
                            ></ColorKeyboard>
                        ))}
                </div>

                {isOn && !play.isDisplay && !play.userPlay && play.score && (
                    <div className="lost">
                        <div>
                            {""}
                            Game over! <br></br>Score: {play.score}
                        </div>
                        <div>{gameOver(theend)}</div>{" "}
                        {/* play sound Game over*/}
                        <button onClick={closeHandle}>Start Again</button>
                    </div>
                )}
                {!isOn && !play.score && (
                    <button onClick={startHandle} className="startButton">
                        Play
                    </button>
                )}
                {isOn && (play.isDisplay || play.userPlay) && (
                    <div className="score">{play.score}</div>
                )}
            </header>
            <footer>
                <button onClick={goHome}>GO BACK HOME</button>
            </footer>
        </div>
    );
}

export default Game;
