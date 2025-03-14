// utils/status.ts

export const statusMap = {
  Todo: 0,
  InProgress: 1,
  Completed: 2
};

export const reverseStatusMap: Record<number, string> = {
  0: "Todo",
  1: "InProgress",
  2: "Completed"
};

export const statusDisplayMap: Record<number, { label: string; color: string }> = {
  0: { label: "Todo", color: "#FFA726" },
  1: { label: "In Progress", color: "#42A5F5" },
  2: { label: "Done", color: "#66BB6A" },
};

export const statusColorMap = {
  'Todo': '#FFA500',      // Orange
  'InProgress': '#0088FE', // Blue
  'Completed': '#00C49F'   // Green
} as const;
  