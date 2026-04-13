export interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { value: 200, suffix: "+", label: "Brands Scaled" },
  { value: 8, suffix: "+", label: "Years on Amazon" },
  { value: 50, suffix: "M+", label: "Revenue Generated", prefix: "$" },
  { value: 97, suffix: "%", label: "Client Retention" },
];
