import React from 'react';
import Select from 'react-select';
import {useFormik} from 'formik';
import './Search.css';

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
    const formik = useFormik({
        initialValues: {
            domain: '',
            searchTerm: ''
        },
        onSubmit: values => {
            console.log(values);
            // Handle the form submission here
        },
    });

    // Options for react-select
    const domainOptions = domains.map(domain => ({label: domain.title, value: domain.title}));

    return (
        <div className="search-container">
            <form onSubmit={formik.handleSubmit}>
                <Select
                    options={domainOptions}
                    onChange={value => formik.setFieldValue('domain', value)}
                    placeholder="Select a domain"
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
        </div>
    );
};

export default Search;
