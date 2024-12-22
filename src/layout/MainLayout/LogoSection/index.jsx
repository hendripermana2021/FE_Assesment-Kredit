import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from 'config';
import imageLogo from '../../../assets/images/icons/logo-nbp-warna.png';

import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();

  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      <img src={imageLogo} alt="Logo" style={{ height: '30%', width: '30%' }} />
    </ButtonBase>
  );
};

export default LogoSection;
