import { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../logo.svg';
import classes from './App.module.scss';
import Associations from '../components/Associations/Associations';
import { AssociationType } from '../models/Association';

import volume from '../assets/images/sound.png';
import mute from '../assets/images/mute.png';
import santaHat from '../assets/images/santa-hat.png';
import gifts from '../assets/images/gift.png';
import candyCane from '../assets/images/candy-cane.png';
import candyCanes from '../assets/images/candy-canes.png';

export interface AppProps {}

export interface AppState {
  associations: AssociationType;
  error: string;
  hasSound: boolean;
  audio: HTMLAudioElement;
}

const App: FC<AppProps> = () => {
  const [state, setState] = useState<AppState>({
    associations: {},
    error: '',
    hasSound: false,
    audio: new Audio(require('../assets/music/all-i-want.mp3')),
  });

  useEffect(() => {
    state.audio.loop = true;
  }, [state.audio]);

  const onAddLine = () => {
    setState((ps) => ({
      ...ps,
      associations: {
        ...ps.associations,
        [uuidv4()]: {
          giver: '',
          receiver: '',
        },
      },
      error: '',
    }));
  };

  const handleGiverNameChange = (id: string, name: string) => {
    setState((ps) => ({
      ...ps,
      associations: {
        ...ps.associations,
        [id]: {
          ...ps.associations[id],
          giver: name,
        },
      },
      error: '',
    }));
  };

  const handleDeleteAssociation = (id: string) => {
    const copiedAssociations = { ...state.associations };
    delete copiedAssociations[id];

    setState((ps) => ({
      ...ps,
      associations: copiedAssociations,
      error: '',
    }));
  };

  const handleDraw = async () => {
    const copiedAssociations = { ...state.associations };
    const givers = Object.values(copiedAssociations).map((association) => association.giver);
    shuffle(givers);

    for (let i = 0; i < givers.length; i++) {
      copiedAssociations[Object.keys(copiedAssociations)[i]].receiver = givers[i];
    }

    if (Object.values(copiedAssociations).some((association) => association.giver === association.receiver)) {
      setState((ps) => ({
        ...ps,
        error: "Tirage invalide, au moins une personne s'est tirée au sort elle-même",
      }));
      return;
    }

    const finalResult: AssociationType = Object.keys(copiedAssociations).reduce((acc, id) => {
      acc[id] = {
        giver: copiedAssociations[id].giver,
        receiver: '',
      };
      return acc;
    }, {} as AssociationType);

    for (const [id, association] of Object.entries(copiedAssociations)) {
      finalResult[id] = association;

      setState((ps) => ({
        ...ps,
        associations: finalResult,
        error: '',
      }));

      await new Promise((res) => setTimeout(res, 1_000));
    }
  };

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const handleChangeSound = () => {
    if (state.hasSound) {
      state.audio.volume = 0;
    } else {
      state.audio.volume = 1;
      state.audio.play();
    }

    setState((ps) => ({
      ...ps,
      hasSound: !ps.hasSound,
    }));
  };

  return (
    <div className={classes.container}>
      <header>
        <button className={classes.sound} onClick={handleChangeSound}>
          <img src={state.hasSound ? volume : mute} alt="" />
        </button>
        <h1>
          <span>
            Tirage au sort de{' '}
            <span>
              Noël
              <img src={santaHat} alt="" />
            </span>
          </span>
        </h1>
        {state.error && <div className={classes.error}>{state.error}</div>}
        <button className={classes.link_button} onClick={onAddLine}>
          <img src={candyCanes} alt="" />
          <span>Ajouter une association</span>
          <img src={candyCanes} alt="" />
        </button>
      </header>

      <main>
        <Associations
          associations={state.associations}
          onGiverNameChange={handleGiverNameChange}
          onDeleteAssociation={handleDeleteAssociation}
        />

        {Object.keys(state.associations).length > 2 && (
          <button
            className={classes.draw_button}
            onClick={handleDraw}
            disabled={
              Object.values(state.associations).some((association) => !association.giver) ||
              Object.keys(state.associations).length < 2
            }>
            <span>Tirer au sort</span>
            <img src={gifts} alt="" />
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
