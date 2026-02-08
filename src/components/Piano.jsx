import PianoKey from './PianoKey';
import './Piano.css';

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
    <div className="piano-container">
      <div className="piano-outer">
        {/* White keys container */}
        <div className="keys-wrapper">
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

          {/* Black keys overlay */}
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

      {/* Legend */}
      {showLegend && (
        <div className="legend">
          {selectedRoot !== null && (
            <div className="legend-item">
              <div className="legend-swatch legend-root"></div>
              Root Note
            </div>
          )}
          {highlightedNotes.length > 0 && (
            <div className="legend-item">
              <div className="legend-swatch legend-scale"></div>
              Scale Notes
            </div>
          )}
          {userNotes.length > 0 && (
            <div className="legend-item">
              <div className="legend-swatch legend-user"></div>
              Your Selection
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Piano;