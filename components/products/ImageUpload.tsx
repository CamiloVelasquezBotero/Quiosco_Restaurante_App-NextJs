"use client"
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

export default function ImageUpload({image}:{image: string | undefined}) { // Puede tener una imagen o no cuando se use este form para uno nuevo
    const [imageUrl, setImageUrl] = useState('')

    return (
        // Se le pasa como children lo que mostraremos con next-cloudinary para agregar las imagenes
        <CldUploadWidget
            uploadPreset={'ml_default'} // La firma necesaria para poder subir las imagenes (CLdUploadWidget) se configura en cloudinary
            options={{ // Las opciones que tendra 
                maxFiles: 1, // de a un archivo
                // maxFileSize: Maximo se tamaño por archivo
                // multiple: true //  habilidamos multiples archivos
            }}
            onSuccess={(result, { widget }) => { // instanciamos el resultado, y extraemos el widget
                if(result.event === 'success') {
                    widget.close() // Cerramos el widget de cloudinary
                    // @ts-ignore // Ingnoramso el error de TS en este result.info, ya que es error de cloudinary, por que si existen estas respuestas
                    setImageUrl(result.info.secure_url) // Activamos previamente en  (nex.config.ts) para que acepte imagenes desde dominios
                }
            }}
        // onError={} // En caso de querer debuggear el error
         
        /* Se le pasa como {children} un arrow function que se le pasara open para poder mandarlo a llamar cuando se le de click y se abra */
        >
            {({ open }) => ( // como children le damos una funcion con los props que nos da (CldUploadWidget) y le devolvermos el callback con el HTML
                <> 
                    <div className='space-y-2'>
                        <label className="text-slate-800">Imagen Producto</label>
                        <div
                            className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
                            onClick={() => open()} // Utilizamos el open
                        >
                            <TbPhotoPlus
                                size={50} // Se le agrega un tamaño
                            />
                            <p className='text-lg font-semibold'>Agregar Imagen</p>

                            {imageUrl && (
                                <div
                                    className='absolute inset-0 w-full h-full'
                                >
                                    <Image  // Componente de Next para optimizar imagenes
                                        fill // Ancho necesario
                                        style={{objectFit: 'contain'}}
                                        src={imageUrl} 
                                        alt='Imagen de Producto' // Necesario
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && ( // Tiene que haber una imagen y no puede haber una nueva imagen a agregar
                        <div className='space-y-2'>
                            <label htmlFor="">Imagen Actual:</label>
                            <div className='relative w-64 h-64'>
                                <Image 
                                    fill
                                    src={getImagePath(image)} // Revisamos si la url es local o de cloudinary
                                    alt='Imagen Producto'
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                    )}

                    <input  // Creamos un input oculto para recuperar el value de la imagen en el (formData) del (handleSubmit) al hacer el (action) en (AddProductForm)
                        type="hidden" 
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image} // Si tiene una imagen nueva la colocamos si no colocamos la misma imagen que ya teniamos
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
