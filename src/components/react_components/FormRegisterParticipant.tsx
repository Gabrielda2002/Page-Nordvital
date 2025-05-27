import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createParticipant } from "./services/createParticipant";

const FormRegisterParticipant = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Estados para selects dependientes
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [loadingPaises, setLoadingPaises] = useState(false);
  const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);
  const [loadingCiudades, setLoadingCiudades] = useState(false);
  const [errorPaises, setErrorPaises] = useState("");
  const [errorDepartamentos, setErrorDepartamentos] = useState("");
  const [errorCiudades, setErrorCiudades] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long")
      .max(50, "Last name must be at most 50 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits long")
      .max(15, "Phone number must be at most 15 digits long"),
    pais: Yup.string().required("El país es obligatorio"),
    departamento: Yup.string().required("El departamento es obligatorio"),
    ciudad: Yup.string().required("La ciudad es obligatoria"),
    typeParticipant: Yup.string().required("Type of participant is required"),
    profession: Yup.string().required("Profession is required"),
    typeDocument: Yup.string().required("Type of document is required"),
    document: Yup.string()
      .required("Document is required")
      .min(5, "Document must be at least 5 digits long")
      .max(20, "Document must be at most 20 digits long"),
    company: Yup.string().required("Company is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      pais: "",
      departamento: "",
      ciudad: "",
      typeParticipant: "",
      profession: "",
      typeDocument: "",
      document: "",
      company: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("country", values.pais);
        formData.append("department", values.departamento);
        formData.append("city", values.ciudad);
        formData.append("typeParticipant", values.typeParticipant);
        formData.append("profession", values.profession);
        formData.append("typeDocument", values.typeDocument);
        formData.append("numberDocument", values.document);
        formData.append("company", values.company);
        formData.append("address", values.address);

        const response = await createParticipant(formData);
        // Handle success or perform additional actions here if needed
        if (response.status === 200 || response.status === 201) {
          setSuccess(true);
          formik.resetForm();
          setError(null);
        }
      } catch (error: any) {
        if (error.response.status === 400) {
          setError(
            "Correo o documento ya registrados o revise el formato de los campos."
          );
        } else {
          setError(`Error al registrar el participante ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // Cargar países al montar
  useEffect(() => {
    setLoadingPaises(true);
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => {
        setPaises(data.data.map((p: any) => p.name));
        setLoadingPaises(false);
      })
      .catch(() => {
        setErrorPaises("Error al cargar países");
        setLoadingPaises(false);
      });
  }, []);

  // Cargar departamentos cuando cambia país
  useEffect(() => {
    if (!formik.values.pais) return;
    setDepartamentos([]);
    setCiudades([]);
    setLoadingDepartamentos(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: formik.values.pais }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartamentos(data.data.states.map((d: any) => d.name));
        setLoadingDepartamentos(false);
      })
      .catch(() => {
        setErrorDepartamentos("Error al cargar departamentos");
        setLoadingDepartamentos(false);
      });
  }, [formik.values.pais]);

  // Cargar ciudades cuando cambia departamento
  useEffect(() => {
    if (!formik.values.pais || !formik.values.departamento) return;
    setCiudades([]);
    setLoadingCiudades(true);
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: formik.values.pais,
        state: formik.values.departamento,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCiudades(data.data);
        setLoadingCiudades(false);
      })
      .catch(() => {
        setErrorCiudades("Error al cargar ciudades");
        setLoadingCiudades(false);
      });
  }, [formik.values.pais, formik.values.departamento]);

  return (
    <>
      {loadingPaises ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header del formulario */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Registro Seminario 2025
              </h1>
              <p className="text-lg text-gray-600">
                Complete el formulario para participar en nuestro seminario
              </p>
              <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
            </div>

            {/* Indicador de progreso visual */}
            <div className="mb-8">
              <div className="flex justify-center space-x-4 text-sm">
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
                  <span className="ml-2 text-gray-600">Ubicación</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-nordvital-primary text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <span className="ml-2 text-gray-600">Detalles del Seminario</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 md:p-8 space-y-8">
                
                {/* Sección 1: Información Personal */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      1
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Información Personal
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700">
                        Tipo de documento
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="typeDocument"
                        name="typeDocument"
                        onChange={formik.handleChange}
                        value={formik.values.typeDocument}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.typeDocument && formik.touched.typeDocument
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="">Seleccione su tipo de documento</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                      </select>
                      {formik.touched.typeDocument && formik.errors.typeDocument && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.typeDocument}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                        Número de documento
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="document"
                        name="document"
                        onChange={formik.handleChange}
                        value={formik.values.document}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: 1234567890"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.document && formik.touched.document
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.document && formik.errors.document && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.document}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombres
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        placeholder="Ingrese sus nombres"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.name && formik.touched.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Apellidos
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Ingrese sus apellidos"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.lastName && formik.touched.lastName
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        placeholder="ejemplo@correo.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.email && formik.touched.email
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
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Número de celular
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: 3001234567"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.phone && formik.touched.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sección 2: Información Profesional y Ubicación */}
                <div className="border-b border-gray-200 pb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      2
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Información Profesional y Ubicación
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                        Profesión
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        onChange={formik.handleChange}
                        value={formik.values.profession}
                        placeholder="Ej: Médico, Ingeniero, etc."
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.profession && formik.touched.profession
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.profession && formik.errors.profession && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.profession}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Empresa u organización
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        onChange={formik.handleChange}
                        value={formik.values.company}
                        onBlur={formik.handleBlur}
                        placeholder="Nombre de su empresa"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.company && formik.touched.company
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.company && formik.errors.company && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Dirección completa
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        placeholder="Ej: Calle 123 #45-67, Barrio Centro"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.address && formik.touched.address
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                      {formik.touched.address && formik.errors.address && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="space-y-2">
                      <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
                        País
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="pais"
                        name="pais"
                        onChange={formik.handleChange}
                        value={formik.values.pais}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.pais && formik.touched.pais
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="">Seleccione un país</option>
                        {loadingPaises && <option>Cargando...</option>}
                        {errorPaises && <option>{errorPaises}</option>}
                        {paises.map((pais, index) => (
                          <option key={index} value={pais}>
                            {pais}
                          </option>
                        ))}
                      </select>
                      {formik.touched.pais && formik.errors.pais && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.pais}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">
                        Departamento/Estado
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="departamento"
                        name="departamento"
                        onChange={formik.handleChange}
                        value={formik.values.departamento}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.departamento && formik.touched.departamento
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        disabled={!formik.values.pais || loadingDepartamentos}
                      >
                        <option value="">Seleccione un departamento</option>
                        {loadingDepartamentos && <option>Cargando...</option>}
                        {errorDepartamentos && <option>{errorDepartamentos}</option>}
                        {departamentos.map((dep, index) => (
                          <option key={index} value={dep}>
                            {dep}
                          </option>
                        ))}
                      </select>
                      {formik.touched.departamento && formik.errors.departamento && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.departamento}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                        Ciudad
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="ciudad"
                        name="ciudad"
                        onChange={formik.handleChange}
                        value={formik.values.ciudad}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.ciudad && formik.touched.ciudad
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        disabled={!formik.values.departamento || loadingCiudades}
                      >
                        <option value="">Seleccione una ciudad</option>
                        {loadingCiudades && <option>Cargando...</option>}
                        {errorCiudades && <option>{errorCiudades}</option>}
                        {ciudades.map((ciudad, index) => (
                          <option key={index} value={ciudad}>
                            {ciudad}
                          </option>
                        ))}
                      </select>
                      {formik.touched.ciudad && formik.errors.ciudad && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.ciudad}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sección 3: Detalles del Seminario */}
                <div className="pb-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      3
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Detalles del Seminario
                    </h2>
                  </div>

                  <div className="max-w-md mx-auto">
                    <div className="space-y-2">
                      <label htmlFor="typeParticipant" className="block text-sm font-medium text-gray-700">
                        Tipo de participación
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="typeParticipant"
                        name="typeParticipant"
                        onChange={formik.handleChange}
                        value={formik.values.typeParticipant}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formik.errors.typeParticipant && formik.touched.typeParticipant
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <option value="">Seleccione su tipo de participación</option>
                        <option value="virtual">🌐 Virtual</option>
                        <option value="presencial">🏢 Presencial</option>
                        <option value="poniente">🎤 Ponente</option>
                        <option value="organizador">🎯 Organizador</option>
                      </select>
                      {formik.touched.typeParticipant && formik.errors.typeParticipant && (
                        <p className="text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {formik.errors.typeParticipant}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mensajes de estado */}
                {(error || success) && (
                  <div className="border-t border-gray-200 pt-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-700">{error}</span>
                      </div>
                    )}
                    {success && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-700">¡Registro exitoso! Nos comunicaremos contigo pronto.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer del formulario con botón de envío */}
              <div className="bg-gray-50 px-6 md:px-8 py-6">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting || loading}
                    className="bg-nordvital-primary hover:bg-nordvital-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Registrando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completar Registro
                      </div>
                    )}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Al registrarte aceptas participar en el Seminario 2025
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormRegisterParticipant;
