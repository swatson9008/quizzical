import { useState } from "react";

export default function Splash() {
    const [showSplash, setShowSplash] = useState(true)

    const handleSplash = () =>{
    setShowSplash(false)};
    return (
        <>
        {showSplash && (
        <div className="splashPage">
            <h1>Welcome to the Splash Page</h1>
            <button className="splashButton" onClick={handleSplash}>Click Me</button>
        </div>
        )}
        </>
    )
}