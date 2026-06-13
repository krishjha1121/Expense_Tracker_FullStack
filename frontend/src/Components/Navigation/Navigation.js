import React from 'react';
import styled from 'styled-components';

import avatar from '../../img/avatar.png';

import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive }) {
    return (
        <NavStyled>
            <div className="user-con">
                <img
                    src={avatar}
                    alt="User Avatar"
                />

                <div className="text">
                    <h2>Mike</h2>
                    <p>Your Money</p>
                </div>
            </div>

            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() =>
                            setActive(item.id)
                        }
                        className={
                            active === item.id
                                ? 'active'
                                : ''
                        }
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            <div className="bottom-nav">
                <li>
                    {signout}
                    <span> Sign Out</span>
                </li>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;

    width: 374px;
    height: 100%;

    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);

    border-radius: 32px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 2rem;

    .user-con {
        height: 100px;

        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .user-con img {
        width: 80px;
        height: 80px;

        border-radius: 50%;
        object-fit: cover;

        background: #fcf6f9;
        border: 2px solid #ffffff;

        padding: 0.2rem;

        box-shadow: 0px 1px 17px
            rgba(0, 0, 0, 0.06);
    }

    .user-con h2 {
        color: rgba(34, 34, 96, 1);
    }

    .user-con p {
        color: rgba(34, 34, 96, 0.6);
    }

    .menu-items {
        flex: 1;

        display: flex;
        flex-direction: column;
    }

    .menu-items li {
        display: grid;
        grid-template-columns: 40px auto;

        align-items: center;

        margin: 0.6rem 0;
        padding-left: 1rem;

        font-weight: 500;

        cursor: pointer;
        position: relative;

        color: rgba(34, 34, 96, 0.6);

        transition: all 0.4s ease-in-out;
    }

    .menu-items li i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;

        transition: all 0.4s ease-in-out;
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
    }

    .active i {
        color: rgba(34, 34, 96, 1) !important;
    }

    .active::before {
        content: '';

        position: absolute;

        left: 0;
        top: 0;

        width: 4px;
        height: 100%;

        background: #222260;

        border-radius: 0 10px 10px 0;
    }

    .bottom-nav li {
        cursor: pointer;

        display: flex;
        align-items: center;
        gap: 0.5rem;

        color: rgba(34, 34, 96, 0.8);
    }
`;

export default Navigation;