
import { StyledH1, StyledHeader } from "./Header.style";

interface HeaderProps {
    title: string
}

export const Header = ({ title}: HeaderProps) => {

    return (
        <StyledHeader>
            <StyledH1>{title}</StyledH1>
        </StyledHeader>
    )
}