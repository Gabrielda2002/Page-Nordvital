import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import emailJs from '@emailjs/browser'

import modal from "@/images/AboutUs/MISION_Y_VISION.jpg";

//icons
import icon from "@/images/AboutUs/Recurso_2.svg";
import { useFormik } from "formik";

const PqrsdfForm = () => {
  const [standOpen, setStandOpen] = useState(false);

  useEffect(() => {
    if (standOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [standOpen]);

  const [departamentos, setDepartamentos] = useState<
    { departamento: string; ciudades: string[] }[]
  >([]);
  const [municipios, setMunicipios] = useState<string[]>([]);

  useEffect(() => {
    // URL de la API que contiene los departamentos y municipios
    const apiURL =
      "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json";

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setDepartamentos(data); // Guardamos la data en el estado
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []); // Se ejecuta solo una vez al montar el componente

  // Maneja el cambio del departamento seleccionado
  const handleDepartamentoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const departamentoSeleccionado = event.target.value;

    formik.setFieldValue('departamento', departamentoSeleccionado);

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
    numeroIdentificacion: Yup.string().required(
      "El número de identificación es obligatorio"
    ),
    fecha: Yup.date().required("La fecha es obligatoria"),
    celular: Yup.string().required("El número de celular es obligatorio"),
    fijo: Yup.string().required("El número fijo es obligatorio"),
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
          await emailJs.send('service_i4i8je4', 'template_df99alq', {
            t_email: 'info@nordvitalips.com',
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
          },
        "EU9Av1Gcbfi0qIVJC"
      );

          alert('Informacion enviada exitosamente.')
          formik.resetForm()
        } catch (error) {
          console.log(error)
        }

    },
  });

  return (
    <>
      <section className="w-[55%] mx-auto items-center text-center text-lg text-gray-500 mb-20 font-medium">
        <p>
          Con el fin de facilitar este proceso,
          <strong>hemos desarrollado un formato</strong> que puede completar
          para brindarnos información detallada sobre su caso.
        </p>
        <br />
        <p>
          Agradecemos su colaboración al utilizar esta herramienta para
          comunicarse con nosotros. Estamos comprometidos a resolver cualquier
          inquietud que tenga a proporcionarle un servicio de calidad.
        </p>
      </section>

      <div
        className="mx-4 md:mx-auto mb-10 md:w-2/3 h-auto md:h-[165px] bg-cover bg-no-repeat rounded-[40px]"
        style={{ backgroundImage: `url(${modal.src})` }}
      >
        <div className="card-body flex flex-col md:flex-row justify-between p-6 md:p-10">
          <div className="mv__titulo text-center md:text-left">
            <h5 className="text-white text-2xl md:text-[38px] font-bold mb-3">
              PQRSFD
            </h5>
            <p className="text-white w-full md:w-2/3">
              Por favor, completa el formulario a continuación para ayudarnos a
              mejorar nuestros servicios.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              id="openModal"
              className="cursor-pointer p-4 md:p-14"
              onClick={() => setStandOpen(true)}
            >
              <img
                src={icon.src}
                alt="Icono Misión y Visión"
                className="mx-auto"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {standOpen && (
        <div
          id="formModal"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div
            className={`w-[900px] bg-white overflow-hidden rounded shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
              standOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative bg-white rounded-lg w-full max-w-4xl mx-auto">
              <div className="flex justify-end p-2">
                <button
                  className="text-gray-500 hover:text-red-500 text-5xl"
                  onClick={() => setStandOpen(false)}
                >
                  &times;
                </button>
              </div>

              <div className="px-4 py-10 bg-gray-100 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-5">
                    <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                      i
                    </div>
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700 flex-1">
                      <h2 className="leading-relaxed flex">
                        Formulario PQRSFD
                      </h2>
                      <p className="text-sm text-gray-500 font-normal leading-relaxed flex-col text-left">
                        Por favor, complete todos los campos requeridos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[70vh]">
                  <div className="divide-y divide-gray-200">
                    <form
                      id="pqrsfd-form"
                      onSubmit={formik.handleSubmit}
                      className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                    >
                      <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="nombre"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            onChange={formik.handleChange}
                            value={formik.values.nombre}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.nombre && formik.errors.nombre && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.nombre}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="apellido"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Apellido
                          </label>
                          <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.apellido && formik.errors.apellido && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.apellido}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="tipo-identificacion"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tipo de identificación
                          </label>
                          <select
                            id="tipo-identificacion"
                            name="tipoIdentificacion"
                            value={formik.values.tipoIdentificacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccione</option>
                            <option value="cc">Cédula de Ciudadanía</option>
                            <option value="ce">Cédula de Extranjería</option>
                            <option value="pasaporte">Pasaporte</option>
                          </select>
                          {formik.touched.tipoIdentificacion &&
                            formik.errors.tipoIdentificacion && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.tipoIdentificacion}
                              </div>
                            )}
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="numero-identificacion"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número de identificación
                          </label>
                          <input
                            type="text"
                            id="numero-identificacion"
                            name="numeroIdentificacion"
                            value={formik.values.numeroIdentificacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.numeroIdentificacion &&
                            formik.errors.numeroIdentificacion && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.numeroIdentificacion}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="fecha"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Fecha
                          </label>
                          <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formik.values.fecha}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.fecha && formik.errors.fecha && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.fecha}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="celular"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número de celular
                          </label>
                          <input
                            type="tel"
                            id="celular"
                            name="celular"
                            value={formik.values.celular}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.celular && formik.errors.celular && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.celular}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="celular"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número Fijo
                          </label>
                          <input
                            type="tel"
                            id="fijo"
                            name="fijo"
                            value={formik.values.fijo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.fijo && formik.errors.fijo && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.fijo}
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <label
                            htmlFor="departamento"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Departamento
                          </label>
                          <select
                            id="departamento"
                            name="departamento"
                            value={formik.values.departamento}
                            onChange={handleDepartamentoChange}
                            onBlur={formik.handleBlur}
                            className="departamento mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccione</option>
                            {departamentos.map(dep => (
                              <option key={dep.departamento} value={dep.departamento}>{dep.departamento}</option>
                            ))}
                          </select>
                          {formik.touched.departamento && formik.errors.departamento && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.departamento}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="municipio"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Municipios
                          </label>
                          <select
                            id="municipio"
                            name="municipio"
                            value={formik.values.municipio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="municipio mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            disabled={municipios.length === 0}
                          >
                            <option value="">Seleccione</option>
                            {municipios.map((municipio) => (
                              <option key={municipio} value={municipio}>
                                {municipio}
                              </option>
                            ))}
                          </select>
                          {formik.touched.municipio && formik.errors.municipio && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.municipio}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="eps"
                            className="block text-sm font-medium text-gray-700"
                          >
                            EPS
                          </label>
                          <select
                            id="eps"
                            name="eps"
                            value={formik.values.eps}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option value="">Seleccione</option>
                            <option value="Nueva EPS">Nueva EPS</option>
                            <option value="Coosalud">Coosalud</option>
                            <option value="Compensar">Compensar</option>
                          </select>
                          {formik.touched.eps && formik.errors.eps && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.eps}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="tipo-solicitud"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tipo de solicitud
                        </label>
                        <select
                          id="tipo-solicitud"
                          name="tipoSolicitud"
                          value={formik.values.tipoSolicitud}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">Seleccione</option>
                          <option value="peticion">Petición</option>
                          <option value="queja">Queja</option>
                          <option value="reclamo">Reclamo</option>
                          <option value="sugerencia">Sugerencia</option>
                          <option value="felicitacion">Felicitación</option>
                        </select>
                        {formik.touched.tipoSolicitud && formik.errors.tipoSolicitud && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.tipoSolicitud}
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="asunto"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Asunto
                        </label>
                        <input
                          type="text"
                          id="asunto"
                          name="asunto"
                          value={formik.values.asunto}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {formik.touched.asunto && formik.errors.asunto && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.asunto}
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="solicitud"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Escriba su solicitud
                        </label>
                        <textarea
                          id="solicitud"
                          name="solicitud"
                          rows={4}
                          value={formik.values.solicitud}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                        {formik.touched.solicitud && formik.errors.solicitud && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.solicitud}
                          </div>
                        )}
                      </div>
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
                        <div className="text-sm">
                          <label
                            htmlFor="terminos"
                            className="font-medium text-gray-700"
                          >
                            Acepto los términos y condiciones
                          </label>
                          <p className="text-gray-500">
                            Al hacer clic en Enviar, usted acepta la remisión de
                            la PQRD a NordVital IPS y autoriza el uso de sus
                            datos personales de acuerdo con nuestra{" "}
                            <a
                              href="/politica-de-privacidad"
                              className="text-indigo-600 hover:text-indigo-500"
                            >
                              Política de protección de datos personales
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 mb-16">
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Enviar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* <script>

      import emailJs from '@emailjs/browser'

      const departamentoSelect = document.querySelector(".departamento");
      const municipioSelect = document.querySelector(".municipio");

      if (departamentoSelect) {
        // URL de la API que contiene los departamentos y municipios
        const apiURL =
          "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json";

        fetch(apiURL)
          .then((response) => response.json())
          .then((data) => {
            data.forEach(
              (departamento: { departamento: string; ciudades: string[] }) => {
                const option = document.createElement("option");
                option.value = departamento.departamento;
                option.textContent = departamento.departamento;
                departamentoSelect.appendChild(option);
              }
            );

            departamentoSelect.addEventListener(
              "change",
              function (this: HTMLSelectElement) {
                const selectedDepartamento = this.value;
                if (municipioSelect) {
                  municipioSelect.innerHTML =
                    '<option selected disabled value="">Seleccione</option>';

                  const departamento = data.find(
                    (dep: { departamento: string; ciudades: string[] }) =>
                      dep.departamento === selectedDepartamento
                  );
                  if (departamento && departamento.ciudades) {
                    // Poblar los municipios
                    departamento.ciudades.forEach((municipio: string) => {
                      const option = document.createElement("option");
                      option.value = municipio;
                      option.textContent = municipio;
                      municipioSelect.appendChild(option);
                    });

                    // Habilitar el select de municipios
                    municipioSelect.removeAttribute("disabled");
                  } else {
                    municipioSelect.setAttribute("disabled", "true");
                  }
                }
              }
            );
          })
          .catch((error) => console.error("Error al cargar los datos:", error));
      }
      // modal de formulario

      const modal = document.getElementById("formModal");
      const openButton = document.getElementById("openModal");
      const closeButton = document.getElementById("closeModal");

      const toggleModal = (event: boolean) => {
        if (modal) {
          if (event) {
            modal.classList.remove("hidden");
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
          } else {
            modal.classList.add("hidden");
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
          }
        }
      };
      if (openButton) {
        openButton.addEventListener("click", () => toggleModal(true));
      }

      if (closeButton) {
        closeButton.addEventListener("click", () => toggleModal(false));
      }

      // envio datos formulario a correo

      
      const form = document.getElementById("pqrsfd-form") as HTMLFormElement;

      form?.addEventListener('submit', async  (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
          await emailJs.send('service_i4i8je4', 'template_df99alq', {
            t_email: 'info@nordvitalips.com',
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            tipo_identificacion: formData.get('tipo-identificacion'),
            numero_identificacion: formData.get('numero-identificacion'),
            fecha: formData.get('fecha'),
            celular: formData.get('celular'),
            fijo: formData.get('fijo'),
            departamento: formData.get('departamento'),
            municipio: formData.get('municipio'),
            eps: formData.get('eps'),
            email: formData.get('email'),
            tipo_solicitud: formData.get('tipo-solicitud'),
            asunto: formData.get('asunto'),
            solicitud: formData.get('solicitud')
          },
        "EU9Av1Gcbfi0qIVJC"
      );

          alert('Informacion enviada exitosamente.')


        } catch (error) {
          console.log(error)
        }

      })


      
    </script> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PqrsdfForm;
