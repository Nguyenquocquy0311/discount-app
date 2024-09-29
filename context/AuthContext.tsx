import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup, 
  signOut, 
  User 
} from 'firebase/auth';
import { authentication } from '../lib/firebase';
import { useCallback, useEffect, useState } from 'react';
import { 
  getRemoteConfig
} from 'firebase/remote-config';
import { firebaseApp } from '../lib/firebase';
import { createContainer } from 'unstated-next';

type UserInfo = User | null;

function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoadingGoogleLogin, setIsLoadingGoogleLogin] = useState<boolean>(false);

  const closeModal = () => setIsOpenModal(false)
  const openModal = () => setIsOpenModal(true)

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
    isOpenModal,
    closeModal,
    openModal,
    fetchAndActiveRemoteConfig,
  };
}

const Auth = createContainer(useAuth);

export default Auth;
