/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
contentTarget.addEventListener("change", (event) => {

    // Only do this if the `crimeSelect` element was changed
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeId: event.target.value,
                crimeName: event.target.innerHTML
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    })


const render = convictionsCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
   contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(
                    convictionObject => {
                        return `<option value="${ convictionObject.id }">${convictionObject.name}</option>`
                    }
                ).join("") //prevents "," from showing up. (makes outcome a string instead of an array)
            }
        </select>
    `
}

export const ConvictionSelect = () => {
    getConvictions().then(() => {
        // Get all convictions from application state
        const convictions = useConvictions()
        
        render(convictions)
    })
    

}

