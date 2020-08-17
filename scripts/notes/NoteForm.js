import { saveNote } from "./NoteDataProvider.js";
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {

    if(clickEvent.target.id === "saveNote") {

        // const [prefix, criminalId] = clickEvent.target.id.split("--")

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")
        const noteCriminal = document.querySelector("#note--criminal")

        const criminalId = parseInt(noteCriminal.value)

    if(criminalId !== 0) {
        
        
        // Make a new object representation of a note
        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            criminalId: parseInt(noteCriminal.value),
            content: noteContent.value,
            timestamp: Date.now()
        }
        // Change API state and application state
        saveNote(newNote)
    }
    else {
        window.alert("Please choose a criminal.")
    }
    }
})


export const NoteForm = () => {
    getCriminals()
        .then(() => {
            const criminals = useCriminals()
            render(criminals)
        })
}

const render = (criminals) => {
    contentTarget.innerHTML = `
    <section class="noteForm">
        <input type="text" id="note--title" class="noteFormTitle" placeHolder="Enter title of note..."/>
        <select id="note--criminal" class="criminalSelect">
        <option class="noteCriminalSelected" value="0">Select criminal..</option>
        ${
            criminals.map(
                (criminalObject) => {
                    return `<option class="noteCriminalSelected" value="${criminalObject.id}">
                    ${criminalObject.name}
                    </option>`
                    
                }
                )
            }
            
            </select>
            <textarea id="note--content" class="noteFormContent" placeHolder="Enter note content here..."></textarea>           
            <input type="text" id="note--author" class="noteFormAuthor" placeHolder="Enter your name..." />
        <button id="saveNote" class="saveNote">Save Note</button>
    </section>
            `
}
        /* can also be written like
             criminals.map(criminalObject => `<option value="criminal--${criminal.id}">${criminalObject.name}</option>)
        */