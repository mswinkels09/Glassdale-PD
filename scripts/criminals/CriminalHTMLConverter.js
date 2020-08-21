
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("criminal__alibiButton")) {
        const [prompt, criminalId] = clickEvent.target.id.split("--")

        const alibiEvent = new CustomEvent("associatesClicked", {
            detail: {
                chosenCriminal: criminalId
            }
        })

        eventHub.dispatchEvent(alibiEvent)
    } else if (clickEvent.target.id === "associateCloseButton") {
        const modalElement = clickEvent.target.parentNode
        modalElement.close()
    }
})

export const CriminalHTMLConverter = (criminalObj, facilities) => {
    return `
    <article class="criminal__info">
        <section class="criminal__name">${criminalObj.name}</section>
        <section class="criminal__age">Age: ${criminalObj.age}</section>
        <section class="criminal__crime">Crime: ${criminalObj.conviction}</section>
        <section class="criminal__termStart">Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</section>
        <section class="criminal__termEnd">Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</section>
        <ul>
            ${
                facilities.map((facility) => {
                    return `<li>${facility.facilityName}</li>`
                }).join("")
            }
        </ul>
        <button id="criminal__alibiButton--${criminalObj.id}">Alibis</button>
    </article>
`
}