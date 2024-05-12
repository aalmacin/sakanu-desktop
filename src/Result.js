// Result.js
import React from 'react';
import './Result.css';

const Result = ({termResponse}) => {
    return (
        <div className="result-container">
            <h2>{termResponse.searchTerm}</h2>
            <p>Domain: {termResponse.domain}</p>
            <h3>Description</h3>
            <p>{termResponse.description}</p>
            <h3>Purpose</h3>
            <p>{termResponse.purpose}</p>
            <h3>ELI5 Explanation</h3>
            <p>{termResponse.simpleExplanation}</p>
            <h3>Questions:</h3>
            <ul>
                {termResponse.questions.map((question, index) => (
                    <li key={index}>
                        <p>Q: {question.question}</p>
                        <p>A: {question.answer}</p>
                    </li>
                ))}
            </ul>
            <h3>Related Terms:</h3>
            <ul>
                {termResponse.relatedTerms.map((term, index) => (
                    <li key={index}>{term}</li>
                ))}
            </ul>
            <h3>Categories:</h3>
            <ul>
                {termResponse.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
            <h3>Anki Cloze</h3>
            <p>{termResponse.cloze}</p>
            <div>Did not get the result you need? Try to update the domain to be more specific.</div>
        </div>
    );
};

export default Result;