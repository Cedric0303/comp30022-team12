// Creates an options object with the user's clients info
export function clientsToOptions(clients) {
    var clientOptions = [];
    if (clients) {
        clients.map((client) =>
            clientOptions.push({
                value: client,
                label: client.firstName + " " + client.lastName,
            })
        );
        return clientOptions;
    }
}
