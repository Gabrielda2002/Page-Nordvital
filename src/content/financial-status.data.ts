// Archivo de datos con los estados financieros por año
// Importaciones de archivos PDF 2024
import dictamenRevisorFiscal2024 from '@/pdf/2024/1-DICTAMEN REVISOR FISCAL NORDVITAL IPS SAS 2024.pdf';
import notasRevelacion2024 from '@/pdf/2024/2-NOTAS DE REVELACION NORDVITAL IPS SAS 2024.pdf';
import certificadoEstados2024 from '@/pdf/2024/3-CERTIFICADO DE LOS ESTADOS FINANCIEROS  2024.pdf';
import estadoSituacion2024 from '@/pdf/2024/4-ESTADO DE SITUACION FINANCIERA NORDVITAL IPS SAS 2024.pdf';
import estadoGanancias2024 from '@/pdf/2024/5-ESTADO DE GANANCIAS Y PERDIDAS NORDVITAL IPS SAS 2024.pdf';
import estadoFlujo2024 from '@/pdf/2024/6-ESTADO FLUJO DE EFECTIVO NORDVITAL IPS 2024 .pdf';
import estadoCambios2024 from '@/pdf/2024/7-ESTADO CAMBIOS EN EL PATRIMONIO NORDVITAL IPS 2024.pdf';
import distribucionUtilidades2024 from '@/pdf/2024/8-DISTRIBUCION DE UTILIDADES 2024.pdf';
import informeGestion2024 from '@/pdf/2024/9-INFORME DE GESTION 2024.pdf';

// Importaciones de archivos PDF 2023
import estadoSituacion2023 from '@/pdf/2023/ESTADO-DE-SITUACION-FINANCIERA-A-31-DE-DIC-2023.pdf';
import certificadoEstados2023 from '@/pdf/2023/CERTIFICADO-DE-LOS-ESTADOS-FINANCIEROS-2023.pdf';
import estadoGanancias2023 from '@/pdf/2023/ESTADO-DE-GANANCIAS-Y-PERDIDAS-A-31-DE-DIC-2023.pdf';
import dictamenRevisorFiscal2023 from '@/pdf/2023/1-Dictamen-Revisor-Fiscal-Nordvital-AG-2023-1.pdf';

// Importaciones de archivos PDF 2022
import estadoSituacion2022 from '@/pdf/2022/ESTADO-DE-SITUACION-FINANCIERA-A-DICIEMBRE-DEL-2022-NORDVITAL.pdf';
import notasEstados2022 from '@/pdf/2022/NOTAS-A-LOS-ESTADOS-FINANCIEROS-2022-NORDVITAL-IPS-SAS.pdf';
import estadoFlujo2022 from '@/pdf/2022/ESTADOS-FLUJO-DE-EFECTIVO-A-DICIEMBRE-DEL-2022-NORDVITAL.pdf';
import estadoResultados2022 from '@/pdf/2022/ESTADO-DE-RESULTADO-DE-ENERO-A-DICIEMBRE-DEL-2022-NORDVITAL.pdf';
import estadoCambios2022 from '@/pdf/2022/ESTADO-DE-CAMBIOS-EN-EL-PATRIMONIO-A-DICIEMBRE-DEL-2022-NORDVITAL.pdf';

// Importaciones de archivos PDF 2021
import notasEstados2021 from '@/pdf/2021/NOTAS-A-LOS-ESTADOS-FINANCIEROS-2021-NORDVITAL-IPS-SAS-2.pdf';
import certificadoEstados2021 from '@/pdf/2021/CERTIFICACIÓN-DE-ESTADOS-FINANCIEROS-2021-1.pdf';
import dictamenRevisorFiscal2021 from '@/pdf/2021/DICTAMEN-REVISOR-FISCAL-Nordvital-2021-1.pdf';
import estadoGanancias2021 from '@/pdf/2021/NOTAS-A-LOS-ESTADOS-FINANCIEROS-2021-NORDVITAL-IPS-SAS-1.pdf';

// Importaciones de archivos PDF 2020
import estadoSituacion2020 from '@/pdf/2020/ESTADO-SITUACION-FINANCIERA.pdf';
import certificadoEstados2020 from '@/pdf/2020/CERTIFICADO-DE-LOS-ESTADOS-FINANCIEROS.pdf';
import dictamenRevisorFiscal2020 from '@/pdf/2020/DICTAMEN-DEL-REVISOR-FISCAL.pdf';
import notasEstados2020 from '@/pdf/2020/NOTAS-A-LOS-ESTADOS-FINANCIEROS-2020.pdf';
import estadoGanancias2020 from '@/pdf/2020/ESTADO-GANANCIAS-PERDIDAS-2020.pdf';

// Datos de estados financieros por año
export const financialStatusData = [
  {
    year: 2024,
    documents: [
      {
        name: "Dictamen revisor fiscal nordvital ips sas 2024",
        file: dictamenRevisorFiscal2024,
      },
      {
        name: "Notas de revelacion nordvital ips sas 2024",
        file: notasRevelacion2024,
      },
      {
        name: "Certificado de los estados financieros 2024",
        file: certificadoEstados2024,
      },
      {
        name: "Estado de situacion financiera nordvital ips sas 2024",
        file: estadoSituacion2024,
      },
      {
        name: "Estado de ganancias y perdidas nordvital ips sas 2024",
        file: estadoGanancias2024,
      },
      {
        name: "Estado flujo de efectivo nordvital ips 2024",
        file: estadoFlujo2024,
      },
      {
        name: "Estado cambios en el patrimonio nordvital ips 2024",
        file: estadoCambios2024,
      },
      {
        name: "Distribucion de utilidades 2024",
        file: distribucionUtilidades2024,
      },
      {
        name: "Informe de gestion 2024",
        file: informeGestion2024,
      },
    ],
  },
  {
    year: 2023,
    documents: [
      {
        name: "Estado de situación financiera.",
        file: estadoSituacion2023,
      },
      {
        name: "Certificado de los estados financieros.",
        file: certificadoEstados2023,
      },
      {
        name: "Estados de ganancias y pérdidas.",
        file: estadoGanancias2023,
      },
      {
        name: "Dictamen del revisor fiscal.",
        file: dictamenRevisorFiscal2023,
      },
    ],
  },
  {
    year: 2022,
    documents: [
      {
        name: "Estado de situación financiera.",
        file: estadoSituacion2022,
      },
      {
        name: "Notas a los estados de situación financiera.",
        file: notasEstados2022,
      },
      {
        name: "Estados del flujo de efectivo de enero a diciembre.",
        file: estadoFlujo2022,
      },
      {
        name: "Estados de resultados de enero a diciembre.",
        file: estadoResultados2022,
      },
      {
        name: "Estados de cambios en el patrimonio a diciembre.",
        file: estadoCambios2022,
      },
    ],
  },
  {
    year: 2021,
    documents: [
      {
        name: "Notas a los estados financieros.",
        file: notasEstados2021,
      },
      {
        name: "Certificado de los estados financieros.",
        file: certificadoEstados2021,
      },
      {
        name: "Dictamen del revisor fiscal.",
        file: dictamenRevisorFiscal2021,
      },
      {
        name: "Estados de ganancias y perdidas.",
        file: estadoGanancias2021,
      },
    ],
  },
  {
    year: 2020,
    documents: [
      {
        name: "Estado de situación financiera",
        file: estadoSituacion2020,
      },
      {
        name: "Certificado de los estados financieros.",
        file: certificadoEstados2020,
      },
      {
        name: "Dictamen del revisor fiscal.",
        file: dictamenRevisorFiscal2020,
      },
      {
        name: "Notas a los estados financieros.",
        file: notasEstados2020,
      },
      {
        name: "Estados de ganancias y perdidas.",
        file: estadoGanancias2020,
      },
    ],
  },
];
