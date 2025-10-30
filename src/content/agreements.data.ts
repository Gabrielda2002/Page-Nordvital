import compensar from "@/images/Convenios/LOGO-COMPENSAR.webp";
import NuevaEps from "@/images/Convenios/LOGO-NUEVA-EPS.webp";
import coosalud from "@/images/Convenios/COOSALUD_11zon.webp";

export interface ContactLine {
  title: string;
  value: string;
}

export interface Agreement {
  id: number;
  logo: ImageMetadata;
  logoAlt: string;
  logoClass?: string;
  contactLines: ContactLine[];
  containerClass?: string;
}

export const agreements: Agreement[] = [
  {
    id: 1,
    logo: compensar,
    logoAlt: "Logo Compensar",
    logoClass: "w-32 md:w-40 h-auto",
    contactLines: [
      {
        title: "Línea de atención: Cundinamarca",
        value: "601-4441234"
      }
    ]
  },
  {
    id: 2,
    logo: coosalud,
    logoAlt: "Logo Coosalud",
    logoClass: "w-32 md:w-44 h-auto",
    contactLines: [
      {
        title: "Línea de atención:",
        value: "3009147213"
      },
      {
        title: "Línea de atención WhatsApp:",
        value: "3008494148"
      }
    ],
    containerClass: ""
  },
  {
    id: 3,
    logo: NuevaEps,
    logoAlt: "Logo Nueva EPS",
    logoClass: "w-32 md:w-40 h-auto",
    contactLines: [
      {
        title: "Línea de atención fija:",
        value: "300-9135168"
      },
      {
        title: "Línea de atención WhatsApp:",
        value: "317-5141175"
      }
    ],
    containerClass: "mb-5"
  }
];
