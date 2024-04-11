import { PasswordResetForm } from "@userfront/toolkit";
import { AuthTheme } from "../settings/AuthTheme";

const Reset: React.FC = () => {
  return (
    <div className="container">
      <PasswordResetForm theme={AuthTheme} />
    </div>
  );
};

export default Reset;
