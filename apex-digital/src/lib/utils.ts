type ClassInput = string | string[] | undefined | null | false;

export function cn(...classes: ClassInput[]): string {
  return (classes as (string | string[] | boolean | null | undefined)[])
    .flat()
    .filter((c): c is string => typeof c === 'string' && c.length > 0)
    .join(' ');
}
