import * as styled from './styled';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import { BaseColor } from '../../config/color';
import Button from '../Button/Button';
import { Type } from '../../shared/contexts/actions';
import { User } from '../../shared/contexts/provider.types';
import storage from '../../shared/utils/storage';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';

const Navbar = () => {
  const { state, dispatch } = useGeneralContext();
  const admin: User = state.auth.admin;
  const navigate = useNavigate();

  const handleAuthentication = () => {
    if (admin.uuid === undefined) {
      return navigate('login');
    }
    storage.remove('user');
    dispatch({ type: Type.LOGOUT, payload: undefined });
  };
  return (
    <>
      <styled.Section>
        {admin.uuid !== undefined && (
          <Link to={'cars/favorites'}>
            <Button>Favorites</Button>
          </Link>
        )}
        <Link to={'cars'}>
          <Button>Cars</Button>
        </Link>
        <styled.SectionLogin>
          <Button onClick={handleAuthentication}>
            {admin.uuid === undefined ? 'Login' : 'Logout'}
          </Button>
          {admin.uuid === undefined ? (
            ''
          ) : (
            <styled.EmailText color={BaseColor.lightBluePrimaryColor}>
              {admin.email}
            </styled.EmailText>
          )}
        </styled.SectionLogin>
      </styled.Section>
      <Outlet />
    </>
  );
};

export default Navbar;
