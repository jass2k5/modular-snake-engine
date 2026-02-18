🐍 Modular Snake: A Professional Web Build
A high-performance, arcade-style Snake game built with a Modular SCSS Architecture and a Robust JavaScript Engine.

🚀 Key Features
Persistent High Scores: Saves your best performance using localStorage.

Adaptive Grid Logic: The game board dynamically calculates rows and columns based on the real-time browser window size.

Dual-Interval Engine: Handles movement logic and a survival clock (MM-SS) independently for zero timing drift.

Modular Styling: Built with SASS @use and @forward rules for clean, maintainable code.

🧠 JavaScript Architecture
The logic focuses on clean state management and "Single Source of Truth" variables.

🛠 Technical Implementation
Memory Management: Uses Number(localStorage.getItem('highscore') ?? 0) to ensure type safety. The Nullish Coalescing operator (??) prevents errors during the first-ever load when the data is null.

The "Babylonian" Clock: Converts a linear seconds counter into a sexagesimal (Base-60) format using Math.floor and the Modulo (%) operator.

UI Stability: Utilizes String.padStart(2, '0') to prevent layout jumps by ensuring a constant character width for the timer.

🎨 Styling & SASS Structure
The project follows the 7-1 Pattern for modularity, separating variables, mixins, and component logic.

Responsive Units: Uses clamp() and vh for typography to ensure the UI scales perfectly on all screen heights.

Grid System: Leverages CSS Grid with auto-fill and minmax(40px, 1fr) to create a flexible, pixel-perfect game board.

Mixins: A custom @mixin flex-gap centralizes layout logic, making the "Information Bar" easily adjustable.

📁 File Organization
Plaintext
DYNAMIC-SNAKE/
├── utils/        # Variables, Mixins, and Fonts
├── sections/     # Modular styles for Grid, Info Bar, and Body
└── css/     # converted scss
└── index.html # main html
└── style.scss     # The Master Entry Point
└── script.js     # for js
🔮 Roadmap: UI Customization (Coming Soon!)
We are currently working on a massive Customization Engine that will allow players to tailor the game to their preference:

🎨 Color Themes: Switch between Dark, Light, and Neon "Snake Skins."

📐 Shape Morphing: Choose between Square, Rounded, or Classic Arcade block styles.

⚡ Difficulty Levels: Adjustable speeds and grid sizes (Easy, Medium, and "God Mode").

⚙️ Dynamic Sizing: Change block dimensions directly from the settings menu.