export function mergeClasses(...classes: unknown[]) {
  return classes.filter((cls) => !!cls).join(" ");
}
