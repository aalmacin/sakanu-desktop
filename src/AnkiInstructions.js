// src/AnkiInstructions.js
import React from 'react';

const AnkiInstructions = () => {
    return (
        <div>
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
                    <li>Go to terms to add the card to anki. <a href="/terms">Refresh</a></li>
                </ol>
            </div>
        </div>
    );
};

export default AnkiInstructions;