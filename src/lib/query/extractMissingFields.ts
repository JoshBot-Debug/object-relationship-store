import { ORS } from "../types";

export default function extractMissingFields<
  N extends string,
  O extends Record<string, any>
>(
  state: ORS.State,
  model: ORS.Model<N>,
  result: O | O[] | null,
  options: ORS.SelectOptions<string, O>
): Record<string, any>[] {
  const { from, join } = options;

  const missing: Record<string, any>[] = [];
  const records = Array.isArray(result) ? result : result ? [result] : [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    // @ts-ignore
    const schema = model[from] as ORS.RelationalObject<N>;
    const primaryKey = record[schema.__primaryKey];

    const fields =
      options.fields === "*"
        ? Object.keys(state[from][primaryKey])
        : options.fields;

    for (let j = 0; j < fields.length; j++) {
      const field = fields[j] as string;
      const joinField = join?.find((j) => j.on === field && j.fields !== "*");

      if (joinField && record[field] !== undefined) {
        // @ts-ignore
        const relatedSchema = model[
          schema.__relationship[field].__name
        ] as ORS.RelationalObject<N>;

        const hasMany =
          Array.isArray(record[field]) &&
          schema.__relationship[field].__has === "hasMany";

        if (hasMany) {
          missing[i] = { [field]: [] };
          for (let k = 0; k < record[field].length; k++) {
            const joinResult = collectJoins(
              state,
              model,
              schema,
              relatedSchema,
              record[field][k],
              field,
              joinField
            );
            if (joinResult) {
              initializeMissing(missing, i, primaryKey, schema);
              missing[i][field].push(joinResult);
            }
          }
          continue;
        }

        const joinResult = collectJoins(
          state,
          model,
          schema,
          relatedSchema,
          record[field],
          field,
          joinField
        );
        if (joinResult) {
          initializeMissing(missing, i, primaryKey, schema);
          missing[i][field] = joinResult;
        }
      }

      if (record[field] === undefined) {
        initializeMissing(missing, i, primaryKey, schema);
        missing[i][field] = undefined;
      }
    }
  }

  return missing;
}

function collectJoins<N extends string>(
  state: any,
  model: any,
  parentSchema: ORS.RelationalObject<N>,
  schema: ORS.RelationalObject<N>,
  object: Record<string, any>,
  field: string,
  joinField: any
) {
  if (!object[schema.__primaryKey])
    throw new Error(
      "You must include the primary key in fields for lookup() to work."
    );

  return extractMissingFields(state, model, object, {
    from: parentSchema.__relationship[field].__name,
    fields: joinField.fields,
    // @ts-ignore
    where: {
      [schema.__primaryKey]: object[schema.__primaryKey],
    },
    join: joinField.join,
  })[0];
}

function initializeMissing<N extends string>(
  missing: any,
  index: number,
  primaryKey: any,
  schema: ORS.RelationalObject<N>
) {
  if (!missing[index]?.__identify__) {
    if (!missing[index]) missing[index] = {};
    if (!primaryKey)
      throw new Error(
        "You must include the primary key in fields for lookup() to work."
      );

    missing[index][schema.__primaryKey] = primaryKey;
    missing[index].__identify__ = schema.__name;
  }
}
