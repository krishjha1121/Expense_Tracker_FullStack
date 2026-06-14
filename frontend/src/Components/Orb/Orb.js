import React from 'react';
import styled, { keyframes } from 'styled-components';

import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize();

    return (
        <OrbStyled
            $moveX={width}
            $moveY={height / 2}
        />
    );
}

const moveOrb = keyframes`
    0% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(var(--move-x), var(--move-y));
    }

    100% {
        transform: translate(0, 0);
    }
`;

const OrbStyled = styled.div`
    --move-x: ${props => props.$moveX}px;
    --move-y: ${props => props.$moveY}px;

    width: 70vh;
    height: 70vh;

    position: absolute;

    border-radius: 50%;

    margin-left: -37vh;
    margin-top: -37vh;

    background: linear-gradient(
        180deg,
        #f56692 0%,
        #f2994a 100%
    );

    filter: blur(400px);

    animation: ${moveOrb}
        15s alternate linear infinite;
`;

export default Orb;