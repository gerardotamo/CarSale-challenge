import styled from "styled-components";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Delorean from '../../shared/assets/images/delorean.jpg'
import { BaseColor } from "../../config/color";
import { Cars } from "../../shared/graphql/__generate__/generated";
import Button from "../Button/Button";
interface Props {
    loading: boolean,
    data: Cars | undefined
}

export const CardItem = ({ loading, data }: Props) => {
    const condition = { A: 'Salvage title', N: 'New' }
    let cond: string = 'Other';
    if (data?.condition === 'A') {
        cond = condition.A
    } else if (data?.condition === 'N') {
        cond = condition.N
    }

    return (
        <Container>
            {
                loading ?
                    <SkeletonTheme
                        baseColor={BaseColor.blueDarkColor}
                        highlightColor={BaseColor.lightBluePrimaryColor}>
                        <Skeleton width={155} height={116} />
                        <Skeleton width={70} />
                        <Skeleton width={70} />
                        <Skeleton width={70} />
                        <Skeleton width={70} />
                    </SkeletonTheme>
                    :
                    data &&
                    <>
                        <Image src={Delorean} />
                        <InfoContainer>
                            <Title color={BaseColor.lightBluePrimaryColor} >{data.title}</Title>
                            <Section>
                                <InfoItem >Batch number</InfoItem>
                                <SubInfoItem color={BaseColor.lightBluePrimaryColor}>{data.batch}</SubInfoItem>
                            </Section>
                            <AddFavoriteBUtton>
                                Add Favorite
                            </AddFavoriteBUtton>
                        </InfoContainer>
                        <InfoContainer>
                            <Section>
                                <InfoItem >Odometer</InfoItem>
                                <SubInfoItem color={BaseColor.lightBluePrimaryColor}>{data.odometer}</SubInfoItem>
                            </Section>
                            <Section>
                                <InfoItem >Price</InfoItem>
                                <SubInfoItem color={BaseColor.lightBluePrimaryColor}>{data.price}</SubInfoItem>
                            </Section>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoItem >{cond}</InfoItem>

                        </InfoContainer>
                        <InfoContainer>
                            <Section>
                                <InfoItem >City</InfoItem>
                                <SubInfoItem color={BaseColor.lightBluePrimaryColor}>{data.city.name}</SubInfoItem>
                            </Section>
                            <Section>
                                <InfoItem >State</InfoItem>
                                <SubInfoItem color={BaseColor.lightBluePrimaryColor}>{data.city.state.name}</SubInfoItem>
                            </Section>
                        </InfoContainer>
                    </>
            }
        </Container>
    )
}


const Container = styled('div')`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    margin-top: 20px;
    margin: 30px;
    align-items: center;
    padding-block: 10px;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 32%);
    border-radius: 5px 0 0 5px;
    :hover{
        background-color: ${BaseColor.primaryGrayColor};
    }
`

const Image = styled('img')`
    height: 116px;
    width: 155px;
`

const Title = styled('h1') <{ color: string }>`
    margin: 0;
    font-size: 18px;
    color: ${props => props.color};
`
const InfoItem = styled('h2') <{ color?: string }>`
    margin: 0;
    color : ${props => props.color};
    font-size: 15px;
`
const SubInfoItem = styled('h3') <{ color?: string }>`
    margin: 0;
    color: ${props => props.color && props.color};
    font-size: 10px;
`

const InfoContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
`

const AddFavoriteBUtton = styled(Button)`
    height: 25px;
`

const Section = styled('div')``