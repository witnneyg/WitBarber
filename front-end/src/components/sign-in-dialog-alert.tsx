import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function SignInDialogAlert() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>
    </>
  );
}
