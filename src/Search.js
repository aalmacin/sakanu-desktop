import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import CreatableSelect from "react-select/creatable";

const Search = () => {
    const [termResponse, setTermResponse] = useState(null);

    const [domains, setDomains] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/domains`)
            .then(response => response.json())
            .then(data => {
                setDomains(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    const formik = useFormik({
        initialValues: {
            domain: '',
            searchTerm: ''
        },
        onSubmit: ({domain: {value: domain}, searchTerm}) => {
            fetch(`${process.env.REACT_APP_API_URL}/learn/${domain}/${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    setTermResponse(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        },
    });

    console.log(domains);
    // Options for react-select
    const domainOptions = domains.map(domain => ({label: domain, value: domain}));

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
