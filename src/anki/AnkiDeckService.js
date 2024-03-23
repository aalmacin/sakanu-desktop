import AnkiConnectService from "./AnkiConnectService";

class AnkiDeckService {
    getDecks() {
        return AnkiConnectService.sendReq('deckNames', 'POST');
    }

    createDeck(deckName) {
        return AnkiConnectService.sendReq('createDeck', 'POST', {}, {deck: deckName});
    }
}

const ankiDeckService = new AnkiDeckService();
export default ankiDeckService;