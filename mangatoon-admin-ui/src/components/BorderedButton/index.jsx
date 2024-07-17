import { useState } from 'react';

function BorderedButton({ 
    children,
    color = '#F08121',
    hvColor = 'white',
    bg = 'transparent',
    hvBg = '#F08121',
    bdColor = '#F08121',
    onClick = e => {}
}) {
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        color: isHovered ? hvColor : color,
        backgroundColor: isHovered ? hvBg : bg,
        borderColor: bdColor,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    return (
        <button
            className='block px-4 py-1 rounded-[4px] border-[1px]'
            style={styles}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </button>
    )
}

export default BorderedButton;
