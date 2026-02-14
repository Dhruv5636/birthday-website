// ============================================
// 🦄 YOUR MAGICAL STORY BOOK 🦄
// ============================================

const CONFIG = {
    // 🎨 THEME COLORS: "pink", "blue", "purple", "dark"
    theme: "pink", 

    // Basic Info
    pageTitle: "Happy Birthday Sophie! 🎈",
    popupTitle: "Hey Beautiful...",
    popupText: "I made a little magical world for you.",
    openingBtn: "Enter Magic World ✨",

    // Music
    musicTitle: "Our Song",
    musicArtist: "Favorite Track",
    musicFile: "music/bg-music.mp3", 

    // 👤 Hero Section (Avatar Photo)
    heroAvatar: "images/avatar.svg", // Put a cute photo here (circle crop)
    heroTitle: "Happy Birthday, Princess 👑",
    heroMsg: "Welcome to your personal scrapbook.",

    // 🚀 Timeline Section
    timeline: [
        { date: "Nov 15, 2023", title: "The Day We Met", desc: "I knew you were special the moment I saw you." },
        { date: "Dec 25, 2023", title: "First Christmas", desc: "Our first holiday together. Best gift ever." },
        { date: "Feb 14, 2024", title: "Valentine's Day", desc: "You looked absolutely stunning." },
        { date: "Today", title: "Your Special Day", desc: "Celebrating the most amazing person on earth." }
    ],

    // 📸 Gallery Section
    gallery: [
        "image1.svg", "image2.svg", "image3.svg", "image4.svg", "image5.svg"
    ],

    // ❓ FUN QUIZ Section
    quizTitle: "How well do you remember? 🤔",
    quiz: [
        {
            question: "Where was our first date?",
            options: ["The Coffee Shop", "The Movies", "The Park", "Dinner"],
            correct: 0,
            feedback: "Correct! You owe me a coffee 😉"
        },
        {
            question: "What is my favorite thing about you?",
            options: ["Your Eyes", "Your Smile", "Your Laugh", "Everything"],
            correct: 3,
            feedback: "Exactly! I love everything about you. ❤️"
        }
    ],

    // 💌 OPEN WHEN Cards
    openWhen: [
        { label: "Open when you miss me", message: "Call me right now! I probably miss you too. (000-000-0000) ❤️" },
        { label: "Open when you're sad", message: "Remember that you are loved, you are strong, and I am always here for you." },
        { label: "Open when you need a laugh", message: "Remember that time I walked into the glass door? yeah..." },
    ],

    // 🎟️ Love Coupons
    coupons: [
        { title: "Massage Ticket", desc: "Redeem for a 30-min back massage." },
        { title: "Movie Night", desc: "You pick the movie & snacks." },
        { title: "Dinner Date", desc: "I'm paying (and driving)!" },
    ],

    // 💌 Final Long Letter
    letterTitle: "A Promise to You 💍",
    letterBody: "My Dearest,<br><br>I wanted to create something that reminds you of how much you mean to me. You are my happiness, my peace, and my greatest adventure.<br><br>Every day with you feels like a gift. I hope this year brings you as much joy as you bring me.<br><br>I love you endlessly. ❤️"
};
