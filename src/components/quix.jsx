import { useEffect, useState } from "react"

export default function Quiz() {

    const [quizQs, setQuizQs] = useState([]);

    useEffect(function(){
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        .then((res) => res.json())
        .then((data) => {
            const newQs = data.results.map (question => ({
                question: question.question,
                answers: question.incorrect_answers.concat(question.correct_answer),
            }))
            setQuizQs(newQs)
        })
    }, []);
    console.log(quizQs);
    return (
        <div className="quizBody">
            Some Sample Text
        </div>
    )
}