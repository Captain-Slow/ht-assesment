import { normalize, denormalize, schema } from "normalizr"

type SchemaFunction = (value: any, parent: any, key: string) => string

export async function normaliseData(
  data: Array<any>,
  idAttribute?: string | SchemaFunction
) {
  try {
    if (data.length > 0) {
      const idAttributeOption = idAttribute === undefined ? "id" : idAttribute

      const schema_ = new schema.Entity("normalisedData", undefined, {
        idAttribute: idAttributeOption,
      })
      const schemaList = [schema_]

      const { entities } = await normalize(data, schemaList)

      return entities.normalisedData
    } else {
      throw "No data"
    }
  } catch (error) {
    return {}
  }
}

export async function denormaliseData(data: Array<any>) {
  try {
    if (Object.keys(data).length > 0) {
      const schema_ = new schema.Entity("normalisedData")
      const mySchema = { normalisedData: [schema_] }
      const entities = { normalisedData: data }
      const denormalizedData = denormalize(
        { normalisedData: Object.keys(data) },
        mySchema,
        entities
      )

      return denormalizedData.normalisedData
    } else {
      throw "No data"
    }
  } catch (error) {
    return {}
  }
}
