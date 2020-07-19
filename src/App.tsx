import React, {useState } from 'react';
import {fetchQuizQuestions} from './API';

//Components
import QuestionCard from './components/QuestionCard';

//Types
import {QuestionState, Difficulty} from './API';
// import { type } from 'os';

//Styles
import {GlobalStyle, Wrapper} from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, SetNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.HARD
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    SetNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Get user answers
      const answer = e.currentTarget.value;
      //check user supplied answer to that of the correct answer
      const correct = questions[number].correct_answer === answer;
      //add to final score if correct
      if (correct) setScore(prev => prev +1);
      //save answer to an array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject])
    }
  };

  const nextQuestion = () => {
    //move to next question
    const  nextQuestion = number + 1;
    if (nextQuestion == TOTAL_QUESTIONS){
      setGameOver(true);
    }else{
      SetNumber(nextQuestion);
    }
  }

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1> React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start" onClick={startTrivia}> 
      Start 
      </button>
      ) : null }
      {!gameOver ? <p className="score"> Score: {score}</p> : null }
      { loading  && <p>Loading Questions ...</p>  }
      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={ number +1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callbak={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
      ) : null }
    
      </Wrapper>
      </>
    );
}

export default App;
