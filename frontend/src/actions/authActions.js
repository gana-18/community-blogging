import axios from 'axios';
import { setLogin,setLogout} from '../reducers/authReducer';

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/auth/login`
        const response= await axios.post(url,credentials);

        const {user}=response.data;
        const {token}=response.data;
      // Dispatch action to update the Redux store
      dispatch(setLogin({user,token}));
      //dispatch(setExpirationTime(expirationTime));
    } catch (error) {
      console.error('Login failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Login failed' } });
    }
  };

 
export const logoutUser = () => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/auth/logout`
        const response= await axios.post(url);
        if(response.status==200){
            // Dispatch action to update the Redux store
            dispatch(setLogout(null));
        } else {
            throw new Error("Logout failed!");
          }
    } catch (error) {
      console.error('Logout failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'LOGOUT_FAILURE', payload: { error: 'Logout failed' } });
    }
  };
  