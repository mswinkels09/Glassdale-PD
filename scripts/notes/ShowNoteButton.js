const contentTarget = document.querySelector(".noteListButton")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showNotes") {
        const customEvent = new CustomEvent("NotesButtonClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

export const NotesButton = () => {
    contentTarget.innerHTML =  `
    <button id="showNotes">Show Me the Notes</button>
    `
}
