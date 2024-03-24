import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import './Search.css';
import Result from "./Result";
import CreatableSelect from "react-select/creatable";
import AnkiModelCreatorService from "./anki/AnkiModelService";
import AnkiDeckService from "./anki/AnkiDeckService";
import AnkiModelService from "./anki/AnkiModelService";
import AnkiNoteService from "./anki/AnkiNoteService";
import AnkiConnectService from "./anki/AnkiConnectService";

const Search = () => {
    const [termResponse, setTermResponse] = useState(null);

    const [domains, setDomains] = useState([]);

    const [modelExists, setModelExists] = useState(false);

    const [errorAnkiConnect, setErrorAnkiConnect] = useState(false);

    useEffect(() => {
        AnkiConnectService.requestPermission().then(response => {
            if (response.ok) {
                AnkiModelService.modelExists().then(response => {
                    console.log('Model Exists:', response)
                    return setModelExists(response);
                }).catch(error => {
                    console.error('There was an error!', error);
                });
            } else {
                console.error('Permission not granted:', response);
            }
        }).catch(error => {
            setErrorAnkiConnect(true);
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
        AnkiDeckService.getDecks().then(response => {
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
            setTermResponse(null);
            fetch(`${process.env.REACT_APP_API_URL}/learn/${domain}/${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    setTermResponse(data);
                    AnkiDeckService.createDeck(domain).then(deckResponse => {
                        console.log('Deck Created:', deckResponse)
                        AnkiNoteService.addNote(domain, data).then(noteResponse => {
                            console.log('Note Created:', noteResponse)
                        }).catch(error => {
                            console.error('There was an error creating the note!', error);
                        });
                    }).catch(error => {
                        console.error('There was an error creating the deck!', error);
                    });
                })
                .catch(error => {
                    console.error('There was an error setting term response!', error);
                });
        },
    });

    if (errorAnkiConnect) {
        return <div>
            <h2>There was an error connecting to Anki</h2>
            <div className="error-container">
                <ol>
                    <li>Ensure Anki is running</li>
                    <li>Ensure AnkiConnect is installed. You can download it from <a
                        rel="noreferrer"
                        href="https://ankiweb.net/shared/info/2055492159" target="_blank">AnkiWeb</a></li>
                    <li>Under tools, click on Add-ons. Select AnkiConnect and click on Config. Add
                        "https://sakanu.raidrin.com" on webCorsOriginList. It should look like this
                        <div>
                            <img src="/corslist.png" alt="Showing addon config"/>
                        </div>
                        Save the config and restart Anki
                    </li>
                    <li>Refresh the page. <a href="/search">Refresh</a></li>
                </ol>
            </div>
        </div>;
    }

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
