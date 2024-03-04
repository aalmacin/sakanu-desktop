import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import CreatableSelect from "react-select/creatable";
import AnkiConnectService from "./AnkiConnectService";

const Search = () => {
    const [termResponse, setTermResponse] = useState(null);

    const [domains, setDomains] = useState([]);

    // Function to fetch domains
    const fetchDomains = () => {
        AnkiConnectService.getDecks().then(response => {
            console.log('Domain Response:', response)
            return response.json();
        }).then(data => {
            console.log('Domains:', data)
            setDomains(data.result);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    useEffect(() => {
        fetchDomains();
    }, []);


    const formik = useFormik({
        initialValues: {
            domain: '', searchTerm: ''
        }, onSubmit: ({domain: {value: domain}, searchTerm}) => {
            fetch(`${process.env.REACT_APP_API_URL}/learn/${domain}/${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    setTermResponse(data);
                    fetchDomains();
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        },
    });

    // Options for react-select
    const domainOptions = domains.map(domain => ({label: domain, value: domain}));

    return (<div className="search-container">
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
    </div>);
};

export default Search;
