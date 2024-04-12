import { ChangeEvent, FormEvent, useState } from "react";
import { useStores } from "../Store-context";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = observer(() => {
  const {
    AuthStore: { signIn, fromPath },
  } = useStores();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.email !== "" && input.password !== "") {
      signIn(input.email);

      navigate(fromPath);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("fromPath", "/");
    } else {
      alert("Введите корректные данные");
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth">
      <Link to={fromPath} className="button button--outline button--go-back">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Вернуться назад</span>
      </Link>
      <form className="auth__form" onSubmit={handleSubmitEvent}>
        <div className="auth__field">
          <label htmlFor="user-email">Email: </label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            minLength={3}
            maxLength={200}
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <div className="auth__field">
          <label htmlFor="password">Пароль: </label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={3}
            maxLength={200}
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,200}$"
            required
          />
        </div>
        <div>
          <span>Пароль должен содержать:</span>
          <br />
          <span>не менее трех символов</span>
          <br />
          <span>минимум одну заглавную букву</span>
          <br />
          <span>минимум одну цифру</span>
          <br />
          <span>минимум один спецсимвол</span>
        </div>
        <div className="auth__field">
          <label htmlFor="password-again">Повторите пароль: </label>
          <input
            type="password"
            id="password-again"
            name="password-again"
            minLength={3}
            maxLength={200}
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
            required
          />
        </div>
        <div>Пароли должны совпадать</div>

        <div className="auth__buttons">
          <button className="button">Подтвердить</button>
          <Link to={"/auth"} className="button">
            Авторизация
          </Link>
        </div>
      </form>
    </div>
  );
});

export default Register;
