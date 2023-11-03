import { useState, useEffect } from "preact/hooks";
import itil from "../modules/ITIL";
import "../style.css";

export default function FlashCards() {
  const [data, setData] = useState(itil);
  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showButtonText, setShowButtonText] = useState("Show Answer");

  useEffect(() => {
    setQuestion(data[questionNumber].question);
    setAnswer(data[questionNumber].answer);
  }, [questionNumber]);

  const handleNextQuestion = () => {
    if (questionNumber === data.length - 1) {
      setQuestionNumber(0);
    } else {
      setQuestionNumber(questionNumber + 1);
      setShowAnswer(false);
    }
  };

  useEffect(() => {
    if (showAnswer) {
      setShowButtonText("Hide Answer");
    } else {
      setShowButtonText("Show Answer");
    }
  }, [showAnswer]);

  return (
    <div>
      <h1>Flash Cards</h1>
      <div className={`card-container`}>
        <h3>{question}</h3>
        {showAnswer ? <h3>{answer}</h3> : null}
      </div>
      <button
        className={`custom-button`}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showButtonText}
      </button>
      <button className={`custom-button`} onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
}
