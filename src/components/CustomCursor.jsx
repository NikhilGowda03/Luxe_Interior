import React, { useEffect, useState } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            // Delayed dot for fluid movement
            setTimeout(() => {
                setDotPosition({ x: e.clientX, y: e.clientY });
            }, 50);
        };

        const handleHover = (e) => {
            if (e.target.closest('a, button, .project-luxury-card, .service-luxury-card, .team-item')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <>
            <div 
                className={`cursor-ring ${isHovering ? 'hover' : ''}`} 
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
            <div 
                className={`cursor-dot ${isHovering ? 'hover' : ''}`} 
                style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
            ></div>
        </>
    );
};

export default CustomCursor;
