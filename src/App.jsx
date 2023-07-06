import { useState } from "react";
import Splash from "./components/splash";
import Quiz from "./components/quix";

function App() {
  const [isQuizVisible, setIsQuizVisible] = useState(false);

  const handleButtonClick = () => {
    setIsQuizVisible(true);
  };

  return (
    <main>
      {isQuizVisible ? <Quiz /> : <Splash onButtonClick={handleButtonClick} />}
    </main>
  );
}

export default App;