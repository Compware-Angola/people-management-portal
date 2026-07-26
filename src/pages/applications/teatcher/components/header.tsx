import type { LucideProps } from 'lucide-react'

type Props = {
    title: string,
    icon: React.ComponentType<LucideProps>
}
export function Header({ title, icon: Icon }: Props) {
    return (
        <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2 text-neutral-700">
                <Icon className="size-5" />
                <h2 className="text-sm font-semibold">{title}</h2>
            </div>


        </div>
    );
}