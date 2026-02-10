import * as Tone from 'tone';

// Note names
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Keyboard mappings
export const WHITE_KEY_MAP = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
export const BLACK_KEY_MAP = ['w', 'e', '', 't', 'y', 'u', '', 'i', 'o', 'p', ''];

// Scale patterns in semitones
export const SCALE_PATTERNS = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2]
};

// Generate 2 octaves of notes (24 keys starting from C)
export const generateNotes = () => {
  const notes = [];
  for (let octave = 0; octave < 2; octave++) {
    for (let i = 0; i < 12; i++) {
      notes.push({
        name: NOTE_NAMES[i],
        index: octave * 12 + i,
        isBlack: NOTE_NAMES[i].includes('#'),
        octave: octave + 4,
        // Scientific pitch notation for Tone.js (e.g., "C4", "D#5")
        noteName: `${NOTE_NAMES[i]}${octave + 4}`
      });
    }
  }
  return notes;
};

// Build scale from root note and pattern
export const buildScale = (rootIndex, pattern) => {
  const scale = [rootIndex];
  let currentIndex = rootIndex;

  for (const interval of pattern) {
    currentIndex += interval;
    scale.push(currentIndex);
  }

  return scale;
};

// Get keyboard label for note
export const getKeyboardLabel = (note, notes) => {
  if (note.isBlack) {
    const blackNotes = notes.filter(n => n.isBlack);
    const blackIndex = blackNotes.findIndex(n => n.index === note.index);
    const adjustedIndex = blackIndex < 5 ? blackIndex : blackIndex + 1;
    return BLACK_KEY_MAP[adjustedIndex]?.toUpperCase() || '';
  } else {
    const whiteNotes = notes.filter(n => !n.isBlack);
    const whiteIndex = whiteNotes.findIndex(n => n.index === note.index);
    return WHITE_KEY_MAP[whiteIndex]?.toUpperCase() || '';
  }
};

// Piano sampler instance (singleton)
let piano = null;
let currentlyPlayingNotes = new Map(); // Map of noteIndex -> noteName

export const initializePiano = () => {
  if (piano) return piano;

  piano = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: {
      attack: 0.005,
      decay: 0.15,
      sustain: 0.3,
      release: 1.2
    }
  }).toDestination();

  return piano;
};

export const playNoteStart = async (note, setActiveNote, velocity = 0.9) => {
  if (Tone.getContext().state !== "running") {
    await Tone.start();
  }

  const synth = initializePiano();
  synth.triggerAttack(note.noteName, undefined, velocity);
  currentlyPlayingNotes.set(note.index, note.noteName);
  setActiveNote?.(note.index);
};

export const playNoteEnd = (note, setActiveNote) => {
  if (!piano) return;

  piano.triggerRelease(note.noteName);
  currentlyPlayingNotes.delete(note.index);

  // Only clear activeNote if no notes are playing
  if (currentlyPlayingNotes.size === 0) {
    setActiveNote?.(null);
  }
};

export const playNoteOnce = (note, setActiveNote, duration = "8n", velocity = 0.9) => {
  if (!piano) return;

  piano.triggerAttackRelease(note.noteName, duration, undefined, velocity);

  if (setActiveNote) {
    setActiveNote(note.index);
    setTimeout(
      () => setActiveNote(null),
      Tone.Time(duration).toMilliseconds()
    );
  }
};

// Check if a note is currently playing
export const isNotePlaying = (noteIndex) => {
  return currentlyPlayingNotes.has(noteIndex);
};

// Set the volume of the piano
export const setVolume = (volumeValue) => {
  if (!piano) return;
  // Tone.js volume is in decibels, -30 to 0, so we convert 0-1 to -30 to 0
  const db = volumeValue === 0 ? -Infinity : Math.log10(volumeValue) * 20;
  piano.volume.value = db;
};