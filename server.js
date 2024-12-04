const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Debugging middleware to log requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body:", req.body);
  } else {
    console.log("No body in the request");
  }
  next();
});

// Endpoint to add a new lead
app.post("/add-lead", (req, res) => {
  const newLead = req.body;

  // Input validation
  if (
    !newLead ||
    !newLead.name ||
    !newLead.email ||
    !newLead.address ||
    !newLead.phone ||
    !newLead.lead ||
    !newLead.created
  ) {
    console.error("Invalid input received:", newLead);
    return res.status(400).json({
      error:
        "Invalid input. All fields (name, email, address, phone, lead, created) are required.",
    });
  }

  // Read current leads from data.json
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    // Parse current leads and add the new lead
    let leads = [];
    try {
      leads = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing data.json:", parseErr);
    }
    leads.push(newLead);

    // Write updated leads back to data.json
    fs.writeFile("data.json", JSON.stringify(leads, null, 2), (err) => {
      if (err) {
        console.error("Error writing to data.json:", err);
        return res
          .status(500)
          .json({ error: "Failed to save new lead to file" });
      }

      console.log("Successfully added new lead:", newLead);
      res.json({ message: "Lead added successfully" });
    });
  });
});

// Endpoint to delete a lead
app.post("/delete-lead", (req, res) => {
  const { name } = req.body;

  if (!name) {
    console.error("Invalid input: name is required to delete a lead");
    return res
      .status(400)
      .json({ error: "Name is required to delete a lead." });
  }

  // Read current leads from data.json
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }

    // Filter out the lead with the specified name
    let leads = [];
    try {
      leads = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing data.json:", parseErr);
    }
    const updatedLeads = leads.filter((lead) => lead.name !== name);

    // Write updated leads back to data.json
    fs.writeFile("data.json", JSON.stringify(updatedLeads, null, 2), (err) => {
      if (err) {
        console.error("Error writing to data.json:", err);
        return res
          .status(500)
          .json({ error: "Failed to delete lead from file" });
      }

      console.log(`Successfully deleted lead with name: ${name}`);
      res.json({ message: "Lead deleted successfully" });
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
