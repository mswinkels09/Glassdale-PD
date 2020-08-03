import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".criminal")

// On the event hub, listen for a "change" event.
contentTarget.addEventListener("click", (event) => {

        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("alibiChosen", {
            detail: {
                known_associatesId: event.target.value
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    })


const render = alibisCollection => {

   contentTarget.innerHTML = `
        <div class="alibis" id="associates">
            ${
                alibisCollection.find(
                    alibiObj => {
                        return `<option value="${alibiObj.Id}>${alibiObj.name}</option>`
                    }
                )
            }
        </select>
    `
}

export const AlibiSelect = () => {
    getCriminals().then(() => {
        // Get all convictions from application state
        const criminals = useCriminals()
        
        render(criminals)
    })
    

}