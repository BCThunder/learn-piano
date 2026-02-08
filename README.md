# Scale Builder - Interactive Music Theory Web App

A gamified web application for learning music scales, built with React. This app teaches users the pattern-based approach to building major and minor scales through an interactive piano interface.

## Features

### Current Implementation
- **Interactive 2-Octave Piano**: Click keys or use your keyboard to play notes
- **Guided Tutorial System**: Step-by-step introduction to scale patterns
  - Root note selection
  - Major scale pattern (2-2-1-2-2-2-1)
  - Minor scale pattern (2-1-2-2-1-2-2)
  - Practice mode with real-time feedback
- **Web Audio API**: Real piano sound synthesis
- **Keyboard Controls**: 
  - White keys: A S D F G H J K L ; '
  - Black keys: W E T Y U I O P
- **Visual Feedback**: Color-coded highlighting for root notes, scale notes, and user selections
- **Responsive Design**: Clean, modern, minimalist interface

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)

### Option 2: Local Development Server
If you want to develop further:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000
```

## How It Works

### Tutorial Flow
1. **Step 1**: User selects a root note (e.g., C)
2. **Step 2**: Choose to view major or minor scale pattern
3. **Step 3**: See the pattern visualization with highlighted keys
4. **Step 4**: Practice building the scale yourself with validation

### Technical Highlights for Portfolio

This project demonstrates several key front-end skills:

**State Management**
- Complex state orchestration with multiple useState hooks
- Tutorial progression system
- User input tracking and validation

**Interactive UI**
- Click and keyboard event handling
- Real-time visual feedback
- Hover effects and transitions

**Web APIs**
- Web Audio API for sound synthesis
- Frequency calculation for musical notes
- Oscillator and gain node manipulation

**Code Organization**
- Clean component structure
- Reusable helper functions
- Proper event cleanup with useEffect

## Future Enhancements

Here are ideas to expand this project and showcase more skills:

### Immediate Additions
1. **More Scale Types**
   - Harmonic minor (2-1-2-2-1-3-1)
   - Melodic minor (2-1-2-2-2-2-1)
   - Pentatonic scales
   - Modal scales (Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)

2. **Visual Pattern Display**
   - Show numbers between keys indicating semitone jumps
   - Animated progression as scale builds
   - Pattern comparison view

3. **Better Audio**
   - More realistic piano samples (use Tone.js library)
   - Option to play the full scale automatically
   - Volume control

### Gamification Features
4. **Scoring System**
   - Points for correct scales
   - Speed bonuses
   - Accuracy tracking
   - Streaks for consecutive correct answers

5. **Challenge Modes**
   - Timed challenges: Build X scales in Y minutes
   - Random scale generator
   - "Quiz mode": Hear a scale, identify the type
   - Progression system (unlock harder scales)

6. **Progress Tracking**
   - LocalStorage for saving progress
   - Statistics dashboard
   - Achievement badges
   - Level system

### Advanced Features
7. **Ear Training Integration**
   - Play scale, user identifies by ear
   - Interval recognition
   - Scale degree identification

8. **Multiplayer/Social**
   - Leaderboard (would need backend)
   - Share achievements
   - Daily challenges

9. **Additional Visualizations**
   - Guitar fretboard mode
   - Circle of fifths integration
   - Staff notation display

10. **Accessibility**
    - Screen reader support
    - Keyboard navigation improvements
    - Color blind friendly modes
    - Adjustable text sizes

### Technical Improvements
11. **State Management**
    - Migrate to useReducer or Context API
    - Consider Redux for more complex state

12. **Animations**
    - Framer Motion for smooth transitions
    - Celebration effects on correct answers
    - Progress bar animations

13. **Testing**
    - Unit tests with Jest
    - Component tests with React Testing Library
    - E2E tests with Cypress

14. **Build Setup**
    - Create React App or Vite setup
    - TypeScript conversion
    - ESLint and Prettier configuration

15. **Deployment**
    - Deploy to Netlify/Vercel
    - Set up CI/CD
    - Custom domain

## Technologies Used

- **React 18**: Component-based UI
- **Web Audio API**: Sound synthesis
- **Vanilla CSS**: Styling with modern properties
- **ES6+**: Modern JavaScript features

## Code Structure

```
scale-builder.jsx       # Main React component (standalone)
index.html             # Complete single-file app (ready to run)
```

The `index.html` file includes everything needed to run the app - no build process required. This makes it perfect for quick demos and sharing.

## Customization Ideas

**Color Schemes**
- Change the gradient background
- Adjust key colors for different states
- Dark mode support

**Layout**
- Mobile-first responsive design
- Tablet-optimized view
- Portrait/landscape adaptations

**Content**
- Add more theory explanations
- Include video tutorials
- Provide practice exercises

## Portfolio Tips

When showcasing this project:

1. **Demo It Live**: Host it on GitHub Pages, Netlify, or Vercel
2. **Write About Your Process**: Document your design decisions
3. **Show the Code**: Clean, well-commented code on GitHub
4. **Explain the Learning**: What challenges did you face? What did you learn?
5. **Iterate**: Pick 2-3 enhancements from the list above and implement them

## Learning Resources

To continue building your skills:

- [React Documentation](https://react.dev)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Music Theory Basics](https://www.musictheory.net/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tone.js](https://tonejs.github.io/) for better audio

## License

Feel free to use this as a starting point for your portfolio project!

---

**Built with React** | **No dependencies required** | **Ready to deploy**