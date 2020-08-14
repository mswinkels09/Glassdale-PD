import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./NoteHTMLConverter.js";
import { useCriminals } from "../criminals/CriminalProvider.js"

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

const render = (notes) => {
    const criminals = useCriminals()

    contentTarget.innerHTML = notes.reverse().map(
        (noteObject) => {
            //.find the criminal the note is about
            const foundCriminal = criminals.find(
                (criminalObject) => {
                    return criminalObject.id === noteObject.criminalId
                }
            )
            //Send criminal to the html converter
            return NoteHTMLConverter(noteObject, foundCriminal)
        }
    ).join("")
}

export const NoteList = () => {
    getNotes()
        .then(useNotes)
        .then(render)
}

eventHub.addEventListener("NotesButtonClicked", customEvent => {
    NoteList()
})

eventHub.addEventListener("noteStateChanged", () => {
    const newNotes = useNotes()
    render(newNotes)
})


            

