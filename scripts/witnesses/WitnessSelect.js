const contentTarget = document.querySelector(".witnessListButton")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showWitnesses") {
        const customEvent = new CustomEvent("WitnessButtonClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

export const WitnessButton = () => {
    contentTarget.innerHTML =  `
    <button id="showWitnesses" class="witnessesButton">Show Me the Witnesses</button>
    `
}