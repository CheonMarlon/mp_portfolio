/*
 * Edit your projects here.
 *  shots:       image paths, relative to index.html
 *  video:       optional YouTube video ID; adds a "Demo" tab to the project
 *  videoPoster: optional image path for the video thumbnail (defaults to YouTube's)
 *  note:        optional short status label shown in place of missing links
 */
export const PROJECTS = [
  {
    n: '01',
    year: '2025 – Present',
    role: 'Full-Stack Developer · Capstone Project',
    does: [
      'Next.js administration dashboard',
      'Node.js, TypeScript and Express backend',
      'Supabase database integration',
      'React Native resident mobile application',
      'Automated PDF document generation',
      'Supabase-backed push notifications',
      'Bilingual (Tagalog/English) knowledge base interface',
      'Mobile app debugging and reliability improvements',
    ],
    title: 'BRGY-AI',
    sub: 'RAG-Based Legal Information & Dispute Resolution Assistant',
    desc: 'An AI-powered platform designed to help barangay officials access legal information and prepare documents for dispute resolution.',
    tech: ['Next.js', 'React Native', 'Node.js', 'TypeScript', 'Express', 'Supabase'],
    links: { github: '', live: '' },
    note: 'Private project',
    video: 'fNvApzsw3js', // YouTube video ID (optional)
    views: {
      web: {
        label: 'Admin dashboard',
        shots: [
          'assets/images/projects/brgy-ai-dashboard.png',
          'assets/images/projects/brgy-ai-login.png',
        ],
      },
      mobile: {
        label: 'Resident app',
        shots: [
          'assets/images/projects/brgy-ai-mobile-login.jpg',
          'assets/images/projects/brgy-ai-mobile-home.jpg',
          'assets/images/projects/brgy-ai-mobile-library.jpg',
          'assets/images/projects/brgy-ai-mobile-chat.jpg',
          'assets/images/projects/brgy-ai-mobile-complaint.jpg',
        ],
      },
    },
  },
  {
    n: '02',
    year: '2026',
    role: 'Sole Developer',
    does: [
      'Designed and developed the frontend',
      'Firebase Firestore integration',
      'Anonymous letter submission',
      'Letter discovery, pagination and randomized browsing',
      'Archive functionality',
      'Deployment on an Azure Virtual Machine',
    ],
    title: 'Dear Stranger',
    sub: 'Anonymous Letter Sharing Platform',
    desc: 'A web platform where people can anonymously write, discover, and read letters from strangers.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase Firestore', 'Azure'],
    links: {
      github: 'https://github.com/CheonMarlon/dear-stranger',
      live: 'https://dear-stranger-orpin.vercel.app/',
    },
    views: {
      web: {
        label: 'Web app',
        shots: [
          'assets/images/projects/dear-stranger-hero.png',
          'assets/images/projects/dear-stranger-letter.png',
        ],
      },
    },
  },
  {
    n: '03',
    year: '2026',
    role: 'Sole Developer',
    does: [
      'Native Android development',
      'Mobile interface implementation',
      'Interactive astronomical coordinate presentation',
    ],
    title: 'OBStellar',
    sub: 'Constellation Coordinate Viewer',
    desc: 'A native Android application for viewing and exploring the coordinates of real-world constellations.',
    tech: ['Kotlin', 'Android'],
    links: { github: '', live: '' },
    note: 'Private repository · APK coming soon',
    views: {
      mobile: {
        label: 'Android app',
        shots: [
          'assets/images/projects/obstellar-home.jpg',
          'assets/images/projects/obstellar-info.jpg',
          'assets/images/projects/obstellar-telescope.jpg',
        ],
      },
    },
  },
];