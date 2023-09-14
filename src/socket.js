// Connect to the Socket.IO server
let socket;

// Store the users in separate variables
let lobbyUsers = [];
let takenUsers = [];

// Store the currently taken user ID
let takenUserID = "";

// Handle form submission for authentication
document.getElementById("auth-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const roleInput = document.getElementById("role-input");
  const userIDInput = document.getElementById("userID-input");
  const usernameInput = document.getElementById("username-input");

  const role = roleInput.value.trim();
  const userID = userIDInput.value.trim();
  const username = usernameInput.value.trim();

  if (role && userID && username) {
    // Connect to the Socket.IO server with authentication data in the handshake
    socket = io("https://api.investkori.com", {
      auth: {
        role,
        userID,
        username,
      },
    });

    // Handle 'connect' event
    socket.on("connect", () => {
      console.log("Connected to server");
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("message-form").style.display = "block";
    });

    // Handle 'session' event
    socket.on("session", (sessionData) => {
      const { sessionID, userID } = sessionData;
      socket.sessionID = sessionID;
      socket.userID = userID;
    });

    // Handle 'users' event
    socket.on("users", (users) => {
      console.log("Users:", users);
      lobbyUsers = users.lobby;
      takenUsers = users.taken;
      displayUsers();
    });

    // Handle 'user connected' event
    socket.on("user connected", (userData) => {
      console.log("User connected:", userData);
      const { userID } = userData;
      // Add the connected user to the lobbyUsers array
      const userIndex = lobbyUsers.findIndex((user) => user.userID === userID);
      if (userIndex === -1) {
        lobbyUsers.push(userData);
      } else {
        lobbyUsers[userIndex].connected = true;
      }
      displayUsers();
    });

    // Handle 'private message' event
    socket.on("private message", (message) => {
      console.log("Private message:", message);
      // Display the received message in the conversation
      displayMessage(message);
    });

    // Handle form submission for sending messages
    // document.getElementById('message-form').addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   const messageInput = document.getElementById('message-input');
    //   const message = messageInput.value.trim();

    //   if (message) {
    //     if (takenUserID) {
    //       // Emit 'private message' event to the server for the taken user
    //       socket.emit('private message', { content: message, to: takenUserID });
    //     }
    //     messageInput.value = '';
    //     // Display the sent message in the conversation
    //     displayMessage({ content: message, from: socket.userID, to: takenUserID, date: Date.now() });
    //   }
    // });

    document.getElementById("message-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const messageInput = document.getElementById("message-input");
      const message = messageInput.value.trim();

      if (message) {
        // If the user is an admin, the recipient is the taken user
        const recipientID =
          isAdminUser() && takenUserID ? takenUserID : socket.userID;
        // Emit 'private message' event to the server for the recipient
        socket.emit("private message", { content: message, to: recipientID });

        messageInput.value = "";
        // Display the sent message in the conversation
        displayMessage({
          content: message,
          from: socket.userID,
          to: takenUserID,
          date: Date.now(),
        });
      }
    });

    // Handle 'user disconnected' event
    socket.on("user disconnected", (userID) => {
      console.log("User disconnected:", userID);
      // Update the connected status of the user in the lobbyUsers array
      const userIndex = lobbyUsers.findIndex((user) => user.userID === userID);
      if (userIndex !== -1) {
        lobbyUsers[userIndex].connected = false;
        displayUsers();
      }
    });

    // Handle 'disconnect' event
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }
});

// Display the users in the tables
function displayUsers() {
  displayLobbyUsers();
  displayTakenUsers();
}

// Display lobby users in the table
function displayLobbyUsers() {
  const lobbyTableBody = document
    .getElementById("lobby-table")
    .getElementsByTagName("tbody")[0];
  lobbyTableBody.innerHTML = "";

  lobbyUsers.forEach((user) => {
    const { userID, username, connected } = user;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${userID}</td>
      <td>${username}</td>
      <td>${connected ? "Connected" : "Disconnected"}</td>
      <td><button class="take-btn" data-user-id="${userID}">Take</button></td>
    `;
    lobbyTableBody.appendChild(row);
  });

  // Add event listeners to take buttons
  const takeButtons = document.getElementsByClassName("take-btn");
  Array.from(takeButtons).forEach((button) => {
    button.addEventListener("click", (e) => {
      const userID = e.target.getAttribute("data-user-id");
      console.log("Taking user:", userID);
      // Take the user and set the takenUserID
      takeUser(userID);
    });
  });
}

// Display taken users in the table
function displayTakenUsers() {
  const takenTableBody = document
    .getElementById("taken-table")
    .getElementsByTagName("tbody")[0];
  takenTableBody.innerHTML = "";

  takenUsers.forEach((user) => {
    const { userID, username, connected } = user;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${userID}</td>
      <td>${username}</td>
      <td>${connected ? "Connected" : "Disconnected"}</td>
      <td><button class="respond-btn" data-user-id="${userID}">Respond</button></td>
    `;
    takenTableBody.appendChild(row);
  });

  // Add event listeners to respond buttons
  const respondButtons = document.getElementsByClassName("respond-btn");
  Array.from(respondButtons).forEach((button) => {
    button.addEventListener("click", (e) => {
      const userID = e.target.getAttribute("data-user-id");
      console.log("Responding to user:", userID);
      // Set the takenUserID to the selected user ID
      takenUserID = userID;
      // Display the conversation with the selected user
      displayConversation(userID);
    });
  });
}

// Take a user
function takeUser(userID) {
  // Set the takenUserID to the selected user ID
  takenUserID = userID;
  // Remove the user from the lobbyUsers array
  const userIndex = lobbyUsers.findIndex((user) => user.userID === userID);
  if (userIndex !== -1) {
    const takenUser = lobbyUsers.splice(userIndex, 1)[0];
    takenUsers.push(takenUser);
  }
  displayUsers();
  // Display the conversation with the taken user
  displayConversation(userID);
}

// Display the conversation with the user
function displayConversation(userID) {
  const conversationContainer = document.getElementById(
    "conversation-container"
  );
  const messagesDiv = document.getElementById("messages");

  // Hide the lobby and taken tables
  document.getElementById("lobby-container").style.display = "none";
  document.getElementById("taken-container").style.display = "none";

  // Show the conversation container and clear the messages
  conversationContainer.style.display = "block";
  messagesDiv.innerHTML = "";

  const userMessages =
    takenUsers.find((user) => user.userID === userID)?.messages || [];
  userMessages.forEach((message) => {
    displayMessage(message);
  });

  // Show the message form
  document.getElementById("message-form").style.display = "block";
}

// Display a message in the conversation
function displayMessage(message) {
  const messagesDiv = document.getElementById("messages");
  const { content, from, to } = message;

  const messageP = document.createElement("p");
  messageP.innerHTML = `<strong>${from}</strong>: ${content}`;
  messagesDiv.appendChild(messageP);
}

// Check if the current user is an admin
function isAdminUser() {
  return socket.auth && socket.auth.role === "admin";
}
