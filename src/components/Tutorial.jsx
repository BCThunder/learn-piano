import './styles.css';

const Tutorial = ({
  tutorialStep,
  selectedRoot,
  selectedScale,
  userNotes,
  notes,
  onShowMajorPattern,
  onShowMinorPattern,
  onStartPractice,
  onResetTutorial,
  scalePatterns
}) => {
  const renderStep = () => {
    switch (tutorialStep) {
      case 0:
        return (
          <div>
            <h2>Step 1: Choose Your Root Note</h2>
            <p>
              Every scale starts with a <strong>root note</strong>. This is the note that gives the scale its name.
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
              Great! Now let's learn about scale patterns. Scales are built using a pattern of intervals (semitones).
            </p>
            <div className="button-group">
              <button onClick={onShowMajorPattern} className="btn flex primary">
                Show Major Pattern
              </button>
              <button onClick={onShowMinorPattern} className="btn flex secondary">
                Show Minor Pattern
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2>Major Scale Pattern: 2-2-1-2-2-2-1</h2>
            <p>
              The major scale uses this pattern of semitones: <strong>2-2-1-2-2-2-1</strong>
            </p>
            <p>
              Starting from your root note ({notes.find(n => n.index === selectedRoot)?.name}),
              move up 2 semitones, then 2, then 1, then 2, then 2, then 2, then 1 to complete the scale.
            </p>
            <p className="tip">
              The highlighted keys below show the complete {notes.find(n => n.index === selectedRoot)?.name} major scale.
            </p>
            <div className="button-group">
              <button onClick={onShowMinorPattern} className="btn flex secondary">
                Show Minor Pattern
              </button>
              <button onClick={onStartPractice} className="btn flex success">
                Practice Building
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2>Minor Scale Pattern: 2-1-2-2-1-2-2</h2>
            <p>
              The natural minor scale uses this pattern: <strong>2-1-2-2-1-2-2</strong>
            </p>
            <p>
              Starting from your root note ({notes.find(n => n.index === selectedRoot)?.name}),
              move up 2 semitones, then 1, then 2, then 2, then 1, then 2, then 2 to complete the scale.
            </p>
            <p className="tip">
              The highlighted keys below show the complete {notes.find(n => n.index === selectedRoot)?.name} minor scale.
            </p>
            <div className="button-group">
              <button onClick={onShowMajorPattern} className="btn flex primary">
                Show Major Pattern
              </button>
              <button onClick={onStartPractice} className="btn flex success">
                Practice Building
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2>Now You Try!</h2>
            <p>
              Build a {notes.find(n => n.index === selectedRoot)?.name} {selectedScale} scale using the pattern: <strong>{scalePatterns[selectedScale].join('-')}</strong>
            </p>
            <p className="progress">
              Progress: {userNotes.length}/8 notes selected
            </p>
            <div className="progress-display">
              <div className="label">
                Your scale so far:
              </div>
              <div className="scale-notes">
                {userNotes.length === 0
                  ? 'Click the root note to start...'
                  : userNotes.map(i => notes.find(n => n.index === i)?.name).join(' → ')}
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

export default Tutorial;