import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AnkiModelCreatorService from "./anki/AnkiModelService";
import Typography from "@mui/material/Typography";
import AnkiInstructions from "./AnkiInstructions";
import AnkiDeckService from "./anki/AnkiDeckService";
import AnkiNoteService from "./anki/AnkiNoteService";
import {useAnkiConnect} from "./useAnkiConnect";

const AddToAnki = ({termResponse, domain}) => {
    const { ankiConnectError, ankiModelExists, setAnkiModelExists } = useAnkiConnect();
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [isCardAdded, setIsCardAdded] = useState(false);
    const [isShowInstructions, setIsShowInstructions] = useState(false);

    const createModel = () => {
        AnkiModelCreatorService.createModel().then(response => {
            console.log('Model Created:', response)
            return response.json();
        }).then(data => {
            console.log('Model Created:', data)
            setAnkiModelExists(true);
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    const createAnkiCard = () => {
        setIsAddingCard(true);
        AnkiDeckService.createDeck(domain).then(deckResponse => {
            console.log('Deck Created:', deckResponse)
            AnkiNoteService.addNote(domain, termResponse).then(noteResponse => {
                console.log('Note Created:', noteResponse)
                setIsAddingCard(false);
                setIsCardAdded(true);
            }).catch(error => {
                console.error('There was an error creating the note!', error);
            });
        }).catch(error => {
            console.error('There was an error creating the deck!', error);
        });
    }

    const addAnkiHandler = () => {
        if (!ankiConnectError && ankiModelExists) {
            createAnkiCard();
        } else {
            setIsShowInstructions(true);
        }
    };

    if (isAddingCard) {
        return (<Box>
            <Typography variant="h6">Adding card to Anki...</Typography>
        </Box>);
    }

    if (isCardAdded) {
        return (<Box>
            <Typography variant="h6">Card added to Anki!</Typography>
        </Box>);
    }

    if (isShowInstructions && ankiConnectError) {
        return <Box sx={{border: '1px solid grey', borderRadius: '4px', padding: '16px', marginTop: '16px'}}>
            <AnkiInstructions/>
        </Box>;

    }

    if (isShowInstructions && !ankiModelExists) {
        return <Box className="create-model" padding={2}>
            <p>Model does not exist</p>
            <button className="create-model-button" onClick={createModel}>Create Model</button>
        </Box>;
    }

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={addAnkiHandler}>Add to Anki</Button>
        </Box>
    );
};

export default AddToAnki;