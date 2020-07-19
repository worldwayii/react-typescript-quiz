import React from 'react';

//Types
import {AnswerObject} from '../App'

//Styles
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'

type Props = {
    question: string;
    answers: string[];
    callbak: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callbak, 
    userAnswer, 
    questionNr, 
    totalQuestions
}) => (
<Wrapper>
    <p className="number">
        Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    {answers.map((answer) => (
        <ButtonWrapper 
        key={answer}
        correct={userAnswer?.correctAnswer === answer}
        userClicked={userAnswer?.answer === answer}>
            <button disabled={userAnswer ? true : false} onClick={callbak}> 
                <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
        </ButtonWrapper>

    ))}
</Wrapper>
);

export default QuestionCard;