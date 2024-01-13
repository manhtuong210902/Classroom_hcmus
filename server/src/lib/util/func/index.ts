import * as bcrypt from 'bcrypt';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined | null,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

export function getVariableName<TResult>(
  getVar: () => TResult,
): string | undefined {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts.at(-1);
}


export function convertCamelToSnake(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertCamelToSnake(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const newKey = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    acc[newKey] = convertCamelToSnake(obj[key]);
    return acc;
  }, {});
}

export function convertSnakeToCamel(obj: any): any {
  if (obj !== null && typeof obj === 'object' && obj instanceof Date === false) {
    if (Array.isArray(obj)) {
      return obj.map(convertSnakeToCamel);
    } else {
      const camelObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
          camelObj[camelKey] = convertSnakeToCamel(obj[key]);
        }
      }
      return camelObj;
    }
  } else {
    return obj;
  }
}


export function removeNullValues(obj: Object): Object {
  const newObj: Object = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        newObj[key] = removeNullValues(value);
      } else {
        newObj[key] = value;
      }
    }
  }

  return newObj;
}

export function correctStringFormat(inputString: string): string {
  if (!inputString) {
    return "";
  }

  const correctedString = inputString
    .trim() 
    .replace(/\s+/g, " ")

  return correctedString;
}