import { useState, useEffect, useCallback } from 'react';
import './styles.css'
import PianoKey from './PianoKey';
import {
  playNoteStart,
  playNoteEnd,
  setVolume,
  WHITE_KEY_MAP,
  BLACK_KEY_MAP
} from '../utils/musicUtils';

const Piano = ({
  notes,
  highlightedNotes,
  userNotes,
  selectedRoot,
  getKeyboardLabel,
  onNoteClick,
  showLegend = true
}) => {
  const [activeNotes, setActiveNotes] = useState(new Set());
  const [volume, setVolumeState] = useState(0.3);
  const [heldKeys, setHeldKeys] = useState(new Set());
  const [mouseDownNote, setMouseDownNote] = useState(null);

  // Initialize volume on mount
  useEffect(() => {
    setVolume(0.3);
  }, []);

  // Handle mouse down on piano key
  const handleMouseDown = useCallback(async (note) => {
    setMouseDownNote(note.index);
    setActiveNotes(prev => new Set([...prev, note.index]));
    await playNoteStart(note, null);
    onNoteClick?.(note);
  }, [onNoteClick]);

  // Handle mouse up on piano key
  const handleMouseUp = useCallback((note) => {
    if (mouseDownNote !== note.index) return;

    setMouseDownNote(null);
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.delete(note.index);
      return next;
    });
    playNoteEnd(note, null);
  }, [mouseDownNote]);

  // Handle mouse leaving a key
  const handleMouseLeave = useCallback((note) => {
    if (mouseDownNote !== note.index) return;

    setActiveNotes(prev => {
      const next = new Set(prev);
      next.delete(note.index);
      return next;
    });
    playNoteEnd(note, null);
  }, [mouseDownNote]);

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  // Keyboard down handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;

      const key = e.key.toLowerCase();

      if (heldKeys.has(key)) return;

      // Find white key
      const whiteKeyIndex = WHITE_KEY_MAP.indexOf(key);
      if (whiteKeyIndex !== -1) {
        const whiteNotes = notes.filter(n => !n.isBlack);
        if (whiteKeyIndex < whiteNotes.length) {
          const note = whiteNotes[whiteKeyIndex];
          setHeldKeys(prev => new Set([...prev, key]));
          setActiveNotes(prev => new Set([...prev, note.index]));
          playNoteStart(note, null);
          onNoteClick?.(note);
        }
        return;
      }

      // Find black key
      const blackKeyIndex = BLACK_KEY_MAP.indexOf(key);
      if (blackKeyIndex !== -1 && BLACK_KEY_MAP[blackKeyIndex] !== '') {
        const blackNotes = notes.filter(n => n.isBlack);
        const adjustedIndex = blackKeyIndex - (blackKeyIndex > 4 ? 1 : 0);
        if (adjustedIndex < blackNotes.length) {
          const note = blackNotes[adjustedIndex];
          setHeldKeys(prev => new Set([...prev, key]));
          setActiveNotes(prev => new Set([...prev, note.index]));
          playNoteStart(note, null);
          onNoteClick?.(note);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notes, onNoteClick, heldKeys]);

  // Keyboard up handler
  useEffect(() => {
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();

      setHeldKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });

      // Find white key
      const whiteKeyIndex = WHITE_KEY_MAP.indexOf(key);
      if (whiteKeyIndex !== -1) {
        const whiteNotes = notes.filter(n => !n.isBlack);
        if (whiteKeyIndex < whiteNotes.length) {
          const note = whiteNotes[whiteKeyIndex];
          setActiveNotes(prev => {
            const next = new Set(prev);
            next.delete(note.index);
            return next;
          });
          playNoteEnd(note, null);
        }
        return;
      }

      // Find black key
      const blackKeyIndex = BLACK_KEY_MAP.indexOf(key);
      if (blackKeyIndex !== -1 && BLACK_KEY_MAP[blackKeyIndex] !== '') {
        const blackNotes = notes.filter(n => n.isBlack);
        const adjustedIndex = blackKeyIndex - (blackKeyIndex > 4 ? 1 : 0);
        if (adjustedIndex < blackNotes.length) {
          const note = blackNotes[adjustedIndex];
          setActiveNotes(prev => {
            const next = new Set(prev);
            next.delete(note.index);
            return next;
          });
          playNoteEnd(note, null);
        }
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [notes]);

  return (
    <div>
      <div className="volume-control-container" style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <label htmlFor="volume-slider" style={{ fontWeight: '500', minWidth: '60px' }}>
          Volume:
        </label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{ flex: 1, cursor: 'pointer' }}
        />
        <span style={{ minWidth: '40px', textAlign: 'right' }}>
          {Math.round(volume * 100)}%
        </span>
      </div>

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
                isActive={activeNotes.has(note.index)}
                isSelectableRoot={note.index < 12}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
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
                isActive={activeNotes.has(note.index)}
                isSelectableRoot={note.index < 12}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                keyboardLabel={getKeyboardLabel(note)}
              />
            ))}
          </div>
        </div>

        {showLegend && (
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color selectable-root"></div>
              Selectable Root Notes (Octave 1)
            </div>
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
    </div>
  );
};

export default Piano;