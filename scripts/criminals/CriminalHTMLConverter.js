export const CriminalHTMLConverter = (criminalObj) => {
    return `
    <article class="criminal__info">
        <section class="criminal__name">${criminalObj.name}</section>
        <section class="criminal__age">Age: ${criminalObj.age}</section>
        <section class="criminal__crime">Crime: ${criminalObj.conviction}</section>
        <section class="criminal__termStart">Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</section>
        <section class="criminal__termEnd">Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</section>
    </article>
`
}