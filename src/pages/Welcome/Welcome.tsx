import Button from '../../components/Button/Button';
import { BaseColor } from '../../config/color';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';
import * as styled from './style'

const Welcome = () => {
  const context = useGeneralContext();
  const uuid = context?.state.auth.admin.uuid;
  console.log(uuid === undefined)
  return (
    <styled.Container >
      <styled.Section>
        {
          uuid &&
          <Button>Favorites</Button>
        }
        <Button>Cars</Button>
        <Button>{uuid === undefined ? 'Login' : 'Logout'}</Button>
      </styled.Section>
      Welcome

    </styled.Container>
  )
}

export default Welcome;