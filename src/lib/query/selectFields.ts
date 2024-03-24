import { type ORS } from "../types";

/**
 * This method does not mutate the object,
 * It creates a copy and returns a new object with the selected fields
 *
 * @param fields Fields to select from the object
 * @param schema The object schema
 * @param object The object to select the fields from.
 * @returns A copy of the object
 */
export default function selectFields<
  N extends string,
  O extends Record<string, any>
>(fields: ORS.SelectOptions<N, O>["fields"], object: O) {
  if (!object) return null;

  let result: O | null = null;

  const selectedFields = fields === "*" ? Object.keys(object) : fields;

  /**
   * If we are returning all fields, select everything and all relations,
   * replace them with their primary key
   */
  for (let i = 0; i < selectedFields.length; i++) {
    const field = selectedFields[i];
    const value = object[field];
    if (value === undefined) continue;
    if (result === null) result = {} as O;
    result[field] = value;
  }

  return result;
}
