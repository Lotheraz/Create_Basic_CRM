This was made entirely for learning purposes. 

A simple and basic Customer Relationship Management (CRM) system built using HTML, CSS, JavaScript, and Node.js. This project provides a minimalistic interface to manage customer leads, showcasing the following functionalities:
Add New Leads: Users can input customer information, including name, email, address, phone number, lead type (hot, cold, reference), and a timestamp for when the lead was created.
Delete Leads: Users can delete customer leads directly from the interface with a confirmation prompt.
Lead Categorization: Leads are categorized as "hot," "cold," or "reference," with corresponding visual cues (e.g., colored borders for each type).
Persistent Storage: Data is stored in a data.json file, enabling the system to retain all lead information between sessions.
Dynamic Updates: The interface dynamically updates when leads are added or deleted, without needing to reload the page.

Features

Add Customer Leads
Input customer details such as: ( json structure) 
        Name
        Email
        Address
        Phone Number
        Lead Type (hot, cold, reference)
        Each lead is timestamped when created.

Delete Customer Leads
Hover over any lead to reveal the delete option. A confirmation prompt ensures accidental deletions are avoided.

Lead Categorization
Visual differentiation of leads using color-coded cues:
Hot Leads: Green border
Cold Leads: Blue border
Reference Leads: Yellow border

Persistent Storage
Data is saved to a data.json file, ensuring all lead information is retained.

Interactive UI
Built with HTML and CSS for a clean, simple design.
Dynamically managed with JavaScript to update the interface seamlessly.

Backend Functionality
Powered by a lightweight Node.js server to handle data operations.
Supports adding and deleting leads via API endpoints.
