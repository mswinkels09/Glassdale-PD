import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTMLConverter } from './CriminalHTMLConverter.js'
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { AssociatesDialog } from "./AlibiSelect.js";
import { getFacilities, useFacilities } from "../facilities/FacilityProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facilities/CriminalFacilityProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

let criminals = []
let criminalFacilities = []
let facilities = []

const chosenFilters = {
    crime: "0",
    officer: "0"
}



// Listen for the custom event you dispatched in ConvictionSelect


export const CriminalList = () => {
    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {
            criminals = useCriminals()
            facilities = useFacilities()
            criminalFacilities = useCriminalFacilities()
            render()
        })
}

const render = () => {
    
    // criminalCollection.forEach( criminal => {
    //     criminalHTMLRepresentations += CriminalHTMLConverter(criminal)
    // })
    
    const criminalCollection = criminals.map(
        (criminal) => {
            // Get all of the criminal/facility relationships for this criminal
            const criminalFacilityRelationships = criminalFacilities.filter(
                (criminalFacility) => {
                    return criminal.id === criminalFacility.criminalId
                }
                )
            // Convert the relationship objects to facility objects
            const matchingFacilities = criminalFacilityRelationships.map(
                (relationshipBetweenFacilityAndCriminal) => {
                    return facilities.find((facility) => {
                        return relationshipBetweenFacilityAndCriminal.facilityId === facility.id
                    })
                }
            )
            return CriminalHTMLConverter(criminal, matchingFacilities)
        }
    )
    
    contentTarget.innerHTML = 
    `<h2 class="criminals__title">Convicted Criminals</h2>
    <section class="criminals">
    <div class="criminal">${criminalCollection.join("")}</div>
    </section>
        ${AssociatesDialog()}
        `
    }

const filterCriminals = () => {
    criminals = useCriminals()
    const arrayOfCrimes = useConvictions()
    if (chosenFilters.crime !== "0") {
        const matchingCrimes = arrayOfCrimes.find(
            (crime) => {
                return parseInt(chosenFilters.crime) === crime.id
            }
        )
        criminals = criminals.filter(
            (criminalFilteredObject) => {
                return matchingCrimes.name === criminalFilteredObject.conviction
            }
        )           
    }
    if (chosenFilters.officer !== "0") {
        criminals = criminals.filter(
            (criminalObject) => {
                if (criminalObject.arrestingOfficer  === chosenFilters.officer){
                    return true
                }
                return false
            }
        )
    }    
}

eventHub.addEventListener('officerSelected', (event) => {
    console.log("CriminalList: Custom officerSelected event heard on event hub")
    // How can you access the officer name that was selected by the user?
    chosenFilters.officer = event.detail.officerName
    filterCriminals()
    render()
})

eventHub.addEventListener('crimeChosen', crimeSelectedEvent => {
    console.log("CriminalList: Custom crimeSelected event heard on event hub")
    // You remembered to add the id of the crime to the event detail, right?

    chosenFilters.crime = crimeSelectedEvent.detail.crimeId
    filterCriminals()
    render()
    }
)
    

    // Render ALL criminals initally