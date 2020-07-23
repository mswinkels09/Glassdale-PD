import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTMLConverter } from './CriminalHTMLConverter.js'

const contentTarget = document.querySelector(".criminalsContainer")

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            let criminalHTMLRepresentations = ""
            criminalArray.forEach(criminal => {
                criminalHTMLRepresentations += CriminalHTMLConverter(criminal)
            })
            contentTarget.innerHTML = `
                <h2 class="criminals__title">Convicted Criminals</h2>
                <section class="criminals">
                    ${criminalHTMLRepresentations}
                </section>`
        })
}