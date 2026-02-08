const PianoKey = ({
  note,
  isHighlighted,
  isUserSelected,
  isRoot,
  isActive,
  onClick,
  keyboardLabel
}) => {
  const baseStyle = {
    cursor: 'pointer',
    position: note.isBlack ? 'absolute' : 'relative',
    transition: 'all 0.1s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    userSelect: 'none',
  };

  if (note.isBlack) {
    // Black key styles
    const whiteKeyWidth = 60;
    const blackKeyWidth = 36;

    // Calculate position based on which white key it's after
    // C# is after C (0), D# after D (1), F# after F (3), G# after G (4), A# after A (5)
    const noteInOctave = note.index % 12;
    const octaveOffset = Math.floor(note.index / 12) * 7; // 7 white keys per octave

    let whiteKeysBeforeInOctave;
    switch (noteInOctave) {
      case 1: whiteKeysBeforeInOctave = 1; break; // C#
      case 3: whiteKeysBeforeInOctave = 2; break; // D#
      case 6: whiteKeysBeforeInOctave = 4; break; // F#
      case 8: whiteKeysBeforeInOctave = 5; break; // G#
      case 10: whiteKeysBeforeInOctave = 6; break; // A#
      default: whiteKeysBeforeInOctave = 0;
    }

    const totalWhiteKeysBefore = octaveOffset + whiteKeysBeforeInOctave;
    const leftPosition = (totalWhiteKeysBefore * whiteKeyWidth) + (whiteKeyWidth - blackKeyWidth / 2);

    return (
      <div
        onClick={onClick}
        style={{
          ...baseStyle,
          width: `${blackKeyWidth}px`,
          height: '160px',
          background: isActive ? '#4b5563' : isUserSelected ? '#059669' : isHighlighted ? '#5568d3' : isRoot ? '#f59e0b' : '#1a1a1a',
          border: '2px solid #000',
          borderRadius: '0 0 6px 6px',
          left: `${leftPosition}px`,
          top: 0,
          zIndex: 10,
          padding: '8px',
          boxShadow: isActive ? 'inset 0 0 20px rgba(0,0,0,0.5)' : '0 4px 8px rgba(0,0,0,0.3)',
          transform: isActive ? 'translateY(2px)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = isUserSelected ? '#047857' : isHighlighted ? '#4c5fd5' : isRoot ? '#d97706' : '#374151';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = isUserSelected ? '#059669' : isHighlighted ? '#5568d3' : isRoot ? '#f59e0b' : '#1a1a1a';
          }
        }}
      >
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: 'white',
          marginBottom: '5px'
        }}>
          {note.name}
        </div>
        <div style={{
          fontSize: '9px',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: '600'
        }}>
          {keyboardLabel}
        </div>
      </div>
    );
  } else {
    // White key styles
    return (
      <div
        onClick={onClick}
        style={{
          ...baseStyle,
          width: '60px',
          height: '240px',
          background: isActive ? '#e5e7eb' : isUserSelected ? '#10b981' : isHighlighted ? '#667eea' : isRoot ? '#fbbf24' : 'white',
          border: '2px solid #1a1a1a',
          borderRadius: '0 0 8px 8px',
          padding: '10px',
          boxShadow: isActive ? 'inset 0 0 20px rgba(0,0,0,0.2)' : 'none',
          transform: isActive ? 'translateY(2px)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = isUserSelected ? '#059669' : isHighlighted ? '#5568d3' : isRoot ? '#f59e0b' : '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = isUserSelected ? '#10b981' : isHighlighted ? '#667eea' : isRoot ? '#fbbf24' : 'white';
          }
        }}
      >
        <div style={{
          fontSize: '12px',
          fontWeight: '600',
          color: isUserSelected || isHighlighted || isRoot ? 'white' : '#9ca3af',
          marginBottom: '5px'
        }}>
          {note.name}
        </div>
        <div style={{
          fontSize: '10px',
          color: isUserSelected || isHighlighted || isRoot ? 'rgba(255,255,255,0.8)' : '#d1d5db',
          fontWeight: '600'
        }}>
          {keyboardLabel}
        </div>
      </div>
    );
  }
};

export default PianoKey;