import NoResultsFound from "../../shared/assets/images/sorry-item-not-found.webp";
import styled from "styled-components";

export const NotFoundItem = () => {
  return (
    <Container>
      <Title>Not Found Items</Title>
      <Image src={NoResultsFound} />
    </Container>
  );
};
const Container = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Image = styled("img")`
  height: 50vh;
  width: 80vh;
`;

const Title = styled("h2")``;
