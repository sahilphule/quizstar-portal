initializeCheckboxes();

const delete_button = document.getElementById("delete-btn");
const spinnerWrapperEl = document.querySelector(".spinner-wrapper");

delete_button.addEventListener("click", () => {
  const checkboxes = document.getElementsByName("question_check");
  const toDelete = [];
  spinnerWrapperEl.style.display = "flex";
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      toDelete.push(checkbox.id);
    }
  });

  console.log(toDelete);

  fetch(`/delete-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      to_delete: toDelete,
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

const username_filter = document.getElementById("username-filter");
const table = document.getElementById("table");
const tbody = table.getElementsByTagName("tbody")[0];
const records_p = document.getElementById("records_p");

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
  records_p.innerText = `(${tbody.children.length - 2})`;
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
  records_p.innerText = `(${tbody.children.length - 2})`;
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
  records_p.innerText = `(${tbody.children.length - 2})`;
  initializeCheckboxes();
});

const email_filter = document.getElementById("email-filter");

email_filter.addEventListener("keyup", (e) => {
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
      const tdElements = tbody.children[i].getElementsByTagName("td")[4];

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
  records_p.innerText = `(${tbody.children.length - 2})`;
  initializeCheckboxes();
});

const test_filter = document.getElementById("test-filter");

test_filter.addEventListener("keyup", (e) => {
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
      const tdElements = tbody.children[i].getElementsByTagName("td")[5];

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
  records_p.innerText = `(${tbody.children.length - 2})`;
  initializeCheckboxes();
});


const modal_button = document.getElementById("modal-button");

modal_button.addEventListener("click", (e) => {
  const add_user = document.getElementById("add-user");
  const modal = document.getElementById("modal-sam");
  add_user.disabled = true;
  modal_button.disabled = true;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

function changeLoc() {
  window.location.href = "/add-user";
}

document.getElementById("hide-modal").addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("modal-sam");
  const add_user = document.getElementById("add-user");
  const modal_button = document.getElementById("modal-button");

  add_user.disabled = false;
  modal_button.disabled = false;

  modal.classList.remove("flex");
  modal.classList.add("hidden");
});

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

function initializeCheckboxes() {
  const checkboxes = document.getElementsByName("question_check");
  const checkbox_all = document.getElementById("checkbox-all");
  const selected_box = document.getElementById("selected-box");
  const initial_text = selected_box.innerText;
  const delete_div = document.getElementById("delete-div");
  let selected = 0;

  function triggerChangeEvent(element) {
    const event = new Event("change");
    element.dispatchEvent(event);
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked == true) {
        if (delete_div.classList.contains("hidden")) {
          delete_div.classList.add("flex");
          delete_div.classList.remove("hidden");
        }
        selected++;
      } else {
        selected--;
      }

      if (selected <= 0) {
        selected_box.innerText = initial_text;
        if (delete_div.classList.contains("flex")) {
          delete_div.classList.add("hidden");
          delete_div.classList.remove("flex");
        }
      } else {
        selected_box.innerText = `${selected} SELECTED`;
      }
    });
  });

  checkbox_all.addEventListener("change", () => {
    if (checkbox_all.checked) {
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked == false) {
          checkbox.checked = true;
          triggerChangeEvent(checkbox);
        }
      });
    } else {
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked == true) {
          checkbox.checked = false;
          triggerChangeEvent(checkbox);
        }
      });
    }
  });
}

function showModal() {
  const modal = document.getElementById("modal-sam");
  const add_user = document.getElementById("add-question");
  const modal_button = document.getElementById("modal-button");

  add_user.disabled = true;
  modal_button.disabled = true;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

document.getElementById("hide-modal").addEventListener("click", (e) => {
  e.preventDefault();
  const modal = document.getElementById("modal-sam");
  const add_user = document.getElementById("add-question");
  const modal_button = document.getElementById("modal-button");

  add_user.disabled = false;
  modal_button.disabled = false;

  modal.classList.remove("flex");
  modal.classList.add("hidden");
});
