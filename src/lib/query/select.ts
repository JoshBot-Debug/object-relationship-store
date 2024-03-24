import { type ORS } from "../types";
import findMatch from "./findMatch";
import selectFields from "./selectFields";

export default function select<N extends string, O extends Record<string, any>>(
  model: ORS.Model<N>,
  state: ORS.State,
  selectOptions: ORS.SelectOptions<N, O>
): O | O[] | null {
  const { from, where, fields, join } = selectOptions;

  // If where is an array, loop over it and select.
  if (Array.isArray(where))
    return where.flatMap(
      (w) => select(model, state, { ...selectOptions, where: w }) ?? []
    );

  let result: O | O[] | null = null;

  // @ts-ignore
  const schema = model[from] as RelationalObject<N>;

  const table = state[from];

  if (!table) return null;

  // If where is all objects
  if (where === "*") {
    // Result will be all objects.
    result = Object.values(table).flatMap(
      (object) => selectFields<string, O>(fields, object) ?? []
    );
  }

  // If where is an object
  if (typeof where === "object") {
    // Get the primary key
    const primaryKey = where[schema.__primaryKey];

    // If the primary key exists, return the related object.
    if (primaryKey) {
      const selected = selectFields(fields, table[primaryKey]);
      if (selected) result = selected;
    }

    // If there is no primary key
    if (!primaryKey) {
      // Result will be an array of objects.
      result = [];

      // Iterate over all the objects in the table
      // Test them against the where object
      // If a match is found, select the fields and break the loop.
      const entries = Object.entries(table);
      for (let i = 0; i < entries.length; i++) {
        const object = entries[i][1];
        const match = findMatch(where, object)
        if(match) {
          const selected = selectFields(fields, object);
          if (selected) result.push(selected);
        }
      }
    }
  }

  // where is a function
  if (typeof where === "function") {
    // Result will be an array of objects.
    result = [];

    // Iterate over all the objects in the table
    // Test them against the where function
    // If a match is found, select the fields and break the loop.
    const entries = Object.entries(table);
    for (let i = 0; i < entries.length; i++) {
      if (where(entries[i][1])) {
        const selected = selectFields(fields, entries[i][1]);
        if (selected) result.push(selected);
      }
    }
  }

  // If there is a result and we need to join some fields
  if (result && join) {
    if (Array.isArray(result)) {
      result.forEach((object: any) => {
        joinFields<N, O>(object, {
          join,
          from,
          model,
          state,
        });
      });
    }

    if (!Array.isArray(result)) {
      joinFields<N, O>(result, {
        join,
        from,
        model,
        state,
      });
    }
  }

  return result as O | O[] | null;
}

/**
 * This function takes in result, which it will mutate.
 * After this, any fields mentioned in "join" will become the object instead of a primaryKey
 *
 * @param result The result object that will be mutated
 * @param options
 */
function joinFields<N extends string, O extends Record<string, any>>(
  result: O,
  options: {
    join: ORS.JoinOptions<keyof O>[];
    from: string;
    model: ORS.Model<N>;
    state: ORS.State;
  }
) {
  const { join, from, model, state } = options;

  // @ts-ignore
  const schema = model[from] as RelationalObject<N>;

  Object.values(
    join.reduce((r, c) => {
      r[c.on as string] = c;
      return r;
    }, {} as { [k: string]: ORS.JoinOptions<keyof O> })
  ).forEach(({ on, fields, join: innerJoin }) => {
    if (!result[on]) return;

    if (!schema.__relationship[on])
      throw new Error(
        `Field "${String(on)}" does not exist in object "${from}"`
      );

    if (schema.__relationship[on].__has === "hasOne") {
      // Create the selector from the join statement.
      result[on] = select(model, state, {
        fields,
        from: schema.__relationship[on].__name,
        where: {
          [schema.__relationship[on].__primaryKey]: result[on],
        } as Partial<O>,
      }) as any;
    }

    if (schema.__relationship[on].__has === "hasMany") {
      const matches: any[] = [];

      result[on].forEach((primaryKey: any) => {
        // Create the selector from the join statement.
        const match = select(model, state, {
          fields,
          from: schema.__relationship[on].__name,
          where: {
            [schema.__relationship[on].__primaryKey]: primaryKey,
          } as Partial<O>,
        });

        if (match) matches.push(match);
      });

      result[on] = matches as any;
    }

    if (innerJoin) {
      // Check the relationship of the parent, if it is a has one, proceed as normal
      if (schema.__relationship[on].__has === "hasOne") {
        joinFields(result[on], {
          from: schema.__relationship[on].__name,
          join: innerJoin,
          model,
          state,
        });
      }

      // If the relation is a hasMany, loop over each item and join.
      if (schema.__relationship[on].__has === "hasMany") {
        result[on].forEach((object: any) => {
          joinFields(object, {
            from: schema.__relationship[on].__name,
            join: innerJoin,
            model,
            state,
          });
        });
      }
    }
  });
}
