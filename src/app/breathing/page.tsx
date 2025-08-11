import { BreathingPacer } from '@/components/breathing-pacer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function BreathingPage() {
 return (
  <div className="flex flex-col gap-6 items-center py-4 px-2 sm:px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
   <header className="text-center mb-4">
    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Ejercicios de Respiración</h1>
    <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Sigue la guía para centrar tu mente y cuerpo.</p>
   </header>
   
{/* Se ajusta la cuadrícula para mostrar 2 columnas y un espacio más pequeño entre ellas */}
<div className="grid grid-cols-2 gap-4 w-full">
{/* Técnica 1: Respiración 4-7-8 */}
<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
<CardHeader className="p-3">
<CardTitle className="text-sm sm:text-base">Respiración 4-7-8</CardTitle>
<CardDescription className="text-xs sm:text-sm">Calma y sueño.</CardDescription>
</CardHeader>
<CardContent className="p-3 pt-0">
<BreathingPacer inhale={4} hold={7} exhale={8} />
</CardContent>
</Card>

    {/* Técnica 2: Respiración de Caja */}
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
     <CardHeader className="p-3">
      <CardTitle className="text-sm sm:text-base">Respiración de Caja</CardTitle>
      <CardDescription className="text-xs sm:text-sm">Calmar el sistema nervioso.</CardDescription>
     </CardHeader>
     <CardContent className="p-3 pt-0">
      <BreathingPacer inhale={4} hold={4} exhale={4} holdAfterExhale={4} />
     </CardContent>
    </Card>

    {/* Técnica 3: Respiración Abdominal */}
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
     <CardHeader className="p-3">
      <CardTitle className="text-sm sm:text-base">Respiración Abdominal</CardTitle>
      <CardDescription className="text-xs sm:text-sm">Reduce la ansiedad.</CardDescription>
     </CardHeader>
     <CardContent className="p-3 pt-0">
      <BreathingPacer inhale={5} exhale={5} />
     </CardContent>
    </Card>

    {/* Técnica 4: Coherencia Cardíaca */}
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
     <CardHeader className="p-3">
      <CardTitle className="text-sm sm:text-base">Coherencia Cardíaca</CardTitle>
      <CardDescription className="text-xs sm:text-sm">Sincroniza la respiración y el ritmo cardíaco.</CardDescription>
     </CardHeader>
     <CardContent className="p-3 pt-0">
      <BreathingPacer inhale={5} exhale={5} />
     </CardContent>
    </Card>

    {/* Técnica 5: Sama Vritti (Respiración igual) */}
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
     <CardHeader className="p-3">
      <CardTitle className="text-sm sm:text-base">Sama Vritti</CardTitle>
      <CardDescription className="text-xs sm:text-sm">Inhalar y exhalar con la misma duración.</CardDescription>
     </CardHeader>
     <CardContent className="p-3 pt-0">
      <BreathingPacer inhale={4} exhale={4} />
     </CardContent>
    </Card>
    
    {/* Técnica 6: Respiración Alterna de Fosas Nasales */}
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
     <CardHeader className="p-3">
      <CardTitle className="text-sm sm:text-base">Respiración Alterna</CardTitle>
      <CardDescription className="text-xs sm:text-sm">Técnica de yoga que no se puede simular.</CardDescription>
     </CardHeader>
     <CardContent className="p-3 pt-0">
      <p className="text-xs text-gray-600 dark:text-gray-400">
       Inhala por la fosa nasal izquierda, exhala por la derecha. Luego inhala por la derecha y exhala por la izquierda.
      </p>
     </CardContent>
 </Card>
     </div>
   </div>
 );
}
