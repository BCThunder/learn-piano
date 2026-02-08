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
            <h2 style={{ margin: '0 0 15px 0', fontSize: '24px', color: '#1a1a1a' }}>
              Step 1: Choose Your Root Note
            </h2>
            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.6' }}>
              Every scale starts with a <strong>root note</strong>. This is the note that gives the scale its name.
              Click any key on the piano below or press a key on your keyboard to choose your root note.
            </p>
            <p style={{ margin: '10px 0 0 0', color: '#999', fontSize: '14px' }}>
              💡 Tip: Try starting with C (the 'A' key) - it's the easiest!
            </p>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '24px', color: '#1a1a1a' }}>
              Root Note Selected: {notes.find(n => n.index === selectedRoot)?.name}
            </h2>
            <p style={{ margin: '0 0 15px 0', color: '#666', lineHeight: '1.6' }}>
              Great! Now let's learn about scale patterns. Scales are built using a pattern of intervals (semitones).
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={onShowMajorPattern} style={{
                flex: 1,
                padding: '15px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'}>
                Show Major Pattern
              </button>
              <button onClick={onShowMinorPattern} style={{
                flex: 1,
                padding: '15px',
                background: '#764ba2',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
                onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.target.style.transform = 'scale(1)'}>
                Show Minor Pattern
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '24px', color: '#1a1a1a' }}>
              Major Scale Pattern: 2-2-1-2-2-2-1
            </h2>
            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.6' }}>
              The major scale uses this pattern of semitones: <strong>2-2-1-2-2-2-1</strong>
            </p>
            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.6' }}>
              Starting from your root note ({notes.find(n => n.index === selectedRoot)?.name}),
              move up 2 semitones, then 2, then 1, then 2, then 2, then 2, then 1 to complete the scale.
            </p>
            <p style={{ margin: '10px 0', color: '#999', fontSize: '14px' }}>
              The highlighted keys below show the complete {notes.find(n => n.index === selectedRoot)?.name} major scale.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={onShowMinorPattern} style={{
                flex: 1,
                padding: '15px',
                background: '#764ba2',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Show Minor Pattern
              </button>
              <button onClick={onStartPractice} style={{
                flex: 1,
                padding: '15px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Practice Building
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '24px', color: '#1a1a1a' }}>
              Minor Scale Pattern: 2-1-2-2-1-2-2
            </h2>
            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.6' }}>
              The natural minor scale uses this pattern: <strong>2-1-2-2-1-2-2</strong>
            </p>
            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.6' }}>
              Starting from your root note ({notes.find(n => n.index === selectedRoot)?.name}),
              move up 2 semitones, then 1, then 2, then 2, then 1, then 2, then 2 to complete the scale.
            </p>
            <p style={{ margin: '10px 0', color: '#999', fontSize: '14px' }}>
              The highlighted keys below show the complete {notes.find(n => n.index === selectedRoot)?.name} minor scale.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={onShowMajorPattern} style={{
                flex: 1,
                padding: '15px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Show Major Pattern
              </button>
              <button onClick={onStartPractice} style={{
                flex: 1,
                padding: '15px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Practice Building
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '24px', color: '#1a1a1a' }}>
              Now You Try!
            </h2>
            <p style={{ margin: '0 0 10px 0', color: '#666', lineHeight: '1.6' }}>
              Build a {notes.find(n => n.index === selectedRoot)?.name} {selectedScale} scale using the pattern: <strong>{scalePatterns[selectedScale].join('-')}</strong>
            </p>
            <p style={{ margin: '10px 0 15px 0', color: '#999', fontSize: '14px' }}>
              Progress: {userNotes.length}/8 notes selected
            </p>
            <div style={{
              background: '#f3f4f6',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '15px'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                Your scale so far:
              </div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>
                {userNotes.length === 0
                  ? 'Click the root note to start...'
                  : userNotes.map(i => notes.find(n => n.index === i)?.name).join(' → ')}
              </div>
            </div>
            <button onClick={onResetTutorial} style={{
              width: '100%',
              padding: '15px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
      maxWidth: '800px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    }}>
      {renderStep()}
    </div>
  );
};

export default Tutorial;