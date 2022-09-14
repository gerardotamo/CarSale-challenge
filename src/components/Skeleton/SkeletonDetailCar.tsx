import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import { BaseColor } from "../../config/color";

const SkeletonDetailCar = () => {
  return (
    <>
      <SkeletonTheme
        baseColor={BaseColor.blueDarkColor}
        highlightColor={BaseColor.lightBluePrimaryColor}
      >
        <Header>
          <Skeleton width={200} height={30} />
        </Header>
        <Column>
          <Section>
            <Skeleton width={"75vmin"} height={"60vmin"} />
          </Section>
          <DataContainer>
            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>

            <InfoItem>
              <Skeleton width={40} height={15} />
              <Skeleton width={50} height={15} />
            </InfoItem>
          </DataContainer>
        </Column>
      </SkeletonTheme>
    </>
  );
};

export default SkeletonDetailCar;

const Column = styled("div")`
  display: flex;
  margin-inline: 50px;
  width: 70%;
  justify-content: space-between;
`;

const Header = styled("div")`
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
`;

const InfoItem = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-block: 5px;
`;

const DataContainer = styled("div")`
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  margin-left: 15px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Section = styled("div")`
  width: 100%;
  display: flex;
`;
