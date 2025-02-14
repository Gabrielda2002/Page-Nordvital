import React from "react";
import * as Yup from "yup";
import emailJs from "@emailjs/browser";
import { useFormik } from "formik";

const CustomForm = ({
  showAsunto = true,
  showCV = false,
  emailTemplate = "",
  serviceId = "",
  publicKey = "",
  targetEmail ="",
  buttonText = "Enviar",
  showPrivacyPolicy = true,
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
    asunto: Yup.string().required("El asunto es obligatorio"),
    cv: Yup.string().required("La hoja de vida es obligatoria"),
  };


  const schemaValidation = Yup.object(formBase);

  const baseInitialValues = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    descripcion: "",
    asunto: "",
    cv: "",
  };


  const formik = useFormik({
    initialValues: baseInitialValues,
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      try {
        const emailData = {
          t_email: targetEmail,
          ...values,
        };

        await emailJs.send(
          serviceId,
          emailTemplate,
          emailData,
          publicKey
        );

        alert("Información enviada exitosamente.");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        alert("Hubo un error al enviar el formulario.");
      }
    },
  });   
  
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
              value={formik.values.asunto}
              onChange={formik.handleChange}
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
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;