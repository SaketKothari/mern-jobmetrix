import { useState, useEffect, useRef } from "react";
import Wrapper from "../assets/wrappers/DailyQuote";

// Sample quotes data
const quotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
  {
    quote: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
  },
  { quote: "Great things never come from comfort zones.", author: "Unknown" },
  { quote: "Dream it. Wish it. Do it.", author: "Unknown" },
  {
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
  },
  {
    quote:
      "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  {
    quote: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
  },
  {
    quote: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown",
  },
  {
    quote: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery",
  },
  { quote: "Little things make big days.", author: "Unknown" },
];

const DailyQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const getRandomQuote = () => {
    setIsAnimating(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Set initial quote immediately
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!currentQuote) return null;

  const isLongQuote = currentQuote.quote.length >= 100;

  return (
    <Wrapper>
      <div
        className={`quote-container ${isAnimating ? "fade-out" : "fade-in"}`}
      >
        <div className="quote-icon-wrapper">
          <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
        </div>

        <div className={`quote-text ${isLongQuote ? "long-quote" : ""}`}>
          {currentQuote.quote}
        </div>

        <div className="quote-author">— {currentQuote.author}</div>

        <div className="button-container">
          <button className="btn-quote" onClick={getRandomQuote}>
            <svg
              className="refresh-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            New Quote
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default DailyQuote;
