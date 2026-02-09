import PianoKey from './PianoKey';
import './styles.css';

const Piano = ({
  notes,
  highlightedNotes,
  userNotes,
  selectedRoot,
  activeNote,
  onNoteClick,
  getKeyboardLabel,
  showLegend = true
}) => {
  return (
    <div className="card piano-container">
      <div className="piano-wrapper">
        <div className="piano-keys-container">
          {notes.filter(n => !n.isBlack).map((note) => (
            <PianoKey
              key={note.index}
              note={note}
              isHighlighted={highlightedNotes.includes(note.index)}
              isUserSelected={userNotes.includes(note.index)}
              isRoot={note.index === selectedRoot}
              isActive={note.index === activeNote}
              onClick={() => onNoteClick(note.index)}
              keyboardLabel={getKeyboardLabel(note)}
            />
          ))}

          {notes.filter(n => n.isBlack).map((note) => (
            <PianoKey
              key={note.index}
              note={note}
              isHighlighted={highlightedNotes.includes(note.index)}
              isUserSelected={userNotes.includes(note.index)}
              isRoot={note.index === selectedRoot}
              isActive={note.index === activeNote}
              onClick={() => onNoteClick(note.index)}
              keyboardLabel={getKeyboardLabel(note)}
            />
          ))}
        </div>
      </div>

      {showLegend && (
        <div className="legend">
          {selectedRoot !== null && (
            <div className="legend-item">
              <div className="legend-color root"></div>
              Root Note
            </div>
          )}
          {highlightedNotes.length > 0 && (
            <div className="legend-item">
              <div className="legend-color scale"></div>
              Scale Notes
            </div>
          )}
          {userNotes.length > 0 && (
            <div className="legend-item">
              <div className="legend-color selected"></div>
              Your Selection
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Piano;