import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';
import * as styled from './style'
import { Type } from '../../shared/contexts/actions';

const Welcome = () => {
  const navigate = useNavigate()
  const context = useGeneralContext();
  const uuid = context?.state.auth.admin.uuid;

  const handleAuthentication = () => {
    if (uuid === undefined) {
      return navigate('login');
    }

    context?.dispatch({ type: Type.LOGOUT, payload: undefined })
  }

  return (
    <styled.Container >
      <styled.Section>
        {
          uuid !== undefined &&
          <Button>Favorites</Button>
        }
        <Link to={'cars'}>
          <Button>Cars</Button>
        </Link>
        <Button onClick={handleAuthentication}>{uuid === undefined ? 'Login' : 'Logout'}</Button>
      </styled.Section>
      Welcome

    </styled.Container>
  )
}

export default Welcome;