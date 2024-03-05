import AnkiModelCreatorService from "./AnkiModelCreatorService";

class AnkiConnectService {
    getDecks() {
        return this.sendReq('deckNames', 'POST');
    }

    sendReq(action, method, headers = {}, params = {}) {
        return fetch(process.env.REACT_APP_ANKI_CONNECT_URL, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify({
                action,
                version: 6,
                params
            })
        });
    }

    modelExists() {
        return AnkiModelCreatorService.getModels().then(models => {
            console.log('Models:', models);
            return models && models.result && models.result.includes('Sakanu');
        });
    }
}

export default new AnkiConnectService();