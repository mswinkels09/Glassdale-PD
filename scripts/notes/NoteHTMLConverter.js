export const NoteHTMLConverter = (noteObject, criminalObject) => {
    return `
        <section class="note">
            <div class="note--title"><strong> ${ noteObject.title }</strong></div>
            <div class="note--criminal">Criminal: ${ criminalObject.name }</div>
            <div class="note--content">${ noteObject.content }</div>
            <div class="note--author">Author: ${ noteObject.author }</div>
            <div class="note--timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
        </section>
    `
}