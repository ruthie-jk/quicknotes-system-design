
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// HTML elements
const loadButton = document.getElementById("load-btn");
const statusMessage = document.getElementById("status");
const notesList = document.getElementById("notes-list");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitButton = document.getElementById("submit-btn");

// Reusable function for API requests
async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    return response.json();
}

// Display one note on the page
function displayNote(note) {
    const listItem = document.createElement("li");
    listItem.dataset.id = note.id;

    const title = document.createElement("h3");
    title.textContent = note.title;

    const body = document.createElement("p");
    body.textContent = note.body;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => deleteNote(note.id, listItem));

    listItem.appendChild(title);
    listItem.appendChild(body);
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
}

// GET: Load notes from the API
async function loadNotes() {
    loadButton.disabled = true;
    statusMessage.textContent = "Loading notes...";
    notesList.textContent = "";

    try {
        const notes = await request(`${API_URL}?_limit=10`);

        if (notes.length === 0) {
            statusMessage.textContent = "No notes found.";
            return;
        }

        notes.forEach(displayNote);

        statusMessage.textContent =
            `Loaded ${notes.length} notes from the server.`;

    } catch (error) {
        statusMessage.textContent =
            "Sorry, we couldn't load your notes. Please try again.";
        console.error("Loading notes failed:", error);

    } finally {
        loadButton.disabled = false;
    }
}

// POST: Create a new note
noteForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
        statusMessage.textContent =
            "Please enter both a title and note content.";
        return;
    }

    if (title.length > 100) {
        statusMessage.textContent =
            "The title must not exceed 100 characters.";
        return;
    }

    const newNote = {
        title: title,
        body: body,
        userId: 1
    };

    submitButton.disabled = true;
    statusMessage.textContent = "Creating your note...";

    try {
        // JSONPlaceholder simulates POST requests; it does not permanently save data.
        const createdNote = await request(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        });

        displayNote(createdNote);

        statusMessage.textContent =
            `Note created (status 201, id ${createdNote.id}).`;

        noteForm.reset();

    } catch (error) {
        statusMessage.textContent =
            "Sorry, we couldn't create your note. Please try again.";
        console.error("Creating note failed:", error);

    } finally {
        submitButton.disabled = false;
    }
});

// DELETE: Remove a note
async function deleteNote(id, listItem) {
    statusMessage.textContent = "Deleting note...";

    try {
        await request(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        listItem.remove();
        statusMessage.textContent = "Note deleted successfully.";

    } catch (error) {
        statusMessage.textContent =
            "Sorry, we couldn't delete this note. Please try again.";
        console.error("Deleting note failed:", error);
    }
}

// Event listener for loading notes
loadButton.addEventListener("click", loadNotes);
