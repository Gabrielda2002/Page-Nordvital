
import nuevaeIcon from "@/images/Convenios/nueva-eps.svg"
import ocIcon from "@/images/Convenios/optica_caobos.svg"

export type ServiceIconName =
  | "ocupacional"
  | "visual"
  | "laboratorio"
  | "odontologia"
  | "fisioterapia"
  | "diagnostico"
  | "vacunacion";

export type ReasonIconName =
  | "integral"
  | "profesionales"
  | "tecnologia"
  | "preventivo"
  | "empresas";

export interface MedicalWorkItem {
  title: string;
  text: string;
}

export interface MedicalWorkService {
  id: string;
  icon: ServiceIconName;
  title: string;
  tagline: string;
  paragraphs: string[];
  itemsTitle?: string;
  items?: MedicalWorkItem[];
  listTitle?: string;
  list?: string[];
  closing: string;
}

export interface MedicalWorkReason {
  icon: ReasonIconName;
  title: string;
  text: string;
}

export const medicalWorkIntro = {
  eyebrow: "Medicina laboral",
  title: "Tu aliado en salud para tu empresa",
  subtitle:
    "Cuidamos la salud de tu equipo. Impulsamos el bienestar de tu empresa.",
  paragraphs: [
    "En NORDVITAL IPS acompañamos a las empresas en el cuidado integral de la salud de sus colaboradores, ofreciendo servicios de medicina laboral, diagnóstico y prevención que contribuyen a entornos de trabajo más saludables, seguros y productivos.",
    "Soluciones de salud para tu empresa y tu equipo, en un solo lugar.",
  ],
} as const;

export const medicalWorkServices: MedicalWorkService[] = [
  {
    id: "examenes-ocupacionales",
    icon: "ocupacional",
    title: "Exámenes médicos ocupacionales",
    tagline:
      "Con nuestras evaluaciones médicas ocupacionales ayudamos a las empresas a conocer las condiciones de salud de sus colaboradores, identificar factores de riesgo y orientar acciones para promover un trabajo seguro y saludable.",
    paragraphs: [],
    items: [
      {
        title: "Evaluación médica ocupacional de preingreso",
        text: "Permite conocer las condiciones de salud del trabajador antes de iniciar sus actividades y establecer recomendaciones relacionadas con las características del cargo y sus riesgos.",
      },
      {
        title: "Evaluación médica ocupacional periódica",
        text: "Permite realizar seguimiento a las condiciones de salud de los colaboradores y detectar oportunamente posibles cambios relacionados con sus actividades laborales o factores de riesgo.",
      },
      {
        title: "Evaluación médica ocupacional de egreso",
        text: "Permite valorar y documentar las condiciones de salud del trabajador al finalizar su relación laboral.",
      },
      {
        title: "Evaluación médica ocupacional por cambio de ocupación",
        text: "Indicada cuando el trabajador cambia de cargo, funciones o se expone a nuevos factores de riesgo que requieren una nueva valoración.",
      },
      {
        title: "Evaluación médica ocupacional post-incapacidad",
        text: "Permite valorar las condiciones de salud del trabajador después de un periodo de incapacidad y orientar su retorno o reincorporación a las actividades laborales, de acuerdo con el concepto médico.",
      },
    ],
    closing: "",
  },
  {
    id: "salud-visual",
    icon: "visual",
    title: "Salud visual",
    tagline: "Una buena visión también hace parte de un trabajo seguro.",
    paragraphs: [
      "Realizamos evaluaciones de salud visual y optometría orientadas a la prevención, detección de alteraciones visuales y cuidado de la salud ocular de los colaboradores.",
      "Nuestros servicios permiten identificar necesidades de corrección visual y brindar recomendaciones de acuerdo con las características de las actividades laborales.",
    ],
    closing: "Evaluación y cuidado visual para tus colaboradores.",
  },
  {
    id: "laboratorio-clinico",
    icon: "laboratorio",
    title: "Laboratorio clínico",
    tagline:
      "Resultados confiables para apoyar la valoración de tus colaboradores.",
    paragraphs: [
      "Contamos con servicios de laboratorio clínico para apoyar los procesos de evaluación médica ocupacional, seguimiento y prevención, de acuerdo con las necesidades de cada empresa y los requerimientos definidos para el cargo.",
    ],
    listTitle: "Algunos de nuestros servicios:",
    list: [
      "Hemograma",
      "Glucosa en sangre",
      "Creatinina",
      "Perfil lipídico",
      "TSH – Hormona estimulante de la tiroides",
      "Uroanálisis / citoquímico de orina",
      "Coprológico",
      "Coproscópico",
      "Frotis faríngeo",
      "Frotis de uñas",
      "Anticuerpos contra hepatitis B, según prueba solicitada",
      "Y otros exámenes de laboratorio según requerimiento",
    ],
    closing:
      "Los exámenes pueden ser definidos de acuerdo con las características del cargo, los factores de riesgo y las necesidades de la organización.",
  },
  {
    id: "odontologia",
    icon: "odontologia",
    title: "Odontología",
    tagline: "La salud oral también hace parte del bienestar laboral.",
    paragraphs: [
      "Ofrecemos servicios de odontología orientados a la prevención, diagnóstico y cuidado de la salud oral de los colaboradores.",
      "La atención odontológica permite identificar oportunamente alteraciones de la salud oral y promover hábitos que contribuyan al bienestar integral.",
    ],
    closing: "Cuidamos la sonrisa y el bienestar de tu equipo.",
  },
  {
    id: "fisioterapia",
    icon: "fisioterapia",
    title: "Fisioterapia",
    tagline: "Movimiento, prevención y bienestar para tus colaboradores.",
    paragraphs: [
      "Nuestros servicios de fisioterapia están orientados a la prevención, valoración y manejo de alteraciones musculoesqueléticas, contribuyendo al bienestar físico de los trabajadores.",
      "Brindamos atención y orientación enfocada en mejorar la movilidad, disminuir molestias y favorecer hábitos saludables relacionados con el movimiento y la actividad laboral.",
    ],
    closing:
      "Promovemos colaboradores más saludables y empresas más conscientes del cuidado de su equipo.",
  },
  {
    id: "diagnostico-imagenes-cardiologia",
    icon: "diagnostico",
    title: "Diagnóstico por imágenes y cardiología",
    tagline: "Tecnología para apoyar decisiones oportunas en salud.",
    paragraphs: [
      "Complementamos la atención de nuestros pacientes con servicios diagnósticos que permiten obtener información confiable para la valoración y seguimiento de diferentes condiciones de salud.",
    ],
    itemsTitle: "Nuestros servicios de diagnóstico:",
    items: [
      {
        title: "Ecografía",
        text: "Estudios ecográficos para apoyar la evaluación de diferentes órganos y estructuras del cuerpo, de acuerdo con la indicación médica.",
      },
      {
        title: "Rayos X",
        text: "Estudios de radiología convencional para apoyar el diagnóstico y valoración de diferentes condiciones clínicas.",
      },
      {
        title: "Electrocardiograma – ECG",
        text: "Registra la actividad eléctrica del corazón y permite apoyar la evaluación de alteraciones del ritmo y otras condiciones cardiovasculares.",
      },
      {
        title: "Ecocardiograma",
        text: "Estudio que permite valorar la estructura y funcionamiento del corazón mediante imágenes ecográficas.",
      },
      {
        title: "Holter de ritmo",
        text: "Monitoreo ambulatorio y continuo de la actividad eléctrica del corazón durante un periodo determinado, útil para identificar alteraciones del ritmo cardíaco.",
      },
      {
        title: "MAPA – Monitoreo Ambulatorio de la Presión Arterial",
        text: "Permite registrar la presión arterial durante un periodo prolongado, facilitando su evaluación en diferentes momentos de la actividad cotidiana.",
      },
    ],
    closing:
      "Diagnóstico oportuno, tecnología y profesionales al servicio de tu empresa.",
  },
  {
    id: "vacunacion",
    icon: "vacunacion",
    title: "Vacunación",
    tagline: "Prevención que protege a tu equipo.",
    paragraphs: [
      "Contamos con servicios de vacunación orientados a la prevención de enfermedades y a la protección de los colaboradores, de acuerdo con sus condiciones individuales, antecedentes de vacunación, actividad laboral y factores de exposición.",
    ],
    itemsTitle: "Nuestros servicios de vacunación:",
    items: [
      {
        title: "Vacunación antitetánica",
        text: "Protección frente al tétanos, especialmente importante en personas con riesgo de exposición relacionado con determinadas actividades laborales. La aplicación de las dosis y refuerzos se realiza de acuerdo con los antecedentes de vacunación y las recomendaciones vigentes.",
      },
      {
        title: "Vacunación contra fiebre amarilla",
        text: "Servicio dirigido a personas que requieren protección frente a la fiebre amarilla por residencia, desplazamiento, actividad laboral o viaje a zonas donde existe riesgo de transmisión. La necesidad de vacunación o refuerzo se determina de acuerdo con los lineamientos y condiciones de riesgo vigentes.",
      },
      {
        title: "Otras vacunas",
        text: "Disponibilidad de otros servicios de vacunación de acuerdo con las necesidades de la empresa, sus colaboradores y los esquemas de vacunación aplicables.",
      },
    ],
    closing: "Prevenir es cuidar. Protege hoy la salud de tu equipo.",
  },
];

export const medicalWorkAllies = {
  eyebrow: "Empresas y aliados",
  title: "Alianzas que construyen bienestar",
  description:
    "Trabajamos de la mano con organizaciones y aliados estratégicos para acercar soluciones integrales de salud a trabajadores y empresas.",
  listTitle: "Nuestros aliados",
  names: [{ icon: nuevaeIcon, alt:"Ópticas Caobos"}, {icon: ocIcon, alt: "Nueva EPS"}],
} as const;

export const medicalWorkReasons: MedicalWorkReason[] = [
  {
    icon: "integral",
    title: "Atención integral",
    text: "Centralizamos diferentes servicios de salud para facilitar la gestión de las empresas y sus colaboradores.",
  },
  {
    icon: "profesionales",
    title: "Profesionales capacitados",
    text: "Contamos con talento humano orientado a brindar una atención segura, humanizada y de calidad.",
  },
  {
    icon: "tecnologia",
    title: "Tecnología y diagnóstico",
    text: "Integramos servicios diagnósticos y tecnología para apoyar una atención oportuna y confiable.",
  },
  {
    icon: "preventivo",
    title: "Enfoque preventivo",
    text: "Promovemos el cuidado de la salud y la identificación oportuna de factores que puedan afectar el bienestar de los trabajadores.",
  },
  {
    icon: "empresas",
    title: "Soluciones para empresas",
    text: "Adaptamos nuestra oferta a las necesidades de cada organización y de sus equipos de trabajo.",
  },
];

export const medicalWorkCta = {
  title: "Cuidamos a quienes hacen crecer tu empresa",
  paragraphs: [
    "En NORDVITAL IPS creemos que cuidar la salud de los colaboradores es también cuidar el futuro de las organizaciones.",
    "Conversemos sobre las necesidades de salud de tu empresa.",
  ],
  brand: "NORDVITAL IPS",
  brandTagline: "Medicina laboral y servicios integrales de salud",
  contactLabel: "Contáctanos",
} as const;

export const medicalWorkContact = {
  contactPage: "/contact-us",
  whatsapp:
    "https://api.whatsapp.com/send?phone=573174309873&text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20medicina%20laboral%20para%20mi%20empresa.",
} as const;
