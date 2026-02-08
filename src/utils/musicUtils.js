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
        octave: octave + 4
      });
    }
  }
  return notes;
};

// Calculate frequency for a note
export const getFrequency = (noteIndex) => {
  // C4 is index 0, A4 (440Hz) is index 9
  return 440 * Math.pow(2, (noteIndex - 9) / 12);
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

// Play a note using Web Audio API
export const playNote = (noteIndex, audioContext, setActiveNote) => {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = getFrequency(noteIndex);
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);

  setActiveNote(noteIndex);
  setTimeout(() => setActiveNote(null), 200);
};