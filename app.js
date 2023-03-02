const form = document.querySelector("#chat-form");
const messages = document.querySelector("#messages");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const messageInput = document.querySelector("#message-input");
  const message = messageInput.value;

  if (message.trim() === "") {
    return;
  }

  addMessage(message, "user");
  messageInput.value = "";

  fetch("/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((data) => {
      const response = data.fulfillmentText;
      console.log("response");
      console.log(response);
      addMessage(response, "bot");
    });
});

function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.innerText = message;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}
