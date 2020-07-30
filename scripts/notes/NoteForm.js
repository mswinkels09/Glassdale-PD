import { saveNote } from "./NoteDataProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {

    if(clickEvent.target.id === "saveNote") {
        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")

        // Make a new object representation of a note
        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            content: noteContent.value,
            timestamp: Date.now()
        }
        // Change API state and application state
        saveNote(newNote)
    }
})


const render = () => {
    contentTarget.innerHTML = `
    <section class="noteForm">
        <input type="text" id="note--title"  placeHolder="Enter title of note.."/>
        <input type="text" id="note--author" placeHolder="Enter your name..." />
        <textarea id="note--content" placeHolder="Enter note content here..."></textarea>

        <button id="saveNote">Save Note</button>
    </section>
    `
}

export const NoteForm = () => {
    render()
}