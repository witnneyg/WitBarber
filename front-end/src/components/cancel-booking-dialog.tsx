import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface CancelBookingDialogProps {
  handleCancelBooking: () => void;
}

export function CancelBookingDialog({
  handleCancelBooking,
}: CancelBookingDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button variant="destructive" className="w-full">
          Cancelar Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
          <DialogDescription>
            Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa
            ação é irreversível.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Voltar
            </Button>
          </DialogClose>
          <DialogClose className="w-full">
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
              className="w-full"
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
