import { useOfficers, getOfficers } from "./OfficerProvider.js";

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "arrestingOfficerSelect") {
        // Get the name of the selected officer
        console.log("OfficerSelect: User chose an officer option")
        // Define a custom event
        const officerSelectedEvent = new CustomEvent("officerSelected", {
            detail: {
                officerName: changeEvent.target.value
            }
        })
        console.log("Dispatch custom officerSelected event")
        // Dispatch event to event hub
        eventHub.dispatchEvent(officerSelectedEvent)
    }
})

const render = (officersCollection) => { 
    console.log("OfficerSelect: Officer select rendered to DOM")
    contentTarget.innerHTML = `
        <select class="dropdown" id="arrestingOfficerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officersCollection.map(
                    officerObj => {
                        return `<option value="${officerObj.name}">${officerObj.name}</option>`
                    }
                ).join("") //prevents "," from showing up. (makes outcome a string instead of an array)
            }
        </select>
        `
}

export const OfficerSelect = () => {
    console.log("OfficerSelect: Initial render of officer select")
        getOfficers().then(() => {

            const officers = useOfficers()
            
            render(officers)
        })

}
