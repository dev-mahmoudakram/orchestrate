import {
  Activity,
  Blocks,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  Network,
  ScanSearch,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

const contentIcons: Record<string, LucideIcon> = {
  activity: Activity,
  handshake: Handshake,
  landmark: Landmark,
  layers: Layers,
  network: Network,
  "scan-search": ScanSearch,
  "systems-design": Blocks,
  "strategy-orchestration": Waypoints,
  "graduation-cap": GraduationCap,
  users: Users,
};

export function ContentIcon({ icon }: { icon?: string | null }) {
  const Icon = contentIcons[(icon ?? "").toLowerCase()] ?? Waypoints;

  return <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />;
}
