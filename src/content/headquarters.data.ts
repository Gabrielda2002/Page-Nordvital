// Importar imágenes
// Cúcuta - Sede 1
import S01img1 from "@/images/Sedes/Cucuta/Sede 1/SEDE-1-1.webp";
import S01img2 from "@/images/Sedes/Cucuta/Sede 1/SEDE-1-2.webp";
import S01img3 from "@/images/Sedes/Cucuta/Sede 1/SEDE-1-3.webp";

// Cúcuta - Sede 2
import S03Img1 from "@/images/Sedes/Cucuta/Sede 2/SEDE-2-1.webp";
import S03Img2 from "@/images/Sedes/Cucuta/Sede 2/SEDE-2-2.webp";
import S03Img3 from "@/images/Sedes/Cucuta/Sede 2/SEDE-2-3.webp";

// Cúcuta - Sede 3
import S04Img1 from "@/images/Sedes/Cucuta/Sede 3/SEDE-3-1.webp";
import S04Img2 from "@/images/Sedes/Cucuta/Sede 3/SEDE-3-2.webp";
import S04Img3 from "@/images/Sedes/Cucuta/Sede 3/SEDE-3-3.webp";

// Cúcuta - Sede 4
import S05Img1 from "@/images/Sedes/Cucuta/Sede 4/SEDE-4-1.webp";
import S05Img2 from "@/images/Sedes/Cucuta/Sede 4/SEDE-4-2.webp";
import S05Img3 from "@/images/Sedes/Cucuta/Sede 4/SEDE-4-3.webp";

// Cúcuta - Sede 5
import S06Img1 from "@/images/Sedes/Cucuta/Sede 5/SEDE-5-1.webp";
import S06Img2 from "@/images/Sedes/Cucuta/Sede 5/SEDE-5-2.webp";
import S06Img3 from "@/images/Sedes/Cucuta/Sede 5/SEDE-5-3.webp";

// Cúcuta - Sede 6
import S07Img1 from "@/images/Sedes/Cucuta/Sede 6/SEDE-6-1.png";
import S07Img2 from "@/images/Sedes/Cucuta/Sede 6/SEDE-6-2.jpg";
import S07Img3 from "@/images/Sedes/Cucuta/Sede 6/SEDE-6-3.webp";

// Cundinamarca - Ubaté
import S08Img1 from "@/images/Sedes/Cundinamarca/Ubate/image-ubate-01.jpg";
import S08Img2 from "@/images/Sedes/Cundinamarca/Ubate/SEDE-1-2.webp";
import S08Img3 from "@/images/Sedes/Cundinamarca/Ubate/SEDE-1-3.webp";

// Cundinamarca - La Mesa
import S09Img1 from "@/images/Sedes/Cundinamarca/La-Mesa/SEDE-2-1.webp";
import S09Img2 from "@/images/Sedes/Cundinamarca/La-Mesa/SEDE-2-2.webp";
import S09Img3 from "@/images/Sedes/Cundinamarca/La-Mesa/SEDE-2-3.webp";

// Cundinamarca - Cajicá
import S10Img1 from "@/images/Sedes/Cundinamarca/Cajica/image-cajica-01.webp";
import S10Img2 from "@/images/Sedes/Cundinamarca/Cajica/SEDE-3-2.webp";
import S10Img3 from "@/images/Sedes/Cundinamarca/Cajica/SEDE-3-3.webp";

// Cundinamarca - La Calera
import S11Img1 from "@/images/Sedes/Cundinamarca/La-Calera/image-calera-01.jpg";
import S11Img2 from "@/images/Sedes/Cundinamarca/La-Calera/SEDE-4-2.webp";
import S11Img3 from "@/images/Sedes/Cundinamarca/La-Calera/SEDE-4-3.webp";

// cundinamarca - Chia
import Chia01 from "@/images/Sedes/Cundinamarca/Chia/image-chia-01.webp"
import Chia02 from "@/images/Sedes/Cundinamarca/Chia/image-chia-02.webp"
import Chia03 from "@/images/Sedes/Cundinamarca/Chia/image-chia-03.webp"

export interface Headquarters {
    id: number;
    department: string;
    title: string;
    address: string;
    mapLink: string;
    images: ImageMetadata[];
    latitude?: number;
    longitude?: number;
}

interface ContentTab {
    id: string;
    title: string;
}

export const HEADQUARTERS_DATA: Headquarters[] = [
    // Sedes de Cúcuta
    {
        id: 1,
        department: "cucuta",
        title: "SEDES 01:",
        address: "Calle 14A # 2E-86",
        mapLink: "https://maps.app.goo.gl/CfLihr4Zs9jLwyi79",
        images: [S01img1, S01img2, S01img3],
        latitude: 7.884377881441531,
        longitude: -72.49502889815585
    },
    {
        id: 2,
        department: "cucuta",
        title: "SEDES 03:",
        address: "Calle 13A # 1E-52",
        mapLink: "https://maps.app.goo.gl/MovPiQ2E3mschyoS7",
        images: [S03Img1, S03Img2, S03Img3],
        latitude: 7.884311168487165,
        longitude: -72.49709690122056
    },
    {
        id: 3,
        department: "cucuta",
        title: "SEDES 04:",
        address: "Calle 15 # 2E-07",
        mapLink: "https://maps.app.goo.gl/frVt8vMnDnE4Az3o6",
        images: [S04Img1, S04Img2, S04Img3],
        latitude: 7.8831623112436136,
        longitude: -72.49545126072913
    },
    {
        id: 4,
        department: "cucuta",
        title: "SEDES 05:",
        address: "AV. 3A E # 13A-82 CAOBOS",
        mapLink: "https://maps.app.goo.gl/qeYXCAhAt7Kihwps8",
        images: [S05Img1, S05Img2, S05Img3],
        latitude: 7.8843952736540395,
        longitude: -72.4939252674719
    },
    {
        id: 5,  
        department: "cucuta",
        title: "SEDES 06:",
        address: "SEDE AV2 ESTE # 14A-10 CAOBOS",
        mapLink: "https://maps.app.goo.gl/MsU4raTfftwrrgff7",
        images: [S06Img1, S06Img2, S06Img3],
        latitude: 7.883771531270344,
        longitude: -72.49578071504811
    },
    {
        id: 6,
        department: "cucuta",
        title: "SEDES 07:",
        address: "CALLE 8 # 0-71 BARRIO LATINO",
        mapLink: "https://maps.app.goo.gl/MsU4raTfftwrrgff7",
        images: [S07Img1, S07Img2, S07Img3],
        latitude: 7.889777001722247,
        longitude: -72.49932596258395
    },
    // Sedes de Cundinamarca
    {
        id: 7,
        department: "cundinamarca",
        title: "Sede Ubaté:",
        address: "CALLE 11 # 5-20 JUAN JOSE NEIRA",
        mapLink: "https://maps.app.goo.gl/CL68fh6z9HDBARhu8",
        images: [S08Img1, S08Img2, S08Img3],
        latitude: 5.309534857663404,
        longitude: -73.81152648845642
    },
    {
        id: 8,
        department: "cundinamarca",
        title: "Sede La Mesa:",
        address: "CALLE 8 # 24-67 ALVAREZ DIAZ",
        mapLink: "https://maps.app.goo.gl/Bntm8wxFXDekCtgK8",
        images: [S09Img1, S09Img2, S09Img3],
        latitude: 4.62917945662949,
        longitude: -74.46615997730521
    },
    {
        id: 9,
        department: "cundinamarca",
        title: "Sede Cajíca:",
        address: "CARRERA 7 # 2-46",
        mapLink: "https://maps.app.goo.gl/fVRix63tKta678LR6",
        images: [S10Img1, S10Img2, S10Img3],
        latitude: 4.917946499728211,
        longitude: -74.02753260490353
    },
    {
        id: 10,
        department: "cundinamarca",
        title: "Sede La Calera:",
        address: "CARRERA 5 # 2A-69",
        mapLink: "https://maps.app.goo.gl/rbHQBipQYNMjoyBD9",
        images: [S11Img1, S11Img2, S11Img3],
        latitude: 4.718780263725662,
        longitude: -73.97089028413666
    },
    {
        id: 12,
        department: "cundinamarca",
        title: "Sede Chía:",
        address: "Carrera 9 Nro. 16A-05 Barrio Osorio",
        mapLink: "https://maps.app.goo.gl/SwjgFedHMmHcdYDu7",
        images: [Chia01, Chia02, Chia03],
        latitude: 4.865059359416426,
        longitude: -74.05753859647155
    },
]



export const CONTENT_TABS: ContentTab[] = [
  {
    id: "cucuta",
    title: "Cúcuta",
  },
  {
    id: "cundinamarca",
    title: "Cundinamarca",
  }
];