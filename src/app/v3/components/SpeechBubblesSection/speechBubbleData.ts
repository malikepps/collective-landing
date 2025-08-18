export interface SpeechBubbleData {
  id: string;
  message: string;
  author: string;
  location: string;
  avatar: string;
  position: {
    desktop: { left: number; top: number; rotation?: number };
    mobile: { left: number; top: number; rotation: number };
  };
  animationPath?: string; // SVG path for offset-path animation
  pathRotation?: number; // Rotation degrees when following the path
}

// Helper function to create placeholder avatars using SVG data URIs (SSR-safe)
const createPlaceholderAvatar = (initials: string, color: string): string => {
  const svg = `
    <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="${color}"/>
      <text x="60" y="60" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
            fill="white" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// THREE DISTINCT ROWS with NO overlapping - FIRST 6 bubbles have mobile positions
export const speechBubbles: SpeechBubbleData[] = [
  // ========== MOBILE VISIBLE BUBBLES (1-6) ==========
  {
    id: 'bubble-1',
    message: 'Together we can change things 🤗🤗!',
    author: 'Anna',
    location: 'Berlin',
    avatar: createPlaceholderAvatar('A', '#FF6B6B'),
    position: {
      desktop: { left: -100, top: 80 }, // ROW 1 - Left (extends off-screen)
      mobile: { left: 20, top: 50, rotation: 0 } // MOBILE GRID POSITION 1 - START FLAT
    },
    animationPath: "M 215 41 C 215 41 280 5 280 5", // Gentle curve right and up
    pathRotation: -3 // Slight counter-clockwise rotation when animated
  },
  {
    id: 'bubble-2',
    message: 'How can I best help others in society?',
    author: 'Josef',
    location: 'Munich',
    avatar: createPlaceholderAvatar('J', '#4ECDC4'),
    position: {
      desktop: { left: 900, top: 80 }, // ROW 1 - Right
      mobile: { left: 20, top: 180, rotation: 0 } // MOBILE GRID POSITION 2 - START FLAT
    },
    animationPath: "M 189 36 C 189 36 60 -11 60 -11", // Curve left and up
    pathRotation: 3 // Clockwise rotation
  },
  {
    id: 'bubble-3',
    message: 'Where can I find social projects?',
    author: 'Jana',
    location: 'Hannover',
    avatar: createPlaceholderAvatar('JA', '#45B7D1'),
    position: {
      desktop: { left: 550, top: 220 }, // ROW 2 - Center
      mobile: { left: 20, top: 310, rotation: 0 } // MOBILE GRID POSITION 3 - START FLAT
    },
    animationPath: "M 179 36 C 179 36 169 -34 169 -34", // Curve up
    pathRotation: 2 // Clockwise rotation
  },
  {
    id: 'bubble-4',
    message: 'As a privileged person, I want to give back!',
    author: 'Maria',
    location: 'Hannover',
    avatar: createPlaceholderAvatar('M', '#BB8FCE'),
    position: {
      desktop: { left: 150, top: 360 }, // ROW 3 - Left
      mobile: { left: 20, top: 440, rotation: 0 } // MOBILE GRID POSITION 4 - START FLAT
    },
    animationPath: "M 204 36 C 204 36 295 -12 295 -12", // Curve right and up
    pathRotation: 1 // Slight clockwise
  },
  {
    id: 'bubble-5',
    message: 'I want meaning. Not 😾 cat videos!',
    author: 'Katja',
    location: 'Weyarn',
    avatar: createPlaceholderAvatar('K', '#F7DC6F'),
    position: {
      desktop: { left: 650, top: 360 }, // ROW 3 - Center
      mobile: { left: 20, top: 570, rotation: 0 } // MOBILE GRID POSITION 5 - START FLAT
    },
    animationPath: "M 180 36 C 180 36 188 0 188 0", // Curve up
    pathRotation: -3 // Counter-clockwise rotation
  },
  {
    id: 'bubble-6',
    message: 'Life is busy! But I want to help too.',
    author: 'Robert',
    location: 'Berlin',
    avatar: createPlaceholderAvatar('R', '#82E0AA'),
    position: {
      desktop: { left: 1150, top: 360 }, // ROW 3 - Right
      mobile: { left: 20, top: 700, rotation: 0 } // MOBILE GRID POSITION 6 - START FLAT
    },
    animationPath: "M 189 36 C 189 36 154 18 154 18", // Curve right and down
    pathRotation: 2 // Clockwise rotation
  },

  // ========== DESKTOP ONLY BUBBLES (7-12) - Hidden on mobile ==========
  {
    id: 'bubble-7',
    message: 'This 🌏 planet is our home. We have to protect it!',
    author: 'Anna',
    location: 'Frankfurt',
    avatar: createPlaceholderAvatar('AN', '#FF8A80'),
    position: {
      desktop: { left: 400, top: 80 }, // ROW 1 - Center
      mobile: { left: -9999, top: -9999, rotation: 0 } // Hidden off-screen on mobile
    },
    animationPath: "M 215 41 C 215 41 185 -30 185 -30", // Curve left and up
    pathRotation: 2 // Slight clockwise rotation
  },
  {
    id: 'bubble-8',
    message: "I don't know what I can do 🤷 ...",
    author: 'Xi',
    location: 'Hamburg',
    avatar: createPlaceholderAvatar('X', '#A5D6A7'),
    position: {
      desktop: { left: 50, top: 220 }, // ROW 2 - Left
      mobile: { left: -9999, top: -9999, rotation: 0 } // Hidden off-screen on mobile
    },
    animationPath: "M 215 41 C 215 41 295 -12 295 -12", // Curve right and up
    pathRotation: -2 // Counter-clockwise rotation
  },
  {
    id: 'bubble-9',
    message: 'Community over competition 💪',
    author: 'Max',
    location: 'Zurich',
    avatar: createPlaceholderAvatar('MX', '#CE93D8'),
    position: {
      desktop: { left: 1050, top: 220 }, // ROW 2 - Right
      mobile: { left: -9999, top: -9999, rotation: 0 } // Hidden off-screen on mobile
    },
    animationPath: "M 189 36 C 189 36 140 -21 140 -21", // Curve left and up
    pathRotation: -1 // Slight counter-clockwise
  },
  {
    id: 'bubble-10',
    message: 'Small actions create big changes! 🌱',
    author: 'Lisa',
    location: 'Vienna',
    avatar: createPlaceholderAvatar('L', '#FF9999'),
    position: {
      desktop: { left: 1400, top: 80 }, // ROW 1 - Far right
      mobile: { left: -9999, top: -9999, rotation: 0 } // Hidden off-screen on mobile
    },
    animationPath: "M 215 41 C 215 41 129 -14 129 -14", // Curve left and up
    pathRotation: -2 // Counter-clockwise
  },
  {
    id: 'bubble-11',
    message: 'Every voice matters in our community 🗣️',
    author: 'David',
    location: 'Prague',
    avatar: createPlaceholderAvatar('D', '#99CCFF'),
    position: {
      desktop: { left: -450, top: 220 }, // ROW 2 - Far left
      mobile: { left: -9999, top: -9999, rotation: 0 } // Hidden off-screen on mobile
    },
    animationPath: "M 215 41 C 215 41 278 -13 278 -13", // Curve right and up
    pathRotation: 3 // Strong clockwise rotation
  },
  {
    id: 'bubble-12',
    message: 'Building bridges, not walls 🌉',
    author: 'Sofia',
    location: 'Barcelona',
    avatar: createPlaceholderAvatar('S', '#FFCC99'),
    position: {
      desktop: { left: -300, top: 360 }, // ROW 3 - Far left
      mobile: { left: -9999, top: -9999, rotation: 0 } // Hidden off-screen on mobile
    },
    animationPath: "M 215 41 C 215 41 254 14 254 14", // Curve right and down
    pathRotation: -1 // Slight counter-clockwise
  }
];