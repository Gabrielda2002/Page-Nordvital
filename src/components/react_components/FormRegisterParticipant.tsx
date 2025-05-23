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
          <div className="loader"></div>
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="w-full mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Formulario Registro Seminario 2025
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-5">
            <div className="mb-4">
              <label
                htmlFor="typeDocument"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tipo de documento
                <span className="text-red-500 text-xl">*</span>
              </label>
              <select
                id="typeDocument"
                name="typeDocument"
                onChange={formik.handleChange}
                value={formik.values.typeDocument}
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.typeDocument ? "border-red-500" : ""
                }`}
              >
                <option value="">Seleccione su tipo de documento</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
              </select>
              {formik.touched.typeDocument && formik.errors.typeDocument && (
                <div className="text-red-500 text-sm">
                  {formik.errors.typeDocument}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="document"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Número de documento
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="document"
                name="document"
                onChange={formik.handleChange}
                value={formik.values.document}
                onBlur={formik.handleBlur}
                placeholder="Ej: 1234567890"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.document ? "border-red-500" : ""
                }`}
              />
              {formik.touched.document && formik.errors.document && (
                <div className="text-red-500 text-sm">
                  {formik.errors.document}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombres
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                placeholder="Nombre"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.name ? "border-red-500" : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Apellidos
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellido"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.lastName ? "border-red-500" : ""
                }`}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="profession"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Profesión
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                onChange={formik.handleChange}
                value={formik.values.profession}
                placeholder="Ej: Ingeniero"
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.profession ? "border-red-500" : ""
                }`}
              />
              {formik.touched.profession && formik.errors.profession && (
                <div className="text-red-500 text-sm">
                  {formik.errors.profession}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Empresa
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                onChange={formik.handleChange}
                value={formik.values.company}
                onBlur={formik.handleBlur}
                placeholder="Ej: Google"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.company ? "border-red-500" : ""
                }`}
              />
              {formik.touched.company && formik.errors.company && (
                <div className="text-red-500 text-sm">
                  {formik.errors.company}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder="ejemplo@gmail.com"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.email ? "border-red-500" : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Celular
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                placeholder="Ej: 3001234567"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.phone ? "border-red-500" : ""
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Dirección
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
                placeholder="Ej: Calle 123 #45-67"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.address ? "border-red-500" : ""
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="pais"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                País
                <span className="text-red-500 text-xl">*</span>
              </label>
              <select
                id="pais"
                name="pais"
                onChange={formik.handleChange}
                value={formik.values.pais}
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.pais ? "border-red-500" : ""
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
                <div className="text-red-500 text-sm">{formik.errors.pais}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="departamento"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Departamento
                <span className="text-red-500 text-xl">*</span>
              </label>
              <select
                id="departamento"
                name="departamento"
                onChange={formik.handleChange}
                value={formik.values.departamento}
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.departamento ? "border-red-500" : ""
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
                <div className="text-red-500 text-sm">
                  {formik.errors.departamento}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="ciudad"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Ciudad
                <span className="text-red-500 text-xl">*</span>
              </label>
              <select
                id="ciudad"
                name="ciudad"
                onChange={formik.handleChange}
                value={formik.values.ciudad}
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.ciudad ? "border-red-500" : ""
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
                <div className="text-red-500 text-sm">
                  {formik.errors.ciudad}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="typeParticipant"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tipo de participante
                <span className="text-red-500 text-xl">*</span>
              </label>
              <select
                id="typeParticipant"
                name="typeParticipant"
                onChange={formik.handleChange}
                value={formik.values.typeParticipant}
                onBlur={formik.handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formik.errors.typeParticipant ? "border-red-500" : ""
                }`}
              >
                <option value="">Seleccione su tipo de participación</option>
                <option value="virtual">Virtual</option>
                <option value="presencial">Presencial</option>
                <option value="poniente">Poniente</option>
                <option value="organizador">Organizador</option>
              </select>
              {formik.touched.typeParticipant &&
                formik.errors.typeParticipant && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.typeParticipant}
                  </div>
                )}
            </div>

            <div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-sm mb-4">
                  Registro exitoso.
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Registrarme
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormRegisterParticipant;
