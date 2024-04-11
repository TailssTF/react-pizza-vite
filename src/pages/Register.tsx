import { SignupForm } from "@userfront/toolkit";
import { AuthTheme } from "../settings/AuthTheme";

const Register: React.FC = () => {
  return (
    <div className="container">
      <SignupForm theme={AuthTheme} />
    </div>
  );
};

export default Register;
