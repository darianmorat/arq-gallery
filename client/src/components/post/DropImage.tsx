import { useDropzone, type FileRejection } from "react-dropzone";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";

interface FileWithPreview extends File {
   preview: string;
   id: string;
}

type DropImageProps = {
   files: FileWithPreview[];
   setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
};

export const DropImage = ({ files, setFiles }: DropImageProps) => {
   const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
         const newFiles = acceptedFiles.map(
            (file) =>
               Object.assign(file, {
                  preview: URL.createObjectURL(file),
                  id: uuid(),
               }) as FileWithPreview,
         );

         setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...newFiles];
            return updatedFiles;
         });
      }

      if (rejectedFiles.length > 0) {
         const errorCode = rejectedFiles[0].errors[0].code;

         if (errorCode === "too-many-files") {
            toast.error("Límite de 10 imagenes");
         } else if (errorCode === "file-too-large") {
            toast.error("Tamaño limite es 20 MB");
         } else {
            toast.error("Error al subir imagen");
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxFiles: 10,
      maxSize: 20 * 1024 * 1024, // 20 MB // USE THE LIMIT SIZE FROM YOUR CLOUD PROVIDER
      accept: {
         "image/png": [".png"],
         "image/jpeg": [".jpg", ".jpeg"],
      },
   });

   const removeFile = (fileId: string) => {
      setFiles((files) => files.filter((file) => file.id !== fileId));
   };

   useEffect(() => {
      return () => {
         files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
   }, [files]);

   return (
      <>
         <div className="rounded-lg border p-6 mb-6">
            <section
               className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                  isDragActive ? "border-blue-400 bg-blue-50 dark:bg-blue-200/10" : ""
               } border-accent-foreground/25 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-200/10`}
            >
               <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                     <>
                        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg text-blue-500 font-semibold mb-2">
                           Puedes soltar tus imagenes en este lugar
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                           o haz clic para seleccionar archivos
                        </p>
                        <Button type="button" variant="outline" className="mb-4" disabled>
                           Seleccionar archivos
                        </Button>
                        <div className="text-sm text-gray-500">
                           Formatos soportados: JPG, PNG (máx. 20MB por archivo)
                        </div>
                     </>
                  ) : (
                     <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                           Arrastra y suelta tus imágenes aquí
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                           o haz clic para seleccionar archivos
                        </p>
                        <Button type="button" variant="outline" className="mb-4">
                           Seleccionar archivos
                        </Button>
                        <div className="text-sm text-gray-500">
                           Formatos soportados: JPG, PNG (máx. 20MB por archivo)
                        </div>
                     </>
                  )}
               </div>
            </section>

            {files.length > 0 && (
               <>
                  <div className="rounded-lg py-6">
                     <h3 className="text-lg font-semibold mb-4">
                        Archivos seleccionados ({files.length})
                     </h3>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {files.map((file) => (
                           <div key={file.id} className="relative group">
                              <div className="aspect-square shadow-sm bg-gray-100 rounded-lg overflow-hidden">
                                 <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                 />
                              </div>

                              <button
                                 type="button"
                                 onClick={() => removeFile(file.id)}
                                 className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors duration-200 shadow-sm"
                                 aria-label="Eliminar archivo"
                              >
                                 <X size={18} />
                              </button>

                              <p
                                 className="mt-2 text-xs text-muted-foreground truncate"
                                 title={file.name}
                              >
                                 {file.name}
                              </p>
                           </div>
                        ))}
                     </div>
                  </div>
               </>
            )}
         </div>
      </>
   );
};
