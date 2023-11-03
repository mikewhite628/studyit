import { useState, useEffect } from "preact/hooks";
import itil from "../modules/ITIL";
import "./styles.css"; // Import your CSS file

export default function Greeting() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState(itil);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setQuestion(questions[questionNumber].question);
    setAnswer(questions[questionNumber].answer);
  }, [questionNumber]);

  const handleAnswer = (e) => {
    e.preventDefault();
    setIsAnswered(true);
    setIsDisabled(true);
    if (e.target.value === answer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsWrong(true);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setIsCorrect(false);
    setIsWrong(false);
    setIsDisabled(false);
    if (questionNumber === questions.length - 1) {
      setIsFinished(true);
    } else {
      setQuestionNumber(questionNumber + 1);
    }
    setIsFlipped(false); // Reset flip state
  };

  const handleShowAnswer = () => {
    setIsFlipped(!isFlipped); // Toggle the flip state
  };

  const handleRestart = () => {
    setIsFinished(false);
    setScore(0);
    setQuestionNumber(0);
  };

  if (isFinished) {
    return (
      <div>
        <h1>Quiz Finished</h1>
        <h3>Score: {score}</h3>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  if (isAnswered) {
    return (
      <div>
        <h1>Quiz</h1>
        <h3>Score: {score}</h3>
        <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
          <div className="card">
            <h3>{question}</h3>
            <h3 className="answer">{answer}</h3>
          </div>
        </div>
        {isCorrect && <h3>Correct!</h3>}
        {isWrong && <h3>Wrong!</h3>}
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz</h1>
      <h3>Score: {score}</h3>
      <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
        <div className="card">
          <h3>{question}</h3>
        </div>
      </div>
      <button onClick={handleShowAnswer}>Show Answer</button>
      <button onClick={handleAnswer} value="true" disabled={isDisabled}>
        True
      </button>
      <button onClick={handleAnswer} value="false" disabled={isDisabled}>
        False
      </button>
    </div>
  );
}
