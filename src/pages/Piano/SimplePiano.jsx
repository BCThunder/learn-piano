import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Piano from '../../components/Piano';
import { generateNotes, getKeyboardLabel, initializePiano } from '../../utils/musicUtils';

const SimplePiano = () => {
  const [selectedRoot, setSelectedRoot] = useState(null);
  const notes = generateNotes();

  // Initialize piano on mount
  useEffect(() => {
    initializePiano();
  }, []);

  const handleNoteClick = useCallback((note) => {
    // Allow selecting root note from first octave
    if (note.index < 12) {
      setSelectedRoot(note.index);
    }
  }, []);

  return (
    <>
      <Header
        title="Virtual Piano"
        subtitle="Practice and explore notes freely"
      />
      <Piano
        notes={notes}
        highlightedNotes={[]}
        userNotes={[]}
        selectedRoot={selectedRoot}
        getKeyboardLabel={(note) => getKeyboardLabel(note, notes)}
        onNoteClick={handleNoteClick}
      />
    </>
  );
};

export default SimplePiano;
