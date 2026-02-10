import { useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';
import './styles.css'
import Header from './Header';
import Tutorial from './Tutorial';
import Piano from './Piano';
import {
  generateNotes,
  buildScale,
  getKeyboardLabel,
  initializePiano,
  SCALE_PATTERNS
} from '../utils/musicUtils';

const ScaleBuilder = () => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [selectedRoot, setSelectedRoot] = useState(null);
  const [selectedScale, setSelectedScale] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [highlightedNotes, setHighlightedNotes] = useState([]);

  const notes = generateNotes();

  // Initialize piano on component mount
  useEffect(() => {
    const initAudio = async () => {
      try {
        if (Tone.getContext().state !== "running") {
          await Tone.start();
        }
        initializePiano();
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();
  }, []);

  // Handle note interaction (click or keyboard)
  const handleNoteClick = useCallback((note) => {
    // Always allow changing root note if clicking an octave 0 note
    if (note.index < 12) {
      // Clicked a selectable root note (first octave)
      if (note.index !== selectedRoot) {
        // Changing the root note
        setSelectedRoot(note.index);
        setUserNotes([]);
        setHighlightedNotes([]);
        // If already in scale selection, reset the tutorial flow
        if (tutorialStep >= 2) {
          setTutorialStep(1);
          setSelectedScale(null);
        }
      }
      // If already at a root and tutorialStep is 0, move to step 1
      if (tutorialStep === 0) {
        setTutorialStep(1);
      }
    } else if (tutorialStep === 4) {
      // Practice mode - user building scale
      if (userNotes.length === 0) {
        if (note.index === selectedRoot) {
          setUserNotes([note.index]);
        }
      } else if (!userNotes.includes(note.index)) {
        const newUserNotes = [...userNotes, note.index];
        setUserNotes(newUserNotes);

        const correctScale = buildScale(selectedRoot, SCALE_PATTERNS[selectedScale]);
        if (newUserNotes.length === correctScale.length) {
          const isCorrect = newUserNotes.every((n, i) => n === correctScale[i]);
          setTimeout(() => {
            if (isCorrect) {
              alert('Perfect! You built the scale correctly! 🎉');
            } else {
              alert('Not quite right. Try again!');
            }
            setUserNotes([]);
          }, 300);
        }
      }
    }
  }, [tutorialStep, selectedRoot, userNotes, selectedScale]);

  // Tutorial step handlers
  const showMajorPattern = () => {
    setSelectedScale('major');
    const scale = buildScale(selectedRoot, SCALE_PATTERNS.major);
    setHighlightedNotes(scale);
    setTutorialStep(2);
  };

  const showMinorPattern = () => {
    setSelectedScale('minor');
    const scale = buildScale(selectedRoot, SCALE_PATTERNS.minor);
    setHighlightedNotes(scale);
    setTutorialStep(3);
  };

  const startPractice = () => {
    setHighlightedNotes([]);
    setUserNotes([]);
    setTutorialStep(4);
  };

  const resetTutorial = () => {
    setTutorialStep(0);
    setSelectedRoot(null);
    setSelectedScale(null);
    setUserNotes([]);
    setHighlightedNotes([]);
  };

  return (
    <div className="app-container">
      <Header />

      <Tutorial
        tutorialStep={tutorialStep}
        selectedRoot={selectedRoot}
        selectedScale={selectedScale}
        userNotes={userNotes}
        notes={notes}
        onShowMajorPattern={showMajorPattern}
        onShowMinorPattern={showMinorPattern}
        onStartPractice={startPractice}
        onResetTutorial={resetTutorial}
        scalePatterns={SCALE_PATTERNS}
      />

      <Piano
        notes={notes}
        highlightedNotes={tutorialStep === 4 ? [] : highlightedNotes}
        userNotes={userNotes}
        selectedRoot={selectedRoot}
        getKeyboardLabel={(note) => getKeyboardLabel(note, notes)}
        onNoteClick={handleNoteClick}
      />
    </div>
  );
};

export default ScaleBuilder;