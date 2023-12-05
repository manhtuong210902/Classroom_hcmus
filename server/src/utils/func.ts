export function parseEnum<T>(enumType: T, value: string): T[keyof T] | undefined {
    const enumValues = Object.values(enumType) as string[];
    if (enumValues.includes(value)) {
      return value as T[keyof T];
    }
    return undefined;
}