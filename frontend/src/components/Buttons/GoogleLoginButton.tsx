import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
    const handleLoginSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
        loginWithGoogle(credentialResponse.credential)
            .then(() => {
            window.location.href = '/dashboard'; // Redirect to dashboard after login
            })
            .catch(error => {
            console.error('Google login failed:', error);
            });
        }
    }
  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}
