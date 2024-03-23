import AnkiConnectService from "./AnkiConnectService";

const css = `
.back, .front {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f4f8;
    color: #333;
    padding: 20px;
    margin: 0;
    height: 100vh;
    overflow-y: auto;
}

.front, .back-front {
    font-size: 1.6rem;
    color: #2a2a2a;
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 3px solid #4a8eda;
}

.description {
    background-color: #e9effb;
    color: #2a2a2a;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 300px;
}

.back {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f4f8;
    color: #333;
    padding: 20px;
    height: 100vh;
    overflow-y: auto;
}

.simpleExplanationHeader, .purposeHeader, .questionsHeader, .relatedTermsHeader, .categoriesHeader {
    font-size: 1.3em;
    color: #5a5a5a;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 2px solid #4a8eda;
}

.simpleExplanation, .purpose {
    background-color: #e9effb;
    color: #2a2a2a;
    padding: 15px;
    border-left: 6px solid #4a8eda;
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.questions ul {
    list-style-type: none;
    padding: 0;
}

.questions li {
    background-color: #f8f0df;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border-left: 4px solid #f2994a;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.question-li {
    background-color: #f9f6f2;
    padding: 8px;
    margin-bottom: 5px;
    border: 1px solid #e0e0e0;
}

.question {
    font-weight: bold;
    font-size: 1.1em;
    color: #d35400;
    margin-bottom: 5px;
}

.answer {
    font-size: 1em;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.relatedTerms ul, .categories ul {
    list-style-type: none;
    padding: 0;
}

.relatedTerms li, .categories li {
    background-color: #ecf0f1;
   margin-bottom: 5px;
   padding: 10px;
   border-radius: 5px;
   border-left: 4px solid #3498db;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
`;

class AnkiModelService {

    getModels = () => {
        return AnkiConnectService.sendReq('modelNames', 'POST').then(response => {
            console.log('Model Response:', response)
            return response.json();
        });
    }

    modelExists() {
        return this.getModels().then(models => {
            console.log('Models:', models);
            return models && models.result && models.result.includes('Sakanu');
        });
    }

    createModel = () => {
        console.log("CSS", css);
        return AnkiConnectService.sendReq('createModel', 'POST', {}, {
            modelName: 'Sakanu',
            inOrderFields: ["Text", "Extra", "purpose", "simpleExplanation", "questions", "relatedTerms", "categories"],
            css: css,
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

const ankiModelService = new AnkiModelService();
export default ankiModelService;