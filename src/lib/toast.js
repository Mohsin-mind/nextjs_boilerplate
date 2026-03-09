import { toast } from 'sonner';

export function toastSuccess(message) {
  if (message) toast.success(message);
}

export function toastError(message) {
  if (message) toast.error(message);
}

export function toastInfo(message) {
  if (message) toast(message);
}
