import { useState } from "react";
import Splash from "./components/splash";
import Quiz from "./components/quix";

function App() {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDivVisible(true);
  };

  return (
    <main>
      {isDivVisible ? <Quiz /> : <Splash onButtonClick={handleButtonClick} />}
    </main>
  );
}

export default App;