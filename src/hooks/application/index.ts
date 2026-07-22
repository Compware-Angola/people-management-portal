import { getApiErrorMessage } from '@/lib/api/get-api-error-message';
import { createTeacherApplication } from '@/service/applications/applications.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateTeacherApplication() {
  return useMutation({
    mutationFn: createTeacherApplication,
    onError:(error)=> {
        toast.error(getApiErrorMessage(error))
    }
  });
  
}