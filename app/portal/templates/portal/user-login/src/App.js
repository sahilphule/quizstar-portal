import { useEffect, useState } from "react";
import sokalp from "./sokalp.png";
import style from "./styles.css";
import QuestionPalette from "./components/QuestionPalette";
import Timer from "./components/Timer";

function App() {

  const [question, setQuestion] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [currQuestionNumber, setCurrQuestionNumber] = useState(0);
  const [savedAnswers, setSavedAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [seconds, setSeconds] = useState(100);
  const [loaded, setLoaded] = useState(false);
  let second = 100;

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    fetch('/get-test-details')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data['questions'])
        setQuestion(data['questions'][0])
        setSeconds(Number(data['seconds']));
        second = Number(data['seconds']);
        const inputObject = JSON.parse(data['saved_answers'])
        setSavedAnswers(inputObject)
        setLoaded(true);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    let obj = JSON.parse(localStorage.getItem('bookmarkedQuestions'));

    if (obj) {
      console.log(obj);
      setBookmarkedQuestions(obj);
    }
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      fetch(`${window.location.href}get-test-status`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data['test_status'])
          if (data["test_status"] == '2') {
            window.location.href = "finish";
          }
        })

      return () => clearInterval(intervalID);
    }, 1000)
  }, [])

  useEffect(() => {
    if (question['id'] in savedAnswers) {
      console.log(true)
      setSelectedOption(`${savedAnswers[question['id']]}`)
      return;
    }

    setSelectedOption(null);
  }, [question])

  const handleOnOptionSelect = (e) => {
    console.log(e.target.value)
    setSelectedOption(e.target.value)
  }

  const handleQuestionChangeClick = (id, index) => {
    setQuestion(questions[index]);
    setCurrQuestionNumber(index);
  }

  const handleNext = () => {
    let index = currQuestionNumber;

    if (index + 1 >= questions.length) {
      index = -1;
    }

    setQuestion(questions[index + 1]);
    setCurrQuestionNumber(index + 1)

  }

  const handleBack = () => {
    let index = currQuestionNumber;

    if (index - 1 < 0) {
      index = questions.length;
    }

    setQuestion(questions[index - 1])
    setCurrQuestionNumber(index - 1)

  }

  const handleSave = () => {

    const selectedAnswer = selectedOption === null ? null : parseInt(selectedOption);
    if (selectedAnswer === null) {
      return;
    }
    let flag = 0;

    const updatedObj = savedAnswers;
    updatedObj[question['id']] = selectedAnswer;
    setSavedAnswers(updatedObj)

    return fetch(`save-answer`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie('csrftoken'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_option: selectedOption,
        question_id: question['id'],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const handleSaveAndNext = () => {
    handleSave()
    handleNext()
  }

  const handleClear = () => {
    setSelectedOption(null);

    let updatedObj = savedAnswers;
    delete updatedObj[question['id']]
    setSavedAnswers(updatedObj)

    return fetch(`/clear-answer`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie('csrftoken'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_id: question['id'],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const handleBookmark = () => {
    let updatedObj = { ...bookmarkedQuestions };

    if (question["id"] in updatedObj) {
      delete updatedObj[question['id']]
    }
    else {
      updatedObj[question['id']] = true;
    }

    let jsonStringObj = JSON.stringify(updatedObj);
    // console.log(jsonStringObj);
    localStorage.setItem('bookmarkedQuestions', jsonStringObj)
    setBookmarkedQuestions(updatedObj);
  }

  return (
    <>
      <nav>
        <div className="bg-white p-4 shadow-sm flex justify-center items-center">
          <div className="w-full mx-9 flex items-center justify-between">
            <img className="h-8" src={sokalp} alt="sokalp-logo" />
            {loaded && <Timer remainingTime={seconds} onTimerEnd={() => console.log("hi")} />}
          </div>
        </div>
      </nav>

      <div className="flex items-start justify-between w-full mt-14 gap-6">
        <div className="question-div p-6 rounded-md flex-grow bg-white shadow-sm ml-11">
          <div className="flex justify-between items-center  mb-9">
            <h1 className='text-[18px] font-semibold'>Question {currQuestionNumber + 1} / {questions.length}</h1>
            <div onClick={handleBookmark} className="hover:bg-slate-200 rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor"
                className={(question['id'] in bookmarkedQuestions ? 'fill-orange-400 ' : ' ') + "w-6 h-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="question-para mb-9" dangerouslySetInnerHTML={{ '__html': question['question'] }}>
          </div>
          <div className="op-div flex w-full items-start mb-5 gap-3 flex-wrap">
            <input className="size-6" checked={selectedOption === '1'} onChange={handleOnOptionSelect} type="radio" name='answer' value={'1'} id='op1-r' />
            <label htmlFor="op1-r" dangerouslySetInnerHTML={{ '__html': question['op1'] }}></label>
          </div>
          <div className="op-div flex w-full items-start mb-5 gap-3 flex-wrap">
            <input className="size-6" checked={selectedOption === '2'} onChange={handleOnOptionSelect} type="radio" name='answer' value={'2'} id='op2-r' />
            <label htmlFor="op2-r" dangerouslySetInnerHTML={{ '__html': question['op2'] }}></label>
          </div>
          <div className="op-div flex w-full items-start mb-5 gap-3 flex-wrap">
            <input className="size-6" checked={selectedOption === '3'} onChange={handleOnOptionSelect} type="radio" name='answer' value={'3'} id='op3-r' />
            <label htmlFor="op3-r" dangerouslySetInnerHTML={{ '__html': question['op3'] }}></label>
          </div>
          <div className="op-div flex w-full items-start mb-5 gap-3 flex-wrap">
            <input className="size-6" checked={selectedOption === '4'} onChange={handleOnOptionSelect} type="radio" name='answer' value={'4'} id='op4-r' />
            <label htmlFor="op4-r" dangerouslySetInnerHTML={{ '__html': question['op4'] }}></label>
          </div>

          <div className="buttons flex gap-3 mt-8">
            <button
              onClick={handleSaveAndNext}
              disabled={selectedOption === null ? true : false}
              className={(selectedOption === null ? "text-slate-300 " : "hover:text-orange-400 hover:border-orange-400 ") + "p-3 transition-all rounded-md border-slate-300 border-[2px]"}
            >
              Save and Next
            </button>
            <button
              onClick={handleNext}
              className="p-3 transition-all rounded-md border-slate-300 border-[2px] hover:text-orange-400 hover:border-orange-400"
            >
              Next
            </button>
            <button
              onClick={handleBack}
              className="p-3 transition-all rounded-md border-slate-300 border-[2px] hover:text-orange-400 hover:border-orange-400"
            >
              Back
            </button>
            <button
              onClick={handleClear}
              disabled={selectedOption === null ? true : false}
              className={(selectedOption === null ? "text-slate-300 " : "hover:text-orange-400 hover:border-orange-400 ") + "p-3 transition-all rounded-md border-slate-300 border-[2px]"}
            >
              Clear
            </button>
          </div>
        </div>
        <QuestionPalette bookmarkedQuestions1={bookmarkedQuestions} currQuestion={question} savedAnswers1={savedAnswers} handleQuestionChangeClick={handleQuestionChangeClick} questions={questions} />
      </div>
    </>
  );
}


export default App;
