import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BaseColor } from '../../config/color';
import { Type } from '../../shared/contexts/actions';
import { User } from '../../shared/contexts/provider.types';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';
import Button from '../Button/Button';
import * as styled from './styled';

const Navbar = () => {
    const context = useGeneralContext();
    const admin: User = (context?.state.auth.admin);
    const navigate = useNavigate()

    const handleAuthentication = () => {
        if (admin.uuid === undefined) {
            return navigate('login');
        }

        context?.dispatch({ type: Type.LOGOUT, payload: undefined })
    }
    return (
        <>
            <styled.Section>
                {
                    admin.uuid !== undefined &&
                    <Link to={'cars/favorites'}>
                        <Button backgroundColor={BaseColor.lightBluePrimaryColor}>Favorites</Button>
                    </Link>
                }
                <Link to={'cars'}>
                    <Button backgroundColor={BaseColor.lightBluePrimaryColor}>Cars</Button>
                </Link>
                <styled.SectionLogin>
                    <Button onClick={handleAuthentication} backgroundColor={BaseColor.lightBluePrimaryColor}>{admin.uuid === undefined ? 'Login' : 'Logout'}</Button>
                    {admin.uuid === undefined ? '' :
                        <styled.EmailText color={BaseColor.lightBluePrimaryColor}>
                            {admin.email}
                        </styled.EmailText>
                    }
                </styled.SectionLogin>
            </styled.Section>
            <Outlet />
        </>
    )
}

export default Navbar;