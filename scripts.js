const cardContainer = document.querySelector(".card-container");
const addLeadButton = document.getElementById("add-lead-button");
const phoneInput = document.getElementById("phone");

// Fetch data from the JSON file and display initial cards
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network request failed, call support");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => createCard(item));
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Function to create and display a card
function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Apply colors based on the lead category
  if (item.lead === "hot") {
    card.style.borderColor = "green";
    card.style.boxShadow = "0 4px 10px rgba(0, 128, 0, 0.5)";
  } else if (item.lead === "cold") {
    card.style.borderColor = "blue";
    card.style.boxShadow = "0 4px 10px rgba(0, 0, 255, 0.5)";
  } else if (item.lead === "reference") {
    card.style.borderColor = "yellow";
    card.style.boxShadow = "0 4px 10px rgba(255, 255, 0, 0.5)";
  }

  // Add card content
  const name = document.createElement("h2");
  name.textContent = item.name;

  const email = document.createElement("p");
  email.textContent = `Email: ${item.email}`;

  const address = document.createElement("p");
  address.textContent = `Address: ${item.address}`;

  const phone = document.createElement("p");
  phone.textContent = `Phone: ${item.phone}`;

  const lead = document.createElement("p");
  lead.textContent = `Lead: ${item.lead}`;

  const timestamp = document.createElement("p");
  timestamp.textContent = `Created: ${item.created}`;

  // Add a delete button (hidden by default)
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.style.display = "none"; // Initially hidden

  // Add delete functionality with confirmation
  deleteButton.addEventListener("click", () => {
    const confirmationDialog = document.createElement("div");
    confirmationDialog.classList.add("confirmation-dialog");

    const confirmationText = document.createElement("p");
    confirmationText.textContent = "Are you sure you wish to delete this lead?";

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.classList.add("yes-button");

    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.classList.add("no-button");

    yesButton.addEventListener("click", () => {
      cardContainer.removeChild(card);

      fetch("http://localhost:3000/delete-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.name }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data.message));

      document.body.removeChild(confirmationDialog);
    });

    noButton.addEventListener("click", () => {
      document.body.removeChild(confirmationDialog);
    });

    confirmationDialog.appendChild(confirmationText);
    confirmationDialog.appendChild(yesButton);
    confirmationDialog.appendChild(noButton);
    document.body.appendChild(confirmationDialog);
  });

  card.addEventListener("mouseenter", () => {
    deleteButton.style.display = "block";
  });

  card.addEventListener("mouseleave", () => {
    deleteButton.style.display = "none";
  });

  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(address);
  card.appendChild(phone);
  card.appendChild(lead);
  card.appendChild(timestamp);
  card.appendChild(deleteButton);
  cardContainer.appendChild(card);
}

// Handle adding a new lead
addLeadButton.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const lead = document.getElementById("lead").value;
  const created = new Date().toLocaleString();

  if (!/^[0-9]{8}$/.test(phone)) {
    alert("Phone number must be exactly 8 digits.");
    return;
  }

  const newLead = { name, email, address, phone, lead, created };

  fetch("http://localhost:3000/add-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLead),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.message));

  createCard(newLead);
  document.getElementById("add-lead-form").reset();
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
  if (phoneInput.value.length > 8) {
    phoneInput.value = phoneInput.value.slice(0, 8);
  }
});
