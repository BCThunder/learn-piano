import { useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';
import Header from '../../components/Header';
import Tutorial from '../../components/Tutorial';
import Piano from '../../components/Piano';
import {
  generateNotes,
  buildScale,
  getKeyboardLabel,
  initializePiano,
  SCALE_PATTERNS
} from '../../utils/musicUtils';

const ScaleBuilder = () => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [selectedRoot, setSelectedRoot] = useState(null);
  const [selectedScale, setSelectedScale] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [highlightedNotes, setHighlightedNotes] = useState([]);
  const [isRootLocked, setIsRootLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);

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
    // If waiting for user to continue after completing scale
    if (waitingForContinue) {
      setUserNotes([]);
      setFeedback(null);
      setWaitingForContinue(false);
      return;
    }

    // Practice mode - user building scale (check this first)
    if (tutorialStep === 4) {
      if (userNotes.length === 0) {
        if (note.index === selectedRoot) {
          setUserNotes([note.index]);
          setFeedback(null); // Clear any previous feedback
        }
      } else if (!userNotes.includes(note.index)) {
        const newUserNotes = [...userNotes, note.index];
        setUserNotes(newUserNotes);

        const correctScale = buildScale(selectedRoot, SCALE_PATTERNS[selectedScale]);
        if (newUserNotes.length === correctScale.length) {
          const isCorrect = newUserNotes.every((n, i) => n === correctScale[i]);
          if (isCorrect) {
            setFeedback('success');
          } else {
            setFeedback('error');
          }
          setWaitingForContinue(true);
        }
      }
    } else if (note.index < 12) {
      // Allow changing root note if clicking an octave 0 note (lower octave)
      // Only allow changing root if not locked
      if (!isRootLocked) {
        // Update the selected root note
        setSelectedRoot(note.index);
        // Advance to step 1 to show scale selection buttons
        if (tutorialStep === 0) {
          setTutorialStep(1);
        }
      }
    }
  }, [tutorialStep, selectedRoot, userNotes, selectedScale, isRootLocked, waitingForContinue]);

  // Tutorial step handlers
  const showMajorPattern = () => {
    setSelectedScale('major');
    const scale = buildScale(selectedRoot, SCALE_PATTERNS.major);
    setHighlightedNotes(scale);
    setIsRootLocked(true);
    setTutorialStep(2);
  };

  const showMinorPattern = () => {
    setSelectedScale('minor');
    const scale = buildScale(selectedRoot, SCALE_PATTERNS.minor);
    setHighlightedNotes(scale);
    setIsRootLocked(true);
    setTutorialStep(3);
  };

  const startPractice = () => {
    setHighlightedNotes([]);
    setUserNotes([]);
    setFeedback(null);
    setWaitingForContinue(false);
    setTutorialStep(4);
  };

  const startOver = () => {
    setTutorialStep(1);
    setSelectedScale(null);
    setUserNotes([]);
    setHighlightedNotes([]);
    setIsRootLocked(false);
    setFeedback(null);
    setWaitingForContinue(false);
  };

  const resetTutorial = () => {
    setTutorialStep(0);
    setSelectedRoot(null);
    setSelectedScale(null);
    setUserNotes([]);
    setHighlightedNotes([]);
    setIsRootLocked(false);
    setFeedback(null);
    setWaitingForContinue(false);
  };

  return (
    <>
      <Header
        title="Scale Builder"
        subtitle="Learn music scales through interactive building"
      />

      <Tutorial
        tutorialStep={tutorialStep}
        selectedRoot={selectedRoot}
        selectedScale={selectedScale}
        userNotes={userNotes}
        notes={notes}
        feedback={feedback}
        waitingForContinue={waitingForContinue}
        onShowMajorPattern={showMajorPattern}
        onShowMinorPattern={showMinorPattern}
        onStartPractice={startPractice}
        onStartOver={startOver}
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
    </>
  );
};

export default ScaleBuilder;
