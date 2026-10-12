import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

export const TOAST_DURATIONS = {
  success: 4000,
  error: 6000,
  warning: 5000,
  info: 4000,
};

export const TOAST_ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info,
};

export const TOAST_STYLES = {
  success: "border-slate-200 bg-white text-slate-900",
  error: "border-slate-200 bg-white text-slate-900",
  warning: "border-slate-200 bg-white text-slate-900",
  info: "border-slate-200 bg-white text-slate-900",
};

export const TOAST_ICON_STYLES = {
  success: "text-emerald-700",
  error: "text-red-600",
  warning: "text-amber-800",
  info: "text-blue-700",
};
