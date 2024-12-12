import { useEffect, useState } from 'react';

const useTypingEffect = (text, typingSpeed = 100, pauseDuration = 1000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let index = 0;
        let typingTimeout;
        let pauseTimeout;

        const typeNextLetter = () => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index += 1;
                typingTimeout = setTimeout(typeNextLetter, typingSpeed);
            } else {
                // After typing the full sentence, pause before erasing
                pauseTimeout = setTimeout(() => {
                    setIsTyping(false); // Switch to erasing phase
                }, pauseDuration);
            }
        };

        const eraseText = () => {
            if (index > 0) {
                setDisplayedText((prev) => prev.slice(0, -1));
                index -= 1;
                typingTimeout = setTimeout(eraseText, typingSpeed);
            } else {
                // Once erasing is done, pause and switch to typing the next sentence
                pauseTimeout = setTimeout(() => {
                    setIsTyping(true); // Switch to typing phase
                }, pauseDuration);
            }
        };

        // Start typing if we're in the typing phase, otherwise start erasing
        if (isTyping) {
            index = 0; // Reset index when typing a new sentence
            setDisplayedText(''); // Clear text before starting to type
            typeNextLetter();
        } else {
            index = text.length; // Start erasing from the full sentence
            eraseText();
        }

        // Cleanup the timeouts on unmount or when the text changes
        return () => {
            clearTimeout(typingTimeout);
            clearTimeout(pauseTimeout);
        };
    }, [text, typingSpeed, pauseDuration, isTyping]);

    return displayedText;
};

export default useTypingEffect;