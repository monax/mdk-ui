import { toast } from 'sonner';
import { useClipboard as useClipboardHook } from 'use-clipboard-copy';

export const useClipboard = () => {
  return useClipboardHook({
    onSuccess() {
      toast.info('Copied to Clipboard');
    },
  });
};
