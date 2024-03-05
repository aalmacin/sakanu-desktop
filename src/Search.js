import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import CreatableSelect from "react-select/creatable";
import AnkiConnectService from "./AnkiConnectService";
import AnkiModelCreatorService from "./AnkiModelCreatorService";

const Search = () => {
    const [termResponse, setTermResponse] = useState(null);

    const [domains, setDomains] = useState([]);

    const [modelExists, setModelExists] = useState(false);

    useEffect(() => {
        AnkiConnectService.modelExists().then(response => {
            console.log('Model Exists:', response)
            return setModelExists(response);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }, []);
    const createModel = () => {
        AnkiModelCreatorService.createModel().then(response => {
            console.log('Model Created:', response)
            return response.json();
        }).then(data => {
            console.log('Model Created:', data)
            setModelExists(data.result);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

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
        if (modelExists) {
            fetchDomains();
        }
    }, [modelExists]);


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

    if (!modelExists) {
        return <div className="create-model">
            <p>Model does not exist</p>
            <button className="create-model-button" onClick={createModel}>Create Model</button>
        </div>;
    }

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
