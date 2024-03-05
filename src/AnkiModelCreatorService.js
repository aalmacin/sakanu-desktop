import css from './note.css';
import AnkiConnectService from "./AnkiConnectService";

class AnkiModelCreatorService {
    getModels = () => {
        return AnkiConnectService.sendReq('modelNames', 'POST').then(response => {
            console.log('Model Response:', response)
            return response.json();
        });
    }
    createModel = () => {
        return AnkiConnectService.sendReq('createModel', 'POST', {}, {
            modelName: 'Sakanu',
            inOrderFields: ["Text", "Extra", "purpose", "simpleExplanation", "questions", "relatedTerms", "categories"],
            css,
            isCloze: true,
            cardTemplates: [
                {
                    Name: "Sakanu",
                    Front: "<div class='front'>{{cloze:Text}}</div>",
                    Back: "<div class='back'><div class='back-front'>{{cloze:Text}}</div><div class='description'>{{Extra}}</div><h2 class='simpleExplanationHeader'>Simple Explanation</h2><div class='simpleExplanation'>{{simpleExplanation}}</div><h2 class='purposeHeader'>Purpose</h2><div class='purpose'>{{purpose}}</div><h2 class='questionsHeader'>Questions</h2><div class='questions'>{{questions}}</div><h2 class='relatedTermsHeader'>Related Terms</h2><div class='relatedTerms'>{{relatedTerms}}</div><h2 class='categoriesHeader'>Categories</h2><div class='categories'>{{categories}}</div></div>"
                }
            ]
        });
    }
}

export default new AnkiModelCreatorService();