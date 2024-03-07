import AnkiConnectService from "./AnkiConnectService";

class AnkiNoteService {
    addNote = (deckName, termResponse) => {
        const convertQuestionsToHtmlList = questions => {
            if (!questions || !questions.length) return "";
            return `<div class="question-li">${questions.map(question => `<div class="question">${question.question}</div><div class="answer">${question.answer}</div>`).join('')}</div>`;
        }

        const convertToHtmlList = items => {
            if (!items || !items.length) return "";
            return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }

        return AnkiConnectService.sendReq('addNote', 'POST',{}, {
            note: {
                deckName: deckName,
                modelName: 'Sakanu',
                fields: {
                    Text: termResponse.cloze,
                    Extra: termResponse.description,
                    purpose: termResponse.purpose,
                    simpleExplanation: termResponse.simpleExplanation,
                    questions: convertQuestionsToHtmlList(termResponse.questions),
                    relatedTerms: convertToHtmlList(termResponse.relatedTerms),
                    categories: convertToHtmlList(termResponse.categories)
                },
                options: {
                    allowDuplicate: false
                }
            }
        });

    }
}

export default new AnkiNoteService();