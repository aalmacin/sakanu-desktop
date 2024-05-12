import { useState, useEffect } from 'react';
import AnkiConnectService from './anki/AnkiConnectService';
import AnkiModelService from "./anki/AnkiModelService";

export const useAnkiConnect = () => {
  const [ankiConnectError, setAnkiConnectError] = useState(false);
  const [ankiModelExists, setAnkiModelExists] = useState(false);

  useEffect(() => {
    AnkiConnectService.requestPermission().then(response => {
      if (response.ok) {
        AnkiModelService.modelExists().then(response => {
          console.log('Model Exists:', response)
          setAnkiModelExists(response);
        }).catch(error => {
          console.error('There was an error!', error);
        });
      } else {
        console.error('Permission not granted:', response);
      }
    }).catch(() => {
      setAnkiConnectError(true);
    });
  }, []);

  return { ankiConnectError, ankiModelExists, setAnkiModelExists };
};