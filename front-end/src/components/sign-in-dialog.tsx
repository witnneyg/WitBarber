import { GoogleLogin } from "@react-oauth/google";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./sidebar-sheet";

interface SignInDialogProps {
  setUser: (user: any) => void;
}

export function SignInDialog({ setUser }: SignInDialogProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (!credentialResponse.credential) return;
            const token = credentialResponse.credential;
            const decoded = jwtDecode<CustomJwtPayload>(token);

            api
              .post(`/auth/google`, { token })
              .then((response) => {
                setUser({
                  ...response.data.user,
                  picture: decoded.picture || "",
                });

                localStorage.setItem("token", token);
              })
              .catch((err) => console.log(err, "erro ao criar o usuario"));
          }}
          onError={() => {
            alert("Login Failed");
          }}
        />
      </div>
    </>
  );
}
