const PianoKey = ({
  note,
  isHighlighted,
  isUserSelected,
  isRoot,
  isActive,
  isSelectableRoot,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  keyboardLabel
}) => {
  if (note.isBlack) {
    const whiteKeyWidth = 60;
    const blackKeyWidth = 36;

    // Determine which white key this black key belongs to (positioned at its right edge)
    // C# belongs to C, D# to D, F# to F, G# to G, A# to A
    const noteInOctave = note.index % 12;
    const octaveOffset = Math.floor(note.index / 12) * 7;

    let whiteKeyIndex; // The white key this black key belongs to
    switch (noteInOctave) {
      case 1: whiteKeyIndex = 0; break; // C# belongs to C
      case 3: whiteKeyIndex = 1; break; // D# belongs to D
      case 6: whiteKeyIndex = 3; break; // F# belongs to F
      case 8: whiteKeyIndex = 4; break; // G# belongs to G
      case 10: whiteKeyIndex = 5; break; // A# belongs to A
      default: whiteKeyIndex = 0;
    }

    const totalWhiteKeyIndex = octaveOffset + whiteKeyIndex;
    // Position black key so its center is at the right border of its white key
    const leftPosition = (totalWhiteKeyIndex * whiteKeyWidth) + whiteKeyWidth - (blackKeyWidth / 2);

    // Determine state class
    let stateClass = 'default';
    if (isActive) stateClass = 'active';
    else if (isUserSelected) stateClass = 'selected';
    else if (isHighlighted) stateClass = 'highlighted';
    else if (isRoot) stateClass = 'root';
    else if (isSelectableRoot) stateClass = 'selectable-root';

    return (
      <div
        onMouseDown={() => onMouseDown(note)}
        onMouseUp={() => onMouseUp(note)}
        onMouseLeave={() => onMouseLeave(note)}
        className={`piano-key black ${stateClass}`}
        style={{ left: `${leftPosition}px` }}
      >
        <div className="key-note-name black">
          {note.name}
        </div>
        <div className="key-keyboard-label black">
          {keyboardLabel}
        </div>
      </div>
    );
  } else {
    // White key
    let stateClass = 'default';
    if (isActive) stateClass = 'active';
    else if (isUserSelected) stateClass = 'selected';
    else if (isHighlighted) stateClass = 'highlighted';
    else if (isRoot) stateClass = 'root';
    else if (isSelectableRoot) stateClass = 'selectable-root';

    const isColored = isUserSelected || isHighlighted || isRoot || isSelectableRoot;

    return (
      <div
        onMouseDown={() => onMouseDown(note)}
        onMouseUp={() => onMouseUp(note)}
        onMouseLeave={() => onMouseLeave(note)}
        className={`piano-key white ${stateClass}`}
      >
        <div className={`key-note-name white ${isColored ? 'colored' : ''}`}>
          {note.name}
        </div>
        <div className={`key-keyboard-label white ${isColored ? 'colored' : ''}`}>
          {keyboardLabel}
        </div>
      </div>
    );
  }
};

export default PianoKey;
