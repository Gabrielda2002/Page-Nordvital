import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import emailJs from "@emailjs/browser";

import modal from "@/images/AboutUs/MISION_Y_VISION_1.webp?url";

//icons
import icon from "@/images/AboutUs/Recurso_2.svg";
import { useFormik } from "formik";

const PqrsdfForm = () => {
  const [departamentos, setDepartamentos] = useState<
    { departamento: string; ciudades: string[] }[]
  >([]);
  const [municipios, setMunicipios] = useState<string[]>([]);

  useEffect(() => {
    const apiURL =
      "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json";

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  useEffect(() => {
    if (window.location.hash === "#pqrsfd-form") {
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        const formElement = document.getElementById("pqrsfd-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  // Maneja el cambio del departamento seleccionado
  const handleDepartamentoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const departamentoSeleccionado = event.target.value;

    formik.setFieldValue("departamento", departamentoSeleccionado);

    // Buscar el departamento en la lista de datos y actualizar municipios
    const departamentoEncontrado = departamentos.find(
      (dep) => dep.departamento === departamentoSeleccionado
    );

    if (departamentoEncontrado) {
      setMunicipios(departamentoEncontrado.ciudades);
    } else {
      setMunicipios([]); // Vaciar municipios si no se encuentra
    }
  };

  const schemaValidation = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    tipoIdentificacion: Yup.string().required(
      "El tipo de identificación es obligatorio"
    ),
    numeroIdentificacion: Yup.string()
      .matches(/^\d+$/, "Solo se permiten números")
      .required("El número de identificación es obligatorio"),
    fecha: Yup.date().required("La fecha es obligatoria"),
    celular: Yup.string()
      .matches(/^\d+$/, "Solo se permiten números")
      .required("El número de celular es obligatorio"),
    fijo: Yup.string()
      .matches(/^\d+$/, "Solo se permiten números")
      .required("El número fijo es obligatorio"),
    departamento: Yup.string().required("El departamento es obligatorio"),
    municipio: Yup.string().required("El municipio es obligatorio"),
    eps: Yup.string().required("La EPS es obligatoria"),
    email: Yup.string()
      .email()
      .required("El correo electrónico es obligatorio"),
    tipoSolicitud: Yup.string().required("El tipo de solicitud es obligatorio"),
    asunto: Yup.string().required("El asunto es obligatorio"),
    solicitud: Yup.string().required("La solicitud es obligatoria"),
  });

  // Función para permitir solo números
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    formik.setFieldValue(name, numericValue);
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      tipoIdentificacion: "",
      numeroIdentificacion: "",
      fecha: "",
      celular: "",
      fijo: "",
      departamento: "",
      municipio: "",
      eps: "",
      email: "",
      tipoSolicitud: "",
      asunto: "",
      solicitud: "",
    },
    validationSchema: schemaValidation,
    onSubmit: async (values) => {
      try {
        await emailJs.send(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID_PQRS,
          {
            t_email: import.meta.env.PUBLIC_TARGET_EMAIL,
            nombre: values.nombre,
            apellido: values.apellido,
            tipo_identificacion: values.tipoIdentificacion,
            numero_identificacion: values.numeroIdentificacion,
            fecha: values.fecha,
            celular: values.celular,
            fijo: values.fijo,
            departamento: values.departamento,
            municipio: values.municipio,
            eps: values.eps,
            email: values.email,
            tipo_solicitud: values.tipoSolicitud,
            asunto: values.asunto,
            solicitud: values.solicitud,
            fecha_aplicacion: new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
        );

        alert("Informacion enviada exitosamente.");
        formik.resetForm();
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <>
      <div className="px-6 md:px-8 pb-8 pt-12 bg-gray-100 flex flex-col items-center">
        {/* Header del formulario */}
        <div className="flex flex-col space-y-4 text-center items-center w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Formulario PQRSFD
          </h1>
          <p className="text-base text-justify text-gray-700 leading-relaxed">
            Estamos comprometidos a resolver cualquier inquietud que tenga, para
            proporcionarle un servicio de calidad. Por favor, complete todos los
            campos requeridos para procesar su solicitud de manera eficiente.
          </p>
          <p className="text-base text-justify text-gray-700 leading-relaxed">
            Agradecemos su colaboración al utilizar esta herramienta para
            comunicarse con nosotros.
          </p>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 rounded"></div>
        </div>

        {/* Indicador de progreso visual */}
        <div className="mb-8">
          <div className="flex items-center justify-center md:space-x-4 text-sm md:text-base  md:flex-row">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-nordvital-primary text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <span className="ml-2 text-gray-600">Información Personal</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-nordvital-primary text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-2 text-gray-600">Ubicación y Contacto</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-nordvital-primary text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-gray-600">
                Detalles de la Solicitud
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="overflow-y-auto max-h-[70vh] max-w-4xl bg-gray-50 rounded-lg shadow-md">
            <form
              id="pqrsfd-form"
              onSubmit={formik.handleSubmit}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 md:p-7 space-y-8">
                {/* Sección 1: Información Personal */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      1
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Información Personal
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        onChange={formik.handleChange}
                        value={formik.values.nombre}
                        onBlur={formik.handleBlur}
                        placeholder="Ingrese su nombre"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.nombre && formik.errors.nombre
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.nombre && formik.errors.nombre && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.nombre}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="apellido"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apellido
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ingrese su apellido"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.apellido && formik.errors.apellido
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.apellido && formik.errors.apellido && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.apellido}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="tipo-identificacion"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tipo de identificación
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="tipo-identificacion"
                        name="tipoIdentificacion"
                        value={formik.values.tipoIdentificacion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.tipoIdentificacion &&
                          formik.errors.tipoIdentificacion
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="" disabled>
                          Seleccione
                        </option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                      </select>
                      {formik.touched.tipoIdentificacion &&
                        formik.errors.tipoIdentificacion && (
                          <p className="text-sm text-red-600 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {formik.errors.tipoIdentificacion}
                          </p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="numero-identificacion"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número de identificación
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="numero-identificacion"
                        name="numeroIdentificacion"
                        value={formik.values.numeroIdentificacion}
                        onChange={handleNumericInput}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: 1234567890"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.numeroIdentificacion &&
                          formik.errors.numeroIdentificacion
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.numeroIdentificacion &&
                        formik.errors.numeroIdentificacion && (
                          <p className="text-sm text-red-600 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {formik.errors.numeroIdentificacion}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="fecha"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fecha
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formik.values.fecha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.fecha && formik.errors.fecha
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.fecha && formik.errors.fecha && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.fecha}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                        placeholder="ejemplo@correo.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sección 2: Ubicación y Contacto */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      2
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Ubicación y Contacto
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="celular"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número de celular
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        id="celular"
                        name="celular"
                        value={formik.values.celular}
                        onChange={handleNumericInput}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: 3001234567"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.celular && formik.errors.celular
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.celular && formik.errors.celular && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.celular}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="fijo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número Fijo
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        id="fijo"
                        name="fijo"
                        value={formik.values.fijo}
                        onChange={handleNumericInput}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: 6012345678"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.fijo && formik.errors.fijo
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.fijo && formik.errors.fijo && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.fijo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="departamento"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Departamento
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="departamento"
                        name="departamento"
                        value={formik.values.departamento}
                        onChange={handleDepartamentoChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.departamento &&
                          formik.errors.departamento
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="" disabled>
                          Seleccione
                        </option>
                        {departamentos.map((dep) => (
                          <option
                            key={dep.departamento}
                            value={dep.departamento}
                          >
                            {dep.departamento}
                          </option>
                        ))}
                      </select>
                      {formik.touched.departamento &&
                        formik.errors.departamento && (
                          <p className="text-sm text-red-600 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {formik.errors.departamento}
                          </p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="municipio"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Municipios
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="municipio"
                        name="municipio"
                        value={formik.values.municipio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.municipio && formik.errors.municipio
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        disabled={municipios.length === 0}
                      >
                        <option value="" disabled>
                          Seleccione
                        </option>
                        {municipios.map((municipio) => (
                          <option key={municipio} value={municipio}>
                            {municipio}
                          </option>
                        ))}
                      </select>
                      {formik.touched.municipio && formik.errors.municipio && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.municipio}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="eps"
                        className="block text-sm font-medium text-gray-700"
                      >
                        EPS
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="eps"
                        name="eps"
                        value={formik.values.eps}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.eps && formik.errors.eps
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="" disabled>
                          Seleccione
                        </option>
                        <option value="Nueva EPS">Nueva EPS</option>
                        <option value="Coosalud">Coosalud</option>
                        <option value="Compensar">Compensar</option>
                      </select>
                      {formik.touched.eps && formik.errors.eps && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.eps}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sección 3: Detalles de la Solicitud */}
                <div className="pb-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      3
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Detalles de la Solicitud
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="tipo-solicitud"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tipo de solicitud
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="tipo-solicitud"
                        name="tipoSolicitud"
                        value={formik.values.tipoSolicitud}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.tipoSolicitud &&
                          formik.errors.tipoSolicitud
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="" disabled>
                          Seleccione
                        </option>
                        <option value="PETICION">📝 Petición</option>
                        <option value="QUEJA">😟 Queja</option>
                        <option value="RECLAMO">⚠️ Reclamo</option>
                        <option value="SUGERENCIA">💡 Sugerencia</option>
                        <option value="FELICITACIONES">🎉 Felicitación</option>
                      </select>
                      {formik.touched.tipoSolicitud &&
                        formik.errors.tipoSolicitud && (
                          <p className="text-sm text-red-600 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {formik.errors.tipoSolicitud}
                          </p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="asunto"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                        placeholder="Escriba el asunto de su solicitud"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                          formik.touched.asunto && formik.errors.asunto
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.asunto && formik.errors.asunto && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.asunto}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="solicitud"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Escriba su solicitud
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        id="solicitud"
                        name="solicitud"
                        rows={6}
                        value={formik.values.solicitud}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Describa detalladamente su solicitud..."
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none ${
                          formik.touched.solicitud && formik.errors.solicitud
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.solicitud && formik.errors.solicitud && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formik.errors.solicitud}
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terminos"
                            name="terminos"
                            type="checkbox"
                            required
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="terminos"
                            className="font-medium text-gray-700"
                          >
                            Acepto los términos y condiciones
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <p className="text-gray-600 mt-1">
                            Al hacer clic en Enviar, usted acepta la remisión de
                            la PQRD a NordVital IPS y autoriza el uso de sus
                            datos personales de acuerdo con nuestra{" "}
                            <a
                              href="/data-policy"
                              className="text-indigo-600 hover:text-indigo-500 underline"
                            >
                              Política de protección de datos personales
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer del formulario con botón de envío */}
              <div className="bg-gray-50 px-6 md:px-8 py-6">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-nordvital-primary hover:bg-nordvital-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-lg"
                  >
                    {formik.isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Enviar Solicitud
                      </div>
                    )}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Nos comunicaremos contigo en un plazo de 15 días hábiles
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PqrsdfForm;
