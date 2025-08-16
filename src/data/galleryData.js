// Gallery Data - Carnival and Magazine information

// Import carnival images with proper paths for production
const importCarnivalImages = (carnivalVersion, count) => {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push({
      src: `/images/carnivals/Carnival ${carnivalVersion}.0/carnival_${carnivalVersion}_img_${i}.jpg`,
      alt: `AUST CSE Carnival ${carnivalVersion}.0 - Memory ${i}`,
      id: `carnival_${carnivalVersion}_${i}`,
      thumbnail: `/images/carnivals/Carnival ${carnivalVersion}.0/carnival_${carnivalVersion}_img_${i}.jpg`
    });
  }
  return images;
};

// Enhanced carnival data with comprehensive information
export const carnivalData = {
  "1.0": {
    title: "Integer 43",
    subtitle: "The Pioneer Journey Begins",
    description: "The very first AUST CSE Carnival that started our amazing tradition of innovation and technology celebration.",
    year: "2021",
    gradient: "linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-accent-dark) 100%)",
    accentColor: "#403168",
    icon: "rocket",
    position: "left",
    images: importCarnivalImages("1", 18),
    stats: { photos: 18, events: 5, participants: "500+", duration: "3 days" },
    highlights: ["First Ever Carnival", "Programming Contest", "Tech Exhibition"]
  },
  "2.0": {
    title: "Decipher 44",
    subtitle: "Continuing the Legacy",
    description: "Building upon our foundation with expanded events and greater participation from the tech community.",
    year: "2022",
    gradient: "linear-gradient(135deg, var(--color-accent-dark) 0%, var(--color-accent-bright) 100%)",
    accentColor: "#8e3795",
    icon: "target",
    position: "right",
    images: importCarnivalImages("2", 6),
    stats: { photos: 6, events: 6, participants: "750+", duration: "3 days" },
    highlights: ["UI/UX Competition", "Hackathon", "AI Workshop"]
  },
  "3.0": {
    title: "Qubits 45",
    subtitle: "Setting New Benchmarks",
    description: "A quantum leap in carnival excellence with cutting-edge competitions and industry partnerships.",
    year: "2023",
    gradient: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary-dark) 100%)",
    accentColor: "#325666",
    icon: "star",
    position: "left",
    images: importCarnivalImages("3", 8),
    stats: { photos: 8, events: 7, participants: "1000+", duration: "4 days" },
    highlights: ["Quantum Computing", "Robotics Showcase", "Startup Pitch"]
  },
  "4.0": {
    title: "Carnival 4.0",
    subtitle: "Innovation at Its Peak",
    description: "The fourth iteration brought revolutionary changes with international participation and advanced tech demos.",
    year: "2024",
    gradient: "linear-gradient(135deg, var(--color-accent-bright) 0%, var(--color-accent-dark) 100%)",
    accentColor: "#0b0146",
    icon: "tent",
    position: "right",
    images: importCarnivalImages("4", 10),
    stats: { photos: 10, events: 8, participants: "1200+", duration: "4 days" },
    highlights: ["International Speakers", "VR/AR Demos", "Blockchain Workshop"]
  },
  "5.0": {
    title: "Carnival 5.0",
    subtitle: "The Future is Here",
    description: "Our most ambitious carnival yet, showcasing the latest in AI, machine learning, and emerging technologies.",
    year: "2025",
    gradient: "linear-gradient(135deg, var(--color-secondary-dark) 0%, var(--color-accent-bright) 100%)",
    accentColor: "#420605",
    icon: "sparkles",
    position: "left",
    images: importCarnivalImages("5", 12),
    stats: { photos: 12, events: 10, participants: "1500+", duration: "5 days" },
    highlights: ["AI Revolution", "Metaverse Expo", "Global Tech Summit"]
  }
};

// Magazine data with links
export const magazineData = [
  {
    id: 1,
    title: "AUST CSE Spring 2022",
    year: "2023",
    color: "#2ec095",
    link: "https://www.aust.edu/cse/departmental_activities/1643",
    description: "Carnival Edition 1",
    publishDate: "March 2023"
  },
  {
    id: 2,
    title: "AUST CSE Fall 2022",
    year: "2023",
    color: "#03624c",
    link: "https://www.aust.edu/cse/departmental_activities/1958",
    description: "Carnival Edition 2",
    publishDate: "September 2023"
  },
  {
    id: 3,
    title: "AUST CSE Spring 2023",
    year: "2024",
    color: "#042222",
    link: "#",
    description: "Carnival Edition 3",
    publishDate: "March 2024"
  },
  {
    id: 4,
    title: "AUST CSE Fall 2023",
    year: "2024",
    color: "#2ec095",
    link: "https://www.aust.edu/cse/departmental_activities/2467",
    description: "Carnival Edition 4",
    publishDate: "September 2024"
  }
];
