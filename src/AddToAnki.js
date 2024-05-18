import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import AnkiModelCreatorService from "./anki/AnkiModelService";
import AnkiInstructions from "./AnkiInstructions";
import AnkiDeckService from "./anki/AnkiDeckService";
import AnkiNoteService from "./anki/AnkiNoteService";
import { useAnkiConnect } from "./useAnkiConnect";

const AddToAnki = ({ termResponse, domain }) => {
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
        return (
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" align="center">Adding card to Anki...</Typography>
            </Box>
        );
    }

    if (isCardAdded) {
        return (
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" align="center">Card added to Anki!</Typography>
            </Box>
        );
    }

    if (isShowInstructions && ankiConnectError) {
        return (
            <Paper sx={{ p: 2, mt: 2 }}>
                <AnkiInstructions />
            </Paper>
        );
    }

    if (isShowInstructions && !ankiModelExists) {
        return (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom>Anki Model/Card Type does not exist</Typography>
                <Button variant="contained" color="primary" onClick={createModel}>Click here to Create Model</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" onClick={addAnkiHandler} fullWidth>Add to Anki</Button>
        </Box>
    );
};

export default AddToAnki;
