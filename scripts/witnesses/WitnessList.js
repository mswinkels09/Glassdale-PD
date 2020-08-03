import { getWitnesses, useWitnesses } from "./WitnessProvider.js";
import { WitnessHTMLConverter } from "./WitnessHTMLConverter.js";

const contentTarget = document.querySelector(".witnessListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("WitnessButtonClicked", customEvent => {
    WitnessList()
})
const render = (witnessArray) => {
    contentTarget.innerHTML = `
        <aside class="witness--container">
            <h2 class="witness--header">Witnesses</h2>
            <article class="witnessList">
            ${ 
                witnessArray.map(
                (currentWitness) => {
                    return WitnessHTMLConverter(currentWitness)
                }
                ).join("")
            }   
            </article>
        </aside> `

    
}

export const WitnessList = () => {
    getWitnesses()
        .then(() => {
            const allWitnesses = useWitnesses()
            render(allWitnesses)
        })
}
