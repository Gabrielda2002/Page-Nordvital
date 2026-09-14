import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Eye,
  GraduationCap,
  HeartPulse,
  Layers,
  Microscope,
  PersonStanding,
  ScanLine,
  ShieldCheck,
  Smile,
  Stethoscope,
  Syringe,
} from "lucide-react";
import type {
  ReasonIconName,
  ServiceIconName,
} from "@/content/medical-work.data";

/**
 * Iconografía de la línea de Medicina Laboral.
 * Se centraliza aquí para que la página dedicada y el resumen del inicio
 * usen exactamente el mismo icono por servicio.
 */
export const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  ocupacional: Stethoscope,
  visual: Eye,
  laboratorio: Microscope,
  odontologia: Smile,
  fisioterapia: PersonStanding,
  diagnostico: HeartPulse,
  vacunacion: Syringe,
};

export const reasonIcons: Record<ReasonIconName, LucideIcon> = {
  integral: Layers,
  profesionales: GraduationCap,
  tecnologia: ScanLine,
  preventivo: ShieldCheck,
  empresas: Building2,
};
