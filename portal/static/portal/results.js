const checkboxes = document.getElementsByName("question_check");
const checkbox_all = document.getElementById("checkbox-all");
// const initial_text = selected_box.innerText;
const delete_button = document.getElementById("delete-btn");
const spinnerWrapperEl = document.querySelector(".spinner-wrapper");
let selected = 0;

initializeCheckboxes();

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

function triggerChangeEvent(element) {
  const event = new Event('change');
  element.dispatchEvent(event);
}

delete_button.addEventListener('click', () => {
  showModal()
})

function showModal() {
  const modal = document.getElementById("modal-sam");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

document.getElementById("hide-modal").addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("modal-sam");

  modal.classList.remove("flex");
  modal.classList.add("hidden");
});

document.getElementById('reset-user-btn').addEventListener("click", () => {
  const checkboxes = document.getElementsByName("question_check");
  const toDelete = [];
  spinnerWrapperEl.style.display = "flex";

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      console.log(checkbox.id)
      toDelete.push(parseInt(checkbox.id));
    }
  });

  fetch(`/reset-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      to_reset: toDelete,
      test_id: test_id,
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
      location.reload();
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
});


function initializeCheckboxes(){
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      event.stopPropagation()
      if (checkbox.checked == true) {
        if (delete_button.classList.contains("hidden")) {
          delete_button.classList.add("flex");
          delete_button.classList.remove("hidden");
        }
        selected++;
      } else {
        selected--;
      }
  
      if (selected <= 0) {
        // selected_box.innerText = initial_text;
        if (delete_button.classList.contains("flex")) {
          delete_button.classList.add("hidden");
          delete_button.classList.remove("flex");
        }
      } else {
        // selected_box.innerText = `${selected} SELECTED`;
      }
    });
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation()
    });
  });
  
  checkbox_all.addEventListener("change", () => {
    if (checkbox_all.checked) {
      checkboxes.forEach((checkbox) => {
        if(checkbox.disabled == false && checkbox.checked == false){
          checkbox.checked = true;
          triggerChangeEvent(checkbox)
        }
      });
    } else {
      checkboxes.forEach((checkbox) => {
        if(checkbox.disabled == false && checkbox.checked == true){
          checkbox.checked = false;
          triggerChangeEvent(checkbox)
        }
      });
    }
  });
}

const username_filter = document.getElementById("username-filter");
const table = document.getElementById("table");
const tbody = table.getElementsByTagName("tbody")[0];

savedRows = [];
for (var i = 2; i < tbody.children.length; i++) {
  savedRows.push(tbody.children[i].cloneNode(true));
}

console.log(savedRows[0]);

username_filter.addEventListener("keyup", (e) => {
  let filteredArr = [];

  const target_val = e.target.value;

  for (let i = tbody.children.length - 1; i >= 2; i--) {
    tbody.removeChild(tbody.children[i]);
  }

  for (var i = 0; i < savedRows.length; i++) {
    tbody.appendChild(savedRows[i]);
  }

  if (target_val === "") {
  } else {
    for (let i = 2; i < tbody.children.length; i++) {
      const tdElements = tbody.children[i].getElementsByTagName("td")[1];

      if (tdElements.innerText.includes(target_val)) {
        filteredArr.push(tbody.children[i].cloneNode(true));
      }
    }

    for (let i = tbody.children.length - 1; i >= 2; i--) {
      tbody.removeChild(tbody.children[i]);
    }

    for (let i = 0; i < filteredArr.length; i++) {
      tbody.appendChild(filteredArr[i]);
    }
  }
  initializeCheckboxes();
});

const firstname_filter = document.getElementById("firstname-filter");

firstname_filter.addEventListener("keyup", (e) => {
  let filteredArr = [];

  const target_val = (e.target.value).toLowerCase();

  for (let i = tbody.children.length - 1; i >= 2; i--) {
    tbody.removeChild(tbody.children[i]);
  }

  for (var i = 0; i < savedRows.length; i++) {
    tbody.appendChild(savedRows[i]);
  }

  if (target_val === "") {
  } else {
    for (let i = 2; i < tbody.children.length; i++) {
      const tdElements = tbody.children[i].getElementsByTagName("td")[2];

      if (tdElements.innerText.toLowerCase().includes(target_val)) {
        filteredArr.push(tbody.children[i].cloneNode(true));
      }
    }

    for (let i = tbody.children.length - 1; i >= 2; i--) {
      tbody.removeChild(tbody.children[i]);
    }

    for (let i = 0; i < filteredArr.length; i++) {
      tbody.appendChild(filteredArr[i]);
    }
  }
  initializeCheckboxes();
});

const lastname_filter = document.getElementById("lastname-filter");

lastname_filter.addEventListener("keyup", (e) => {
  let filteredArr = [];

  const target_val = (e.target.value).toLowerCase();

  for (let i = tbody.children.length - 1; i >= 2; i--) {
    tbody.removeChild(tbody.children[i]);
  }

  for (var i = 0; i < savedRows.length; i++) {
    tbody.appendChild(savedRows[i]);
  }

  if (target_val === "") {
  } else {
    for (let i = 2; i < tbody.children.length; i++) {
      const tdElements = tbody.children[i].getElementsByTagName("td")[3];

      if (tdElements.innerText.toLowerCase().includes(target_val)) {
        filteredArr.push(tbody.children[i].cloneNode(true));
      }
    }

    for (let i = tbody.children.length - 1; i >= 2; i--) {
      tbody.removeChild(tbody.children[i]);
    }

    for (let i = 0; i < filteredArr.length; i++) {
      tbody.appendChild(filteredArr[i]);
    }
  }
  initializeCheckboxes();
});