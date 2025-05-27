import React, { useState } from "react";
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
  showCV,
  showPrivacyPolicy,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
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
      then: (schema) => schema.required("El asunto es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    }),
    cv: Yup.mixed().when("showCV", {
      is: (value: boolean) => value,
      then: (schema) => schema.required("El archivo es obligatorio"),
      otherwise: (schema) => schema.notRequired(),
    }),
  };

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
            formData.append("cv", values.cv);
          }

          const response = await axios.post(
            `${import.meta.env.PUBLIC_BACKEND_URL}/send-email`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status !== 200) {
            alert("Hubo un error al enviar el archivo.");
            return;
          }

          fileUrl = response.data.fileUrl;
        }

        const emailCustom =
          showCV === true
            ? import.meta.env.PUBLIC_TARGET_EMAIL_WORKUS
            : import.meta.env.PUBLIC_TARGET_EMAIL;

        const templateCustom =
          showCV === true
            ? import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID_WORKUS
            : import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;

        const emailData = {
          t_email: emailCustom,
          nombre: values.nombre,
          apellido: values.apellido,
          email: values.email,
          telefono: values.telefono,
          descripcion: values.descripcion,
          asunto: values.asunto || "Sin asunto",
          adjunto: fileUrl,
          fecha_aplicacion: new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        await emailJs.send(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          templateCustom,
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
  }); // validar tamano adjunto
  const validateFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("El archivo no puede ser mayor a 5MB");
      formik.setFieldValue("cv", null);
      setSelectedFileName("");
      // limpiar valor del archivo
      (document.getElementById("cv") as HTMLInputElement).value = "";
    } else {
      formik.setFieldValue("cv", file);
      setSelectedFileName(file.name);
    }
  };

  // función para limpiar archivo seleccionado
  const clearFile = () => {
    formik.setFieldValue("cv", null);
    setSelectedFileName("");
    (document.getElementById("cv") as HTMLInputElement).value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header del formulario */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {showCV ? "Trabaja con Nosotros" : showAsunto ? "Contáctanos" : "Envía tu Solicitud"}
          </h1>
          <p className="text-lg text-gray-600">
            {showCV 
              ? "Únete a nuestro equipo de trabajo" 
              : "Nos pondremos en contacto contigo pronto"
            }
          </p>
          <div className="w-24 h-1 bg-sky-500 mx-auto mt-4 rounded"></div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Información Personal */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombres
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={formik.handleChange}
                    value={formik.values.nombre}
                    onBlur={formik.handleBlur}
                    placeholder="Ej: Pepito"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
                      formik.touched.nombre && formik.errors.nombre
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {formik.touched.nombre && formik.errors.nombre && (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.nombre}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                    Apellidos
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ej: Pérez"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
                      formik.touched.apellido && formik.errors.apellido
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {formik.touched.apellido && formik.errors.apellido && (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.apellido}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="example@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                    Número de teléfono
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Ej: 3001234567"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
                      formik.touched.telefono && formik.errors.telefono
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  {formik.touched.telefono && formik.errors.telefono && (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.telefono}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Asunto (si se muestra) */}
            {showAsunto && (
              <div className="space-y-2">
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">
                  Asunto
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formik.values.asunto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Asunto del mensaje"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 ${
                    formik.touched.asunto && formik.errors.asunto
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
                {formik.touched.asunto && formik.errors.asunto && (
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formik.errors.asunto}
                  </p>
                )}
              </div>
            )}

            {/* Mensaje */}
            <div className="space-y-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={4}
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Describe tu mensaje o solicitud..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none ${
                  formik.touched.descripcion && formik.errors.descripcion
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {formik.touched.descripcion && formik.errors.descripcion && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formik.errors.descripcion}
                </p>
              )}
            </div>

            {/* Hoja de Vida (si se muestra) */}
            {showCV && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Adjuntar Hoja de Vida
                  <span className="text-red-500 ml-1">*</span>
                </label>

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
                  className="hidden"
                />

                <div className="relative">
                  <div
                    onClick={() => document.getElementById("cv")?.click()}
                    className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 hover:border-sky-400 transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <svg
                        className="w-10 h-10 text-gray-400 group-hover:text-sky-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="text-gray-600 group-hover:text-sky-600 transition-colors">
                        <span className="font-medium text-lg">Haz clic para subir tu CV</span>
                        <p className="text-sm text-gray-500 mt-1">
                          Solo archivos PDF (máx. 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedFileName && (
                    <div className="mt-4 p-4 bg-sky-50 border border-sky-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium truncate max-w-xs">
                          {selectedFileName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-100 rounded-full"
                        title="Eliminar archivo"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {formik.touched.cv && formik.errors.cv && (
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formik.errors.cv}
                  </p>
                )}
              </div>
            )}

            {/* Política de Privacidad */}
            {showPrivacyPolicy && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    id="invalidCheck"
                    required
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    Al hacer clic en el botón Enviar, usted acepta la remisión de la PQRD a
                    <a
                      href="/our-policies"
                      className="text-sky-600 hover:text-sky-800 ml-1 font-medium underline"
                    >
                      Nordvital IPS
                    </a>
                    . Autorizo expresamente a Nordvital IPS para que mis datos puedan ser utilizados de acuerdo con la ley de protección de datos personales, con el fin de gestionar y dar respuesta a mi solicitud.
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer del formulario con botón de envío */}
          <div className="bg-gray-50 px-6 md:px-8 py-6">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-sky-300 focus:outline-none shadow-lg"
              >
                {formik.isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {showAsunto ? "Enviar Mensaje" : "Enviar Solicitud"}
                  </div>
                )}
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              Nos pondremos en contacto contigo pronto
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomForm;