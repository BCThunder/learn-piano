import { useEffect } from 'react';
import Header from '../../components/Header';
import Piano from '../../components/Piano';
import { generateNotes, getKeyboardLabel, initializePiano } from '../../utils/musicUtils';

const SimplePiano = () => {
  const notes = generateNotes();

  // Initialize piano on mount
  useEffect(() => {
    initializePiano();
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
        selectedRoot={null}
        getKeyboardLabel={(note) => getKeyboardLabel(note, notes)}
        onNoteClick={() => {}}
      />
    </>
  );
};

export default SimplePiano;
