import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTMLConverter } from './CriminalHTMLConverter.js'
import { useConvictions } from "../convictions/ConvictionProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")


// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', crimeSelectedEvent => {
    // You remembered to add the id of the crime to the event detail, right?
    const crimeThatWasSelected = crimeSelectedEvent.detail.crimeId
    //Get the crime name that matches the id
    const arrayOfCrimes = useConvictions()
     const matchingCrimes = arrayOfCrimes.find(
         (crime) => {
         return crimeThatWasSelected === crime.name
        })
        /*Filter the criminals application state down to the people that committed the crime*/

    const allCriminals = useCriminals()

    const filteredCriminals = allCriminals.filter(
        (criminalFilteredObject) => {

            return matchingCrimes.name === criminalFilteredObject.conviction
        }
    )
        /*Then invoke render() and pass the filtered collection as
            an argument*/
       render(filteredCriminals)
    }
)

eventHub.addEventListener('officerSelected', (officerSelectedEvent) => {
    console.log("CriminalList: Custom officerSelected event heard on event hub")
    // How can you access the officer name that was selected by the user?
    const officerChosen = officerSelectedEvent.detail.officerName

    // How can you get the criminals that were arrested by that officer?
    const criminals = useCriminals()
    const filteredOfficers = criminals.filter(
        (criminalObject) => {
            return criminalObject.arrestingOfficer  === officerChosen
            
        }
    )
    render(filteredOfficers)
})


const render = (criminalCollection) => {
    let criminalHTMLRepresentations = ""

    criminalCollection.forEach(criminal => {
        criminalHTMLRepresentations += CriminalHTMLConverter(criminal)
    })

    contentTarget.innerHTML = 
            `<h2 class="criminals__title">Convicted Criminals</h2>
            <section class="criminals">
                ${criminalHTMLRepresentations}
            </section>`
}


// Render ALL criminals initally
export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminals = useCriminals()
            render(criminals)
        })
}