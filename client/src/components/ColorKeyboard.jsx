export default function ColorKeyboard({ color, onClick, flash }) {
    return (
        <div
            onClick={onClick}
            className={`ColorKeyboard ${color} ${flash ? "flash" : ""}`}
        ></div>
    );
}
