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
          return 200
    } catch (error) {
      // Dispatch action for login failure if needed
       dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Login failed' } });
       console.log(error)
       if(error.code=="ERR_NETWORK")
       return 500
      else
      return 401
    }
  };

  export const loginGoogleUser = (profile) => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/auth/signupGoogle`
        const response= await axios.post(url,profile);
        dispatch(setLogin({user:response.data,token:null}));
        
    } catch (error) {
      console.error('Login failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Login failed' } });
    }
  }

 
export const logoutUser = () => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/auth/logout`
        const response= await axios.get(url);
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
  