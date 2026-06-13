import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --primary-color: #3c3c54;
        --primary-color2: rgba(34, 34, 96, 0.6);
        --primary-color3: rgba(34, 34, 96, 0.4);
        --color-green: #42ad00;
        --color-grey: #aaa;
        --color-accent: #f56692;
        --color-delete: #ff0000;
    }

    body {
        font-family: 'Nunito', sans-serif;
        background-color: #f8f9fa;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: var(--primary-color);
    }

    button,
    input,
    textarea {
        font-family: inherit;
    }

    .error {
        color: red;
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(10px);
        }

        50% {
            transform: translateX(-10px);
        }

        75% {
            transform: translateX(10px);
        }

        100% {
            transform: translateX(0);
        }
    }
`;