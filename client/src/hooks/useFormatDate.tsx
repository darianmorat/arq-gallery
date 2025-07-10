export const useFormatDate = (date?: string) => {
   if (!date) {
      return "Fecha no disponible";
   }

   return new Date(date).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
};
