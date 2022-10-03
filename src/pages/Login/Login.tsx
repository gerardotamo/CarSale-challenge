import * as styled from './style';

import LoginComponent from '../../components/Login/Login';
import { Navigate } from 'react-router-dom';
import { useGeneralContext } from '../../shared/contexts/StoreProvider';

export const Login = () => {
  const context = useGeneralContext();
  const uuid = context.state.auth.admin.uuid;

  if (uuid !== undefined) {
    return <Navigate to={'/'} />;
  }

  return (
    <styled.Container>
      <LoginComponent />
    </styled.Container>
  );
};
