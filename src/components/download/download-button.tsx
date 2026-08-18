import { Button } from "@/components/ui/button";
import { useGetFileUrl } from "@/hooks/upload/use-download";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import { DownloadIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadFileProps {
  path: string
}

export function DownloadFileButton  ({ path }: DownloadFileProps)  {
  const { mutateAsync: getFileUrl, isPending: isLoadingDocumento } =
    useGetFileUrl();

const handleDownload = async () => {
  if (!path) {
    toast.error("Formato inválido. Nenhum documento encontrado.");
    return;
  }

  const newWindow = window.open("about:blank", "_blank");

  if (!newWindow) {
    toast.error("Não foi possível abrir o documento.");
    return;
  }

  try {
    const { url } = await getFileUrl({ key: path });

    newWindow.location.href = url;
  } catch (error) {
    newWindow.close();

    console.error("Erro ao buscar documento:", error);
    toast.error(getApiErrorMessage(error));
  }
};

  return (
    <Button
      type="button"
      onClick={handleDownload}
      variant="outline"
       size="sm"

      disabled={isLoadingDocumento}
    >
      {isLoadingDocumento ? (
        <>
          Baixando
          <Loader2 className="animate-spin ml-1 h-3.5 w-3.5" />
        </>
      ) : (
        <>
          Baixar
          <DownloadIcon className="ml-1 h-3.5 w-3.5" />
        </>
      )}
    </Button>
  );
};

