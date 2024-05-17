
export class SakanuApi {
    token;
    constructor(token) {
        this.token = token;
        this.baseUrl = process.env.REACT_APP_API_URL;
    }

    async learn(domain, term) {
        const response = await fetch(`${this.baseUrl}/learn/${domain}/${term}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        });
        console.log('Learn Response:', response);
        return response.json();
    }

    async getTerms(page) {
        const response = await fetch(`${this.baseUrl}/terms?page=${page}&size=50`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        });
        return response.json();
    }

    async getTerm(termId) {
        const response = await fetch(`${this.baseUrl}/terms/term/${termId}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        });
        return response.json();
    }

    async deleteTerm(termId) {
        const response = await fetch(`${this.baseUrl}/terms/term/${termId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        });
        return response.json();
    }
}