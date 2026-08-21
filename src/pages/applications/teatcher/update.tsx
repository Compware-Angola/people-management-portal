import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMyApplication, useRenewApplication } from "@/hooks/application"
import { ApplicationStatusTab } from "./components/application-status-tab"
import { AcademicEducationsTab } from "./components/academic-educations-tab"
import { TeachingExperiencesTab } from "./components/teaching-experiences-tab"
import { DocumentsTab } from "./components/documents-tab"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { RefreshCw } from "lucide-react"



export function UpdateTeacherApplicationPage() {
   const { mutate: renewApplication, isPending } = useRenewApplication()
  const { data: application, isLoading, isError } = useMyApplication()

  if (isLoading) {
    return (
      <div className="space-y-4 p-4 md:p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    )
  }

  if (isError || !application) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar a sua candidatura.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex justify-between">
         <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Minha Candidatura
        </h1>
        <p className="text-sm text-muted-foreground">
          Consulte e atualize os dados da sua candidatura
        </p>
      </div>

       <Button
          type="button"
          size="lg"
          disabled={isPending}
          onClick={() => renewApplication(application.id)}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Renovar Candidatura
        </Button>
      </div>
     

      <Tabs defaultValue="status" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">Resumo</TabsTrigger>
          <TabsTrigger value="academic">Formação</TabsTrigger>
          <TabsTrigger value="experience">Experiência</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="mt-6">
          <ApplicationStatusTab application={application} />
        </TabsContent>

        <TabsContent value="academic" className="mt-6">
          <AcademicEducationsTab application={application} />
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <TeachingExperiencesTab application={application} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentsTab application={application} />
        </TabsContent>
      </Tabs>
    </div>
  )
}