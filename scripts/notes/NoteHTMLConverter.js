export const NoteHTMLConverter = (noteObject, criminalObject) => {
    return `
        <section class="note">
            <div class="note--title"><strong> ${ noteObject.title }</strong></div>
            <div class="note--criminal"><strong><em>Criminal:</strong></em> ${ criminalObject.name }</div>
            <div class="note--content">${ noteObject.content }</div>
            <div class="note--author"><strong><em>Author:</strong></em> ${ noteObject.author }</div>
            <div class="note--timestamp"><strong><em>Timestamp:</strong></em> ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
        </section>
    `
}