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


const timeInput = document.getElementById("time-test");
const butt = document.getElementById('butt');
const spinnerWrapperEl = document.querySelector('.spinner-wrapper')


// Array.prototype.forEach.call(collections, (timeInput) => {
  butt.addEventListener("click", function () {
    spinnerWrapperEl.style.display = "flex";
    time_now = timeInput.value;
    const test_id = timeInput.getAttribute("data-mydata");

    fetch(`/basic-settings/change-time/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      body: JSON.stringify({
        test_id: test_id,
        time_now: time_now,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        spinnerWrapperEl.style.display = 'none';
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });

    console.log("Time changed:", timeInput.value);
  });
// });