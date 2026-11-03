import {
  CalendarCheck,
  CarFront,
  Crosshair,
  Disc,
  Filter,
  Fuel,
  Hammer,
  Layers,
  PaintRoller,
  ScanLine,
  ShieldCheck,
  Snowflake,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import { createElement } from "react";

// Icons staff can pick for a service in /admin (After Sales pages › Services).
// The key is what's stored in content/service.json.
export const SERVICE_ICONS: Record<string, { label: string; icon: LucideIcon }> = {
  car: { label: "Car (accident repairs)", icon: CarFront },
  paint: { label: "Paint roller", icon: PaintRoller },
  chassis: { label: "Frame scan (chassis)", icon: ScanLine },
  dent: { label: "Hammer (dents)", icon: Hammer },
  sanding: { label: "Layers (sanding)", icon: Layers },
  shield: { label: "Shield (protection)", icon: ShieldCheck },
  calendar: { label: "Calendar (maintenance)", icon: CalendarCheck },
  wheel: { label: "Target (alignment)", icon: Crosshair },
  brake: { label: "Disc (brakes)", icon: Disc },
  ac: { label: "Snowflake (A/C)", icon: Snowflake },
  fuel: { label: "Fuel pump", icon: Fuel },
  exhaust: { label: "Filter (exhaust)", icon: Filter },
  wrench: { label: "Wrench (general)", icon: Wrench },
};

/** The icon picked for a service; a wrench if the key is unknown. */
export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  return createElement(SERVICE_ICONS[name]?.icon ?? Wrench, props);
}
