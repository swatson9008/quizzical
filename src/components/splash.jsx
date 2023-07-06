

export default function Splash({ onButtonClick }) {
  return (
    <div className="splashPage">
      <h1>Welcome to the Splash Page</h1>
      <button className="splashButton" onClick={onButtonClick}>
        Click Me
      </button>
    </div>
  );
}
