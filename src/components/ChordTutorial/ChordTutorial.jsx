import '../Tutorial/Tutorial.css';

const ChordTutorial = ({
  tutorialStep,
  selectedRoot,
  selectedChord,
  userNotes,
  notes,
  feedback,
  waitingForContinue,
  onShowMajorPattern,
  onShowMinorPattern,
  onStartPractice,
  onStartOver,
  onResetTutorial,
  chordPatterns
}) => {
  const renderStep = () => {
    switch (tutorialStep) {
      case 0:
        return (
          <div>
            <h2>Step 1: Choose Your Root Note</h2>
            <p>
              Every chord starts with a <strong>root note</strong>. This is the note that gives the chord its name.
              Click any key on the piano below or press a key on your keyboard to choose your root note.
            </p>
            <p className="tip">
              💡 Tip: Try starting with C (the 'A' key) - it's the easiest!
            </p>
          </div>
        );

      case 1:
        return (
          <div>
            <h2>Root Note Selected: {notes.find(n => n.index === selectedRoot)?.name}</h2>
            <p>
              Great! Now let's learn about chords. Chords are built by playing multiple notes simultaneously.
            </p>
            <p className="tip">
              💡 You can still change your root note by clicking any highlighted key in the lower octave before selecting a chord type.
            </p>
            <div className="button-group">
              <button onClick={onShowMajorPattern} className="btn flex primary">
                Show Major Chord
              </button>
              <button onClick={onShowMinorPattern} className="btn flex secondary">
                Show Minor Chord
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2>Major Chord Pattern: Root + Major 3rd + Perfect 5th</h2>
            <p>
              A major chord uses this pattern: <strong>0-4-7 semitones</strong>
            </p>
            <p>
              Starting from your locked root note ({notes.find(n => n.index === selectedRoot)?.name}),
              add a major 3rd (4 semitones up) and a perfect 5th (7 semitones up) to create a bright, happy sound.
            </p>
            <p className="tip">
              The highlighted keys below show the complete {notes.find(n => n.index === selectedRoot)?.name} major chord.
            </p>
            <div className="button-group">
              <button onClick={onShowMinorPattern} className="btn flex secondary">
                Show Minor Chord
              </button>
              <button onClick={onStartPractice} className="btn flex success">
                Practice Building
              </button>
              <button onClick={onStartOver} className="btn flex neutral">
                Start Over
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2>Minor Chord Pattern: Root + Minor 3rd + Perfect 5th</h2>
            <p>
              A minor chord uses this pattern: <strong>0-3-7 semitones</strong>
            </p>
            <p>
              Starting from your locked root note ({notes.find(n => n.index === selectedRoot)?.name}),
              add a minor 3rd (3 semitones up) and a perfect 5th (7 semitones up) to create a sad, darker sound.
            </p>
            <p className="tip">
              The highlighted keys below show the complete {notes.find(n => n.index === selectedRoot)?.name} minor chord.
            </p>
            <div className="button-group">
              <button onClick={onShowMajorPattern} className="btn flex primary">
                Show Major Chord
              </button>
              <button onClick={onStartPractice} className="btn flex success">
                Practice Building
              </button>
              <button onClick={onStartOver} className="btn flex neutral">
                Start Over
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2>Now You Try!</h2>
            <p>
              Build a {notes.find(n => n.index === selectedRoot)?.name} {selectedChord} chord using the pattern: <strong>{chordPatterns[selectedChord].join('-')}</strong> semitones
            </p>
            <p className="progress">
              Progress: {userNotes.length}/3 notes selected
            </p>
            <div className="progress-display">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div className="label">
                    Your chord so far:
                  </div>
                  <div className="scale-notes">
                    {userNotes.length === 0
                      ? 'Click the root note to start...'
                      : userNotes.map(i => notes.find(n => n.index === i)?.name).join(' + ')}
                  </div>
                </div>
                {feedback && (
                  <div style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    backgroundColor: feedback === 'success' ? '#4caf50' : '#f44336',
                    color: 'white',
                    minWidth: '200px',
                    textAlign: 'center'
                  }}>
                    <div>
                      {feedback === 'success'
                        ? '🎉 Perfect! You built the chord correctly!'
                        : '❌ Not quite right. Try again!'}
                    </div>
                    {waitingForContinue && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '0.9em',
                        fontWeight: 'normal',
                        fontStyle: 'italic'
                      }}>
                        Press any key to continue
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button onClick={onResetTutorial} className="btn full-width neutral">
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card tutorial">
      {renderStep()}
    </div>
  );
};

export default ChordTutorial;
