let witnesses = []

export const useWitnesses = () => {
    return witnesses.slice() }

export const getWitnesses = () => {
        /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `convictions`
        variable to what is in the response from the API.
        */
    return fetch("https://criminals.glassdale.us/witnesses")
        .then(response => response.json())
        .then(parsedWitnesses => {
                witnesses = parsedWitnesses
            })
}
