import { ChangeEvent, FormEvent, useState } from "react";
import { useStores } from "../Store-context";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = observer(() => {
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
      console.log(fromPath);

      navigate(fromPath);
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
      <form onSubmit={handleSubmitEvent}>
        <div className="form_control">
          <label htmlFor="user-email">Email: </label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
          <div id="user-email" className="sr-only">
            Please enter a valid username. It must contain at least 6
            characters.
          </div>
        </div>
        <div className="form_control">
          <label htmlFor="password">Пароль: </label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
          <div id="user-password" className="sr-only">
            your password should be more than 6 character
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  );
});

export default Auth;
