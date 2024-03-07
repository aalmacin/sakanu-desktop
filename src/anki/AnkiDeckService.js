import AnkiConnectService from "./AnkiConnectService";

class AnkiDeckService {
    getDecks() {
        return AnkiConnectService.sendReq('deckNames', 'POST');
    }

    createDeck(deckName) {
        return AnkiConnectService.sendReq('createDeck', 'POST', {}, {deck: deckName});
    }
}

export default new AnkiDeckService();