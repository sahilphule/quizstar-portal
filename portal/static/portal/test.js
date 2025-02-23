let currQuestionNumber = 1;

const visitedQuestions = {};

const question_number = document.getElementById("question-number");
const question_para = document.getElementById("question-para");
const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const op1_r = document.getElementById("op1-r");
const op2_r = document.getElementById("op2-r");
const op3_r = document.getElementById("op3-r");
const op4_r = document.getElementById("op4-r");
const butnext = document.getElementById("next");
const goback = document.getElementById("goback");

const escapeHtml = (unsafe) => {
  return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function handleClear(){
  op1_r.checked = false;
  op2_r.checked = false;
  op3_r.checked = false;
  op4_r.checked = false;
}

function updateClassList(currQuestion_ID) {
  if (currQuestion_ID == -1) {
    currQuestion_ID = currQuestionID;
  }
  const op_p = document.getElementById(currQuestion_ID);
  if (op_p.classList.contains("not-answered")) {
    op_p.classList.remove("not-answered");
  }
  op_p.classList.add("answered");
}

Object.entries(savedAnswers).map((entry) => {
  let key = entry[0];
  let value = entry[1];
  updateClassList(key);
  // console.log(key, value);
});

function updateUI(questionData) {
  question_para.innerHTML = questionData["question"];
  question_number.innerHTML = currQuestionNumber;

  visitedQuestions[currQuestionNumber] = questionData;

  if (questionData["op1IsCode"]) {
    op1.innerHTML = `${escapeHtml(questionData["op1"])}`;
  } else {
    op1.innerHTML = `${questionData["op1"]}`;
  }

  if (questionData["op2IsCode"]) {
    op2.innerHTML = `${escapeHtml(questionData["op2"])}`;
  } else {
    op2.innerHTML = questionData["op2"];
  }

  if (questionData["op3IsCode"]) {
    op3.innerHTML = `${escapeHtml(questionData["op3"])}`;
  } else {
    op3.innerHTML = questionData["op3"];
  }

  if (questionData["op4IsCode"]) {
    op4.innerHTML = `${escapeHtml(questionData["op4"])}`;
  } else {
    op4.innerHTML = questionData["op4"];
  }

  const toMark = document.getElementById(currQuestionID);

  if (
    !toMark.classList.contains("answered") &&
    !toMark.classList.contains("not-answered")
  ) {
    toMark.classList.add("not-answered");
  }

  op1_r.checked = false;
  op2_r.checked = false;
  op3_r.checked = false;
  op4_r.checked = false;

  if (savedAnswers[currQuestionID] != null) {
    user_saved_option = savedAnswers[currQuestionID];

    if (user_saved_option == 1) {
      op1_r.checked = true;
    } else if (user_saved_option == 2) {
      op2_r.checked = true;
    } else if (user_saved_option == 3) {
      op3_r.checked = true;
    } else {
      op4_r.checked = true;
    }
  }
}

async function getNextQuestion(question_num) {
  if (visitedQuestions[question_num] != null) {
    return visitedQuestions[question_num];
  }
  try {
    const res = await fetch(
      `${window.location.href}get-next-question/${question_num}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
}

async function fetchAndUpdateQuestion() {
  try {
    const questionData = await getNextQuestion(currQuestionNumber);
    currQuestionID = questionData["id"];
    updateUI(questionData);
  } catch (error) {
    console.error("Error updating question:", error);
  }
}

fetchAndUpdateQuestion();

function getNextQuestionAndUpdateUI(num) {
  getNextQuestion(num);
  fetchAndUpdateQuestion();
}

function handleNext() {
  if (currQuestionNumber >= number_of_questions) {
    return;
  }
  currQuestionNumber++;
  getNextQuestionAndUpdateUI(currQuestionNumber);
}

function handleBack() {
  if (currQuestionNumber <= 1) {
    return;
  }
  currQuestionNumber--;
  getNextQuestionAndUpdateUI(currQuestionNumber);
}

function handlePaletteClick(id) {
  currQuestionNumber = document.getElementById(id).innerText;
  currQuestionID = id;
  getNextQuestionAndUpdateUI(currQuestionNumber);
}

function getCSRFToken() {
  var csrfToken = null;

  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith("csrftoken=")) {
      csrfToken = cookie.substring("csrftoken=".length, cookie.length);
      break;
    }
  }

  return csrfToken;
}

function handleSave() {
  const spinnerWrapperEl = document.querySelector(".spinner-wrapper");

  var csrf_token = getCSRFToken();

  let radioButtons = document.getElementsByName("answer");
  let checked_r = "";

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      checked_r = radioButtons[i].value;
      break;
    }
  }

  let user_option = -1;

  if (checked_r == "op1") {
    user_option = 1;
  } else if (checked_r == "op2") {
    user_option = 2;
  } else if (checked_r == "op3") {
    user_option = 3;
  } else {
    user_option = 4;
  }

  spinnerWrapperEl.style.display = "flex";
  return fetch(`${window.location.href}save-answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf_token,
    },
    body: JSON.stringify({
      user_option: user_option,
      question_id: currQuestionID,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      spinnerWrapperEl.style.display = "none";
      savedAnswers[currQuestionID] = user_option;
      updateClassList(-1);
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

function handleSaveAndNext() {
  handleSave()
  .then(() => {
    handleNext();
  });
}

function finishTest() {
  getResponse = prompt(
    "Are you sure you want to finish the Test? Type 'Yes' in the following input box."
  ).toLowerCase();

  if (getResponse == "yes") {
    window.location.href = "finish";
  }
}

setInterval(() => {
  fetch(`${window.location.href}get-test-status`, {
    headers: {
      "X-CSRFToken": getCSRFToken(),
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data['test_status'])
    if(data["test_status"] == '2'){
      window.location.href = "finish";
    }
    
  })
}, 1000);
