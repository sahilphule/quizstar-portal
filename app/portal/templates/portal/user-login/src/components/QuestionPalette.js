import { useEffect, useState } from "react";
import style from "../styles.css";

const QuestionPalette = ({ bookmarkedQuestions1, currQuestion, savedAnswers1, questions, handleQuestionChangeClick }) => {
    const [savedAnswers, setSavedAnswers] = useState({})
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState({})

    useEffect(() => {
        setSavedAnswers(savedAnswers1)
    }, [savedAnswers1])

    useEffect(() => {
        let updatedObj = { ...bookmarkedQuestions1 };
        setBookmarkedQuestions(updatedObj)
    }, [bookmarkedQuestions1])

    const handleFinish = () => {
        const res = prompt("Are you sure you want to end the test? Type 'yes' if you are sure.").toLowerCase();
        if (res == 'yes') {
            localStorage.removeItem('bookmarkedQuestions');
            window.location.href = 'finish';
        }

        return;
    }

    return (
        <div className="palette-div mr-10 p-4 w-[400px] rounded-md bg-white shadow-sm flex flex-col justify-center items-center max-h-[410px]">
            <div className="grid grid-cols-5 gap-4 mt-3 overflow-auto">
                {questions.map((question, index) => {
                    if (question['id'] in bookmarkedQuestions) {

                        if (question['id'] === currQuestion['id']) {
                            return (<div
                                onClick={() => handleQuestionChangeClick(question["id"], index)}
                                key={question["id"]}
                                className={(question['id'] in bookmarkedQuestions ? 'bg-purple-400 ' : ' ') + "ind-ques text-orange-400 border-orange-400 hover:bg-purple-500  border-[2px] rounded-md text-base p-1 h-12 w-12 flex items-center justify-center"}
                            >
                                {index + 1}
                            </div>);
                        }

                        if (question['id'] in savedAnswers) {
                            return (<div
                                onClick={() => handleQuestionChangeClick(question["id"], index)}
                                key={question["id"]}
                                className={(question['id'] in bookmarkedQuestions ? 'bg-purple-400 ' : ' ') + "ind-ques text-green-400 border-green-400 hover:text-orange-400 hover:border-orange-400  border-[2px] rounded-md text-base p-1 h-12 w-12 flex items-center justify-center"}
                            >
                                {index + 1}
                            </div>);
                        }


                        return (<div
                            onClick={() => handleQuestionChangeClick(question["id"], index)}
                            key={question["id"]}
                            className={(question['id'] in bookmarkedQuestions ? 'bg-purple-400 text-white ' : ' ') + "ind-ques hover:text-orange-400 hover:border-orange-400 border-[2px] rounded-md text-base p-1 h-12 w-12 flex items-center justify-center"}
                        >
                            {index + 1}
                        </div>);
                    }

                    return (
                        question["id"] === currQuestion["id"]
                            ? (<div
                                onClick={() => handleQuestionChangeClick(question["id"], index)}
                                key={question["id"]}
                                className={(question['id'] in savedAnswers ? "bg-green-400 " : "") + "ind-ques text-orange-400 border-orange-400 border-[2px] rounded-md text-base p-1 h-12 w-12 flex items-center justify-center"}
                            >
                                {index + 1}
                            </div>)

                            : (<div
                                onClick={() => handleQuestionChangeClick(question["id"], index)}
                                key={question["id"]}
                                className={(question['id'] in savedAnswers ? "bg-green-400 text-white " : "") + "ind-ques hover:text-orange-400 hover:border-orange-400 border-[2px] rounded-md text-base p-1 h-12 w-12 flex items-center justify-center"}
                            >
                                {index + 1}
                            </div>));
                })}
            </div>
            <button
                onClick={handleFinish}
                className="p-3 mt-6 transition-all rounded-md border-slate-300 border-[2px] hover:text-red-400 hover:border-red-400"
            >
                Finish
            </button>
        </div>
    );
};

export default QuestionPalette;
