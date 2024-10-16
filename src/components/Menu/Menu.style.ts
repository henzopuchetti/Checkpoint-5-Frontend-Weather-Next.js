import Link from 'next/link';
import styled from 'styled-components';

export const StyledNav = styled.nav`
    display: flex;
    align-items: flex-end;
`;

export const StyledUl = styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
`;

export const StyledLi = styled.li`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0;
`;

export const StyledLink = styled(Link)`
    font-size: 0.8rem;
    color: #1f1e31;
    text-decoration: none;
`;
