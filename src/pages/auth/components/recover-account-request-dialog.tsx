import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { RecoverAccountRequestForm } from './recover-account-request-form'



type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function RecoverAccountRequestDialog({
    open,
    onOpenChange,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        A sua conta pode ainda não estar disponível.
                    </DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para solicitar a atualização dos seus dados.
                        Um administrador irá analisar o pedido e, após a validação, poderá concluir a recuperação do acesso à sua conta.
                    </DialogDescription>
                </DialogHeader>
                <RecoverAccountRequestForm />
            </DialogContent>
        </Dialog>
    )
}