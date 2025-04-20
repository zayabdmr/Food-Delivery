import { CreateNewPassword } from "./component/CreateNewPassword";
import { ResetPassword } from "./component/ResetPassword";
import { Verify } from "./component/Verify";

export default function Home() {
  return (
    <div>
      {/* <ResetPassword /> */}
      {/* <Verify /> */}
      <CreateNewPassword />
    </div>
  );
}
