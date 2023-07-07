

export default function Splash({ onButtonClick }) {
  return (
    <div className="splashPage">
      <h1>Take the Trival Quiz</h1>
      <button className="splashButton" onClick={onButtonClick}>
        Click Me
      </button>
    </div>
  );
}
