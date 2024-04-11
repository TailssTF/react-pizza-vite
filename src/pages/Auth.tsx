import { LoginForm } from "@userfront/toolkit";
import { AuthTheme } from "../settings/AuthTheme";

const Auth: React.FC = () => {
  return (
    <div className="container">
      <LoginForm theme={AuthTheme} />
    </div>
  );
};

export default Auth;
