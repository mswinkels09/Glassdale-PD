import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./NoteHTMLConverter.js";

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("NotesButtonClicked", customEvent => {
    NoteList()
})

export const NoteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}

const render = (noteArray) => {
    contentTarget.innerHTML = `
        <aside class="note--container">
            <h2 class="note--header"> Notes </h2>
            <article class="noteList">
            ${
                noteArray.map(
                (currentNote) => {
                    return NoteHTMLConverter(currentNote)
                }
                ).join("")
            }
            </article>
                
        </aside> `

}


//renders notes list after you click the save note button
// eventHub.addEventListener("noteStateChanged", () => {
//     const newNotes = useNotes()
//     render(newNotes)
// })