import PianoKey from './PianoKey';

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
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      maxWidth: '1200px',
      width: '100%'
    }}>
      <div style={{
        position: 'relative',
        height: '280px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* White keys container */}
        <div style={{ display: 'flex', position: 'relative' }}>
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
        <div style={{
          marginTop: '30px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: '14px',
          color: '#666'
        }}>
          {selectedRoot !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: '#fbbf24',
                borderRadius: '4px',
                border: '2px solid #1a1a1a'
              }}></div>
              Root Note
            </div>
          )}
          {highlightedNotes.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: '#667eea',
                borderRadius: '4px',
                border: '2px solid #1a1a1a'
              }}></div>
              Scale Notes
            </div>
          )}
          {userNotes.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                background: '#10b981',
                borderRadius: '4px',
                border: '2px solid #1a1a1a'
              }}></div>
              Your Selection
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Piano;