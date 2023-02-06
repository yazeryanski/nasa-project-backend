
/**
 * Shorthand for creating a Scheme required property
 * @param type Scheme Property Type
 * @returns {type, required: true}
 */
export const required = (type: any) => {
  return {
    type,
    required: true
  }
}