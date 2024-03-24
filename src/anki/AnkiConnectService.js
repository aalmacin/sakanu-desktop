class AnkiConnectService {
    requestPermission() {
        return fetch(process.env.REACT_APP_ANKI_CONNECT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'requestPermission',
                version: 6
            })
        });
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

}

const ankiConnectService = new AnkiConnectService();
export default ankiConnectService;