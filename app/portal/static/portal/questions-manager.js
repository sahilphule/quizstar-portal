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

const checkboxes = document.getElementsByName("question_check");
const checkbox_all = document.getElementById("checkbox-all");
const selected_box = document.getElementById("selected-box");
const initial_text = selected_box.innerText;
const delete_button = document.getElementById("delete-btn");
const spinnerWrapperEl = document.querySelector(".spinner-wrapper");
let selected = 0;

function triggerChangeEvent(element) {
  const event = new Event('change');
  element.dispatchEvent(event);
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
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
      selected_box.innerText = initial_text;
      if (delete_button.classList.contains("flex")) {
        delete_button.classList.add("hidden");
        delete_button.classList.remove("flex");
      }
    } else {
      selected_box.innerText = `${selected} SELECTED`;
    }
  });
});

checkbox_all.addEventListener("change", () => {

  if (checkbox_all.checked) {
    checkboxes.forEach((checkbox) => {
      if(checkbox.checked == false){
        checkbox.checked = true;
        triggerChangeEvent(checkbox)
      }
    });
  } else {
    checkboxes.forEach((checkbox) => {
      if(checkbox.checked == true){
        checkbox.checked = false;
        triggerChangeEvent(checkbox)
      }
    });
  }
});

delete_button.addEventListener("click", () => {
  showModal();
});

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

document.getElementById("delete-test-btn").addEventListener("click", (e) => {
  const toDelete = [];
  spinnerWrapperEl.style.display = "flex";
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      toDelete.push(checkbox.id);
    }
  });

  fetch(`/delete-questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      test_id: test_id,
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

function showModal2(){
  const modal = document.getElementById('modal-sam2')
  const add_user = document.getElementById('add-question')
  const modal_button = document.getElementById('modal-button')

  add_user.disabled = true;
  modal_button.disabled = true;

  modal.classList.remove('hidden');
  modal.classList.add('flex')
}

document.getElementById('hide-modal2').addEventListener('click', (e) => {
  e.preventDefault();
  const modal = document.getElementById('modal-sam2')
  const add_user = document.getElementById('add-question')
  const modal_button = document.getElementById('modal-button')

  add_user.disabled = false;
  modal_button.disabled = false;

  modal.classList.remove('flex');
  modal.classList.add('hidden')
})