import { FormEvent, useState } from "react";
import { useStores } from "../Store-context";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

const Reset: React.FC = observer(() => {
  const {
    AuthStore: { signIn, fromPath },
  } = useStores();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [nextStage, setNextStage] = useState(false);

  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nextStage && email !== "") {
      setNextStage(true);
    } else {
      if (nextStage && password !== "" && password == passwordAgain) {
        signIn(email);

        navigate(fromPath);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("fromPath", "/");
      } else {
        alert("Введите корректные данные");
      }
    }
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
        {!nextStage && (
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {nextStage && (
          <>
            <div className="auth__field">
              <label htmlFor="password">Пароль: </label>
              <input
                type="password"
                id="password"
                name="password"
                minLength={3}
                maxLength={200}
                aria-describedby="password"
                aria-invalid="false"
                onChange={(e) => setPassword(e.target.value)}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,200}$"
                required
              />
            </div>
            <div className="auth__field">
              <label htmlFor="passwordAgain">Повторите пароль: </label>
              <input
                type="password"
                id="passwordAgain"
                name="passwordAgain"
                minLength={3}
                maxLength={200}
                aria-describedby="passwordAgain"
                aria-invalid="false"
                onChange={(e) => setPasswordAgain(e.target.value)}
                required
              />
            </div>
            <div className="auth__requirements">
              <PasswordChecklist
                rules={[
                  "minLength",
                  "maxLength",
                  "capital",
                  "specialChar",
                  "number",
                  "match",
                ]}
                minLength={3}
                maxLength={200}
                value={password}
                valueAgain={passwordAgain}
                messages={{
                  minLength: "Пароль содержит минимум 3 символа",
                  maxLength: "Пароль содержит максимум 200 символов",
                  capital: "Пароль содержит заглавную букву",
                  specialChar: "Пароль содержит спец символ",
                  number: "Пароль содержит цифру",
                  match: "Пароли совпадают",
                }}
              />
            </div>
          </>
        )}

        <div className="auth__buttons">
          <button className="button">
            {nextStage ? "Подтвердить" : "Восстановить"}
          </button>
        </div>
      </form>
    </div>
  );
});

export default Reset;
