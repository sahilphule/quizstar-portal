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

function showModal(event, id) {
  event.stopPropagation();
  const modal = document.getElementById("modal-sam");

  modal.setAttribute("data-id", id);
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
  e.preventDefault();
  const modal = document.getElementById("modal-sam");

  const id = parseInt(modal.getAttribute("data-id"));
  window.location.href = `/delete-test/${id}`;
});

