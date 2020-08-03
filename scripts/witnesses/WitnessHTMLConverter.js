export const WitnessHTMLConverter = (witnessObject) => {
    return `
        <section class="witnessNote">
            <div class="witness--name"><strong> ${ witnessObject.name }</strong></div>
            <div class="witness--statement">${ witnessObject.statements }</div>
        </section>
    `
}