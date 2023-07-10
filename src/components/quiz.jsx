import { useEffect, useState } from "react"
import shuffleArray from "shuffle-array";
import {decode} from 'html-entities';

export default function Quiz() {

    const [quizQs, setQuizQs] = useState([]);

    const [quizDone, setQuizDone] = useState(false);

    const [quizC, setQuizC] = useState(0);

    const [disable, setDisable] = useState(false);

    const initialQuizQs = [];

    const initialQuizC = 0;

    useEffect(() => {
        fetchQuizQuestions();
      }, []);

    const fetchQuizQuestions = () => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
          .then((res) => res.json())
          .then((data) => {
            const newQs = data.results.map((question) => ({
              question: decode(question.question),
              answers: shuffleArray(
                question.incorrect_answers.concat(question.correct_answer)
              ).map((answer) => decode(answer)),
              correct: question.correct_answer,
            }));
            setQuizQs(newQs);
          })
          .catch((error) => {
            console.log("Error fetching quiz questions:", error);
          });
      };

    const handleAnswerChange = (questionIndex, answer) => {
        const updatedQs = [... quizQs];
        updatedQs[questionIndex].selectedAnswer = answer;
        setQuizQs(updatedQs);
        console.log(quizQs[questionIndex].correct)
        console.log(answer)
    }
    const answerClass = (answer, item) => {
        console.log(item.selectedAnswer)
        if (!quizDone) {
          return "regularBox";
        } else if (answer === item.correct && item.correct === item.selectedAnswer) {
          return "correctBox";
        } else if (answer !== item.correct && answer === item.selectedAnswer) {
          return "incorrectBox";
        } else if (answer === item.correct && item.correct != item.selectedAnswer){
            return "correctedBox"
        }
        else {
          return "regularBox";
        }
      };
    
    const handleSubmit = () => {
        setQuizDone(true);
        setDisable(true);
        let score = 0;
        quizQs.forEach((question) => {
            if (question.selectedAnswer === question.correct){score++}
        })
        setQuizC((prevQuizC => prevQuizC + score))
        console.log(quizC)
    }

    const handleReset = () => {
        setQuizQs(initialQuizQs);
        setQuizDone(false);
        setQuizC(initialQuizC);
        setDisable(false);
        fetchQuizQuestions();
      };


    return (
        <div className="quizBody">
            {quizQs.map((item, index) => (
        <div key={index} className="quizQs">
          <h2 className="questionLine">{item.question}</h2>
          <div className="quizMain">
                {item.answers.map((answer, answerIndex) => (
        
                    <label key={answerIndex}>
                        <input
                            type="radio"
                            name={`question${index}`}
                            value={answerIndex}
                            checked={item.selectedAnswer === answer}
                            onChange={() => handleAnswerChange(index, answer)}
                            />
                            <span disabled={disable} className={answerClass(answer, item)}>{answer}</span>
                            
                    </label>
                ))}
          </div>
          {index !== quizQs.length - 1 && <hr />}
        </div>
      ))}
      <div className="quizBottom">{quizDone ? "" : <button className="submitQuiz" onClick={() => handleSubmit()}>Check Answers</button>}
      {quizDone ? <div className="scoreQuiz">Your Score is {quizC} out of 5!</div> : null}
      {quizDone ? <button className="againButton" onClick={handleReset}>Try Again</button> : null}</div>
        </div>
    )
}