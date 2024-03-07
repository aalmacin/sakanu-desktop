class AnkiConnectService {
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

export default new AnkiConnectService();