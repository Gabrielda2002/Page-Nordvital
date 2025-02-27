import React from "react";
import * as Yup from "yup";
import emailJs from "@emailjs/browser";
import { useFormik } from "formik";
import axios from "axios";

interface CustomFormProps {
  showAsunto?: boolean;
  showCV?: boolean;
  showPrivacyPolicy?: boolean;
}

const CustomForm: React.FC<CustomFormProps> = ({
  showAsunto,
  showCV ,
  showPrivacyPolicy
}) => {
  // mensaje alerta obligatorio para formulario
  const formBase = {
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email()
      .required("El correo electrónico es obligatorio"),
    telefono: Yup.string().required("El teléfono es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
    asunto: Yup.string().when("showAsunto", {
      is: (value: boolean) => value,
      then: (schema) => 
        schema.required("El asunto es obligatorio"),
        otherwise: (schema) => schema.notRequired(),
    }),
    cv: Yup.mixed().when("showCV", {
      is: (value: boolean) => value,
      then: (schema) => schema.required("El archivo es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    }),
  };

  console.log(import.meta.env.PUBLIC_BACKEND_URL);
  console.log(import.meta.env.PUBLIC_TARGET_EMAIL);
  console.log(import.meta.env.PUBLIC_EMAILJS_SERVICE_ID);
  console.log(import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID);
  console.log(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);

  const schemaValidation = Yup.object(formBase);

  const baseInitialValues = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    descripcion: "",
    asunto: "",
    cv: null,
  };

  const formik = useFormik({
    initialValues: baseInitialValues,
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      try {

        let fileUrl = "";

        if (showCV && values.cv) {
          const formData = new FormData();
  
          if (values.cv) {
            formData.append('cv', values.cv);
          }
  
          const response = await axios.post(`${import.meta.env.PUBLIC_BACKEND_URL}/send-email`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
  
          if (response.status !== 200) {
            alert("Hubo un error al enviar el archivo.");
            return;
          }
  
          fileUrl = response.data.fileUrl;
        }


        const emailData = {
          t_email: import.meta.env.PUBLIC_TARGET_EMAIL,
          nombre: values.nombre,
          apellido: values.apellido,
          email: values.email,
          telefono: values.telefono,
          descripcion: values.descripcion,
          asunto: values.asunto || "Sin asunto",
          adjunto: fileUrl,
        };

        await emailJs.send(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
          emailData,
          import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
        );

        alert("Información enviada exitosamente.");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        alert("Hubo un error al enviar el formulario.");
      }
    },
  });   

  // validar tamano adjunto
  const validateFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo no puede ser mayor a 5MB");
      formik.setFieldValue("cv", null);
      // limpiar valor del archivo
      (document.getElementById("cv") as HTMLInputElement).value = "";
    }else{
      formik.setFieldValue("cv", file);
    }

  }
  
  return (
    <div id="form-contacto" className="p-2">
      <form
        onSubmit={formik.handleSubmit}
        className="text-base space-y-2 text-gray-800 sm:text-lg sm:leading-5"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={formik.handleChange}
              value={formik.values.nombre}
              onBlur={formik.handleBlur}
              className="w-full bg-gray-100 rounded-lg p-3"
              placeholder="Nombres"
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <div className="text-red-500 text-sm">{formik.errors.nombre}</div>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-gray-100 rounded-lg p-3"
              placeholder="Apellidos"
            />
            {formik.touched.apellido && formik.errors.apellido && (
              <div className="text-red-500 text-sm">
                {formik.errors.apellido}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mx-auto w-full">
          <div className="sm:w-[62%]">
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-gray-100 rounded-lg p-3"
              placeholder="Correo Electrónico"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="sm:w-64">
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-gray-100 rounded-lg p-3"
              placeholder="Teléfono"
            />
            {formik.touched.telefono && formik.errors.telefono && (
              <div className="text-red-500 text-sm">
                {formik.errors.telefono}
              </div>
            )}
          </div>
        </div>

        {showAsunto && (
          <>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formik.values.asunto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-gray-100 rounded-lg p-3"
              placeholder="Asunto"
            />
            {formik.touched.asunto && formik.errors.asunto && (
              <div className="text-red-500 text-sm">{formik.errors.asunto}</div>
            )}
          </>
        )}

        <div>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-gray-100 rounded-lg p-3"
            placeholder="Escriba su Descripción"
          ></textarea>
          {formik.touched.descripcion && formik.errors.descripcion && (
            <div className="text-red-500 text-sm">
              {formik.errors.descripcion}
            </div>
          )}
        </div>

        {showCV && (
          <div className="form-group">
            <label form="file">Adjuntar Hoja de Vida:</label>
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  validateFile(file);
                }
              }}
              accept=".pdf"
              onBlur={formik.handleBlur}
              className="w-full bg-gray-100 rounded-lg p-3"
              placeholder="Hoja de vida"
            />
            {formik.touched.cv && formik.errors.cv && (
              <div className="text-red-500 text-sm">{formik.errors.cv}</div>
            )}
          </div>
        )}

        {showPrivacyPolicy && (
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1"
              id="invalidCheck"
              required
            />
            <label className="text-sm">
              Al hacer clic en el botón Enviar, usted acepta la remisión de la
              PQRD a
              <a
                href="/our-policies"
                className="text-sky-500 hover:text-blue-600 ml-1"
              >
                Nordvital IPS
              </a>
              . Autorizo expresamente a Nordvital IPS para que mis datos puedan
              ser utilizados de acuerdo con la ley de protección de datos
              personales, con el fin de gestionar y dar respuesta a mi
              solicitud.
            </label>
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="bg-sky-500 px-6 py-2 rounded-lg text-white shadow-md hover:bg-sky-600 hover:scale-105 transition-all"
            name="enviado"
          >
            {showAsunto ? "Enviar" : "Enviar Solicitud"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;