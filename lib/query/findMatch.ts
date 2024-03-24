export default function findMatch<O extends Record<string, any>>(
  where: Partial<O>,
  object: Record<string, any>
) {
  // Iterate over all the fields in the where object
  // If anything does not match with object, return false.
  const entries = Object.entries(where);
  for (let i = 0; i < entries.length; i++) {
    if (object[entries[i][0]] !== entries[i][1]) return false;
  }

  return true;
}
