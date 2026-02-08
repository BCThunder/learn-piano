import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Tutorial from './Tutorial';
import Piano from './Piano';
import {
  generateNotes,
  buildScale,
  getKeyboardLabel,
  playNote,
  SCALE_PATTERNS,
  WHITE_KEY_MAP,
  BLACK_KEY_MAP
} from '../utils/musicUtils';
import './ScaleBuilder.css';

const ScaleBuilder = () => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [selectedRoot, setSelectedRoot] = useState(null);
  const [selectedScale, setSelectedScale] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [highlightedNotes, setHighlightedNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  const notes = generateNotes();

  // Initialize Web Audio API
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(ctx);
    return () => ctx.close();
  }, []);

  // Handle note click
  const handleNoteClick = useCallback((noteIndex) => {
    // Play the note
    playNote(noteIndex, audioContext, setActiveNote);

    if (tutorialStep === 0) {
      // Select root note
      setSelectedRoot(noteIndex);
      setTutorialStep(1);
    } else if (tutorialStep === 4) {
      // Practice mode - user building scale
      if (userNotes.length === 0) {
        // First note must be the selected root
        if (noteIndex === selectedRoot) {
          setUserNotes([noteIndex]);
        }
      } else if (!userNotes.includes(noteIndex)) {
        const newUserNotes = [...userNotes, noteIndex];
        setUserNotes(newUserNotes);

        // Check if scale is complete
        const correctScale = buildScale(selectedRoot, SCALE_PATTERNS[selectedScale]);
        if (newUserNotes.length === correctScale.length) {
          // Check if correct
          const isCorrect = newUserNotes.every((note, i) => note === correctScale[i]);
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
  }, [tutorialStep, selectedRoot, userNotes, selectedScale, audioContext]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Find white key
      const whiteKeyIndex = WHITE_KEY_MAP.indexOf(key);
      if (whiteKeyIndex !== -1) {
        const whiteNotes = notes.filter(n => !n.isBlack);
        if (whiteKeyIndex < whiteNotes.length) {
          const note = whiteNotes[whiteKeyIndex];
          handleNoteClick(note.index);
        }
        return;
      }

      // Find black key
      const blackKeyIndex = BLACK_KEY_MAP.indexOf(key);
      if (blackKeyIndex !== -1 && BLACK_KEY_MAP[blackKeyIndex] !== '') {
        const blackNotes = notes.filter(n => n.isBlack);
        const adjustedIndex = blackKeyIndex - (blackKeyIndex > 4 ? 1 : 0);
        if (adjustedIndex < blackNotes.length) {
          const note = blackNotes[adjustedIndex];
          handleNoteClick(note.index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notes, handleNoteClick]);

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
    <div className="scale-builder-root">
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
        activeNote={activeNote}
        onNoteClick={handleNoteClick}
        getKeyboardLabel={(note) => getKeyboardLabel(note, notes)}
      />
    </div>
  );
};

export default ScaleBuilder;