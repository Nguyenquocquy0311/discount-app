import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup, 
  signOut, 
  User, 
} from 'firebase/auth';
import { authentication } from '../lib/firebase';
import { useCallback, useEffect, useState } from 'react';
import { 
  getRemoteConfig
} from 'firebase/remote-config';
import { firebaseApp } from '../lib/firebase';
import { createContainer } from 'unstated-next';
import { notification } from 'antd';
import { UserType } from '../types/user';

type UserInfo = User | UserType | null;

function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [isLoadingJwtSignup, setIsLoadingJwtSignup] = useState<boolean>(false);
  const [isLoadingGoogleLogin, setIsLoadingGoogleLogin] = useState<boolean>(false);

  const closeModalLogin = () => setIsOpenModalLogin(false)
  const openModalLogin = () => setIsOpenModalLogin(true)

  const loginWithJWT = async (username: string, password: string) => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      
      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();

      localStorage.setItem('user-info', JSON.stringify(data?.user));

      setUserInfo(data?.user);

      closeModalLogin()
    } catch (e) {
      notification.error({
        message: 'Lỗi đăng nhập!',
        description: 'Vui lòng gửi lại form.',
      });
    }
  }

  const loginWithGoogle = async () => {
    setIsLoadingGoogleLogin(true);
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(authentication, provider);
      if (res && res.user) {
        localStorage.setItem('user-info', JSON.stringify(res.user));
        setUserInfo(res.user); 
      }
      setIsLoadingGoogleLogin(false);
      return res;
    } catch (e) {
      setIsLoadingGoogleLogin(false);
      throw e;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      setUserInfo(res?.user);
      localStorage.setItem('user-info', JSON.stringify(res?.user));
      return res;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const signupWithJWT = async (email: string, name: string, username: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error('Đăng ký thất bại');
      }

      // Hiển thị thông báo đăng ký thành công
      notification.success({
        message: 'Đăng ký thành công!',
        description: 'Tài khoản đã được tạo. Bạn sẽ được đăng nhập tự động.',
      });

      // Nếu đăng ký thành công, tự động đăng nhập
      await loginWithJWT(username, password);
      setLoading(false);

      // Hiển thị thông báo đăng nhập thành công
      notification.success({
        message: 'Đăng nhập thành công!',
        description: `Chào mừng ${username}!`,
      });

    } catch (e) {
      // Hiển thị thông báo lỗi nếu xảy ra
      notification.error({
        message: 'Lỗi đăng ký!',
        description: 'Đã xảy ra lỗi, vui lòng kiểm tra lại thông tin và thử lại.',
      });
    } finally {
      setLoading(false);  // Kết thúc trạng thái loading
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(authentication, email, password);
      setUserInfo(res?.user);
      localStorage.setItem('user-info', JSON.stringify(res?.user));
      return res;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const logout = () => {
    signOut(authentication).then(() => {
      setUserInfo(null);
      localStorage.removeItem('user-info');
    });
  };

  useEffect(() => {
    if (!userInfo) {
      const cachedUserInfo = localStorage.getItem('user-info');
      if (cachedUserInfo) {
        setUserInfo(JSON.parse(cachedUserInfo));
      }
    }
  }, [userInfo]);

  const fetchAndActiveRemoteConfig = useCallback(async () => {
    const remoteConfig = getRemoteConfig(firebaseApp);
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000, // Mỗi 1 giờ fetch lại
      fetchTimeoutMillis: 5000, // Thời gian timeout 5 giây
    };

  }, []);

  return {
    loading,
    loginWithGoogle,
    logout,
    isLoadingGoogleLogin,
    loginWithEmail,
    signupWithEmail,
    userInfo,
    isOpenModalLogin,
    closeModalLogin,
    openModalLogin,
    fetchAndActiveRemoteConfig,
    loginWithJWT,
    signupWithJWT
  };
}

const Auth = createContainer(useAuth);

export default Auth;
