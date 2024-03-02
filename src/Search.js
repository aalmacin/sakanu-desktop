import React from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import CreatableSelect from "react-select/creatable";

const Search = () => {
    const domains = [
        {
            title: 'Biology',
            description: 'Learn about the living world',
        },
        {
            title: 'Chemistry',
            description: 'Learn about the composition of matter',
        },
        {
            title: 'Physics',
            description: 'Learn about the forces and laws of nature',
        },
    ];

    const termResponse = {
        searchTerm: 'Photosynthesis',
        domain: 'Biology',
        flashcardFront: 'What is {{c1::photosynthesis}}?',
        description: 'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms\' activities.',
        purpose: 'The purpose of photosynthesis is to produce food for the plant.',
        simpleExplanation: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.',
        questions: [
            {
                question: 'What is photosynthesis?',
                answer: 'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms\' activities.'
            },
            {
                question: 'What is the purpose of photosynthesis?',
                answer: 'The purpose of photosynthesis is to produce food for the plant.'
            }
        ],
        relatedTerms: ['Chlorophyll', 'Glucose', 'Calvin Cycle'],
        categories: ['Biology', 'Botany']
    }
    const formik = useFormik({
        initialValues: {
            domain: '',
            searchTerm: ''
        },
        onSubmit: ({domain: {value: domain}, searchTerm}) => {
            console.log("I submitted", domain, searchTerm);
            console.log("I submitted here", process.env.REACT_APP_API_URL);
            fetch(`${process.env.REACT_APP_API_URL}/learn/${domain}/${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    console.log("I arrived", data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        },
    });

    // Options for react-select
    const domainOptions = domains.map(domain => ({label: domain.title, value: domain.title}));

    return (
        <div className="search-container">
            <form onSubmit={formik.handleSubmit}>
                <CreatableSelect
                    options={domainOptions}
                    onChange={value => formik.setFieldValue('domain', value)}
                    placeholder="Select a domain"
                    isClearable
                />
                <div className="search-term-input">
                    <input
                        type="text"
                        name="searchTerm"
                        onChange={formik.handleChange}
                        value={formik.values.searchTerm}
                        placeholder="Enter search term"
                    />
                </div>

                <div className="search-submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
            {termResponse && <Result termResponse={termResponse}/>}
        </div>
    );
};

export default Search;
