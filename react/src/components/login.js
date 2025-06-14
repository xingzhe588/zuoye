import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ username: '', useremail: '', userpwd: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [existed, setExisted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changeType = () => {
    setIsLogin(!isLogin);
    setForm({ username: '', useremail: '', userpwd: '' });
    setEmailError(false);
    setPasswordError(false);
    setExisted(false);
  };

  const login = async () => {
    const { useremail, userpwd } = form;
    if (!useremail || !userpwd) return alert('Поля не могут быть пустыми!');
    try {
      const res = await axios.post('http://127.0.0.1:10520/api/user/login', {
        email: useremail,
        password: userpwd
      });
      switch (res.data) {
        case 0:
          localStorage.setItem('user', JSON.stringify({
            email: useremail,
            username: res.data.username || useremail.split('@')[0]
          }));
          alert('Вход выполнен успешно!');
          window.location.href = '/';
          break;
        case -1:
          setEmailError(true);
          break;
        case 1:
          setPasswordError(true);
          break;
        default:
          alert('发生未知错误，请稍后重试');
          break;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const register = async () => {
    const { username, useremail, userpwd } = form;
    if (!username || !useremail || !userpwd) return alert('Поля не могут быть пустыми!');
    try {
      const res = await axios.post('http://127.0.0.1:10520/api/user/add', {
        username,
        email: useremail,
        password: userpwd
      });
      switch (res.data) {
        case 0:
          alert('Регистрация успешна!');
          login();
          break;
        case -1:
          setExisted(true);
          break;
        default:
          alert('发生未知错误，请稍后重试');
          break;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-register">
      <div className="contain">
        <div className={`big-box ${isLogin ? 'active' : ''}`}>
          <div className="big-contain">
            <div className="btitle">{isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}</div>
            <div className="bform">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    value={form.username}
                    onChange={handleChange}
                  />
                  {existed && <span className="errTips">* Имя пользователя уже существует! *</span>}
                </>
              )}
              <input
                type="email"
                name="useremail"
                placeholder="Эл. почта"
                value={form.useremail}
                onChange={handleChange}
              />
              {emailError && <span className="errTips">* Ошибка в адресе электронной почты *</span>}
              <input
                type="password"
                name="userpwd"
                placeholder="Пароль"
                value={form.userpwd}
                onChange={handleChange}
              />
              {passwordError && <span className="errTips">* Неверный пароль *</span>}
            </div>
            <button className="bbutton" onClick={isLogin ? login : register}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </div>
        </div>
        <div className={`small-box ${isLogin ? 'active' : ''}`}>
          <div className="small-contain">
            <div className="stitle">{isLogin ? 'Привет, друг!' : 'Добро пожаловать обратно!'}</div>
            <p className="scontent">
              {isLogin
                ? 'Начните регистрацию и путешествуйте с нами'
                : 'Пожалуйста, войдите в свой аккаунт, чтобы оставаться с нами'}
            </p>
            <button className="sbutton" onClick={changeType}>
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </div>
        </div>
      </div>

      {/* 原样式保留 */}
      <style>{`
        .login-register {
          width: 100vw;
          height: 100vh;
          box-sizing: border-box;
          position: relative;
        }
        .contain {
          width: 60%;
          height: 60%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
          overflow: hidden;
        }
        .big-box, .small-box {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 1s;
        }
        .big-box {
          width: 70%;
          left: 30%;
        }
        .big-box.active {
          left: 0;
        }
        .big-contain, .small-contain {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .btitle, .stitle {
          font-size: 1.5em;
          font-weight: bold;
        }
        .btitle {
          color: rgb(57,167,176);
        }
        .bform {
          width: 100%;
          height: 40%;
          padding: 2em 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
        .bform input {
          width: 50%;
          height: 30px;
          border: none;
          outline: none;
          border-radius: 10px;
          padding-left: 2em;
          background-color: #f0f0f0;
        }
        .bform .errTips {
          display: block;
          width: 50%;
          text-align: left;
          color: red;
          font-size: 0.7em;
          margin-left: 1em;
        }
        .bbutton, .sbutton {
          height: 40px;
          border-radius: 24px;
          outline: none;
          cursor: pointer;
        }
        .bbutton {
          width: 20%;
          border: none;
          background-color: rgb(57,167,176);
          color: #fff;
          font-size: 0.9em;
        }
        .small-box {
          width: 30%;
          left: 0;
          background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
          border-top-left-radius: inherit;
          border-bottom-left-radius: inherit;
          color: white;
          z-index: 1;
        }
        .small-box.active {
          left: 100%;
          transform: translateX(-100%);
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: inherit;
          border-bottom-right-radius: inherit;
        }
        .scontent {
          font-size: 0.8em;
          text-align: center;
          padding: 2em 4em;
          line-height: 1.7em;
        }
        .sbutton {
          width: 60%;
          border: 1px solid #fff;
          background-color: transparent;
          color: #fff;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}
