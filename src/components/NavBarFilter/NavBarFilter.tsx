import { Outlet } from "react-router-dom"
import styled from "styled-components"
import Button from "../Button/Button"

const NavBarFilter = () => {
    return (
        <>
            <Container>
                <Section>
                    <Button>
                        Create
                    </Button>
                </Section>
                <Section>asd</Section>
                <Section>asd</Section>
            </Container>
            <Outlet />
        </>
    )
}

export default NavBarFilter

const Container = styled('div')`
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    grid-gap: 20px;
    
`

const Section = styled('div')``