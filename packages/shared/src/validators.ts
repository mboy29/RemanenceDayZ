import vine from '@vinejs/vine'

const audienceEnum = vine.enum(['player','retailer'] as const)
const categoryEnum = vine.enum(['event','period15d','nonContest'] as const)
const windowEnum   = vine.enum(['once','day','week'] as const)

const limitCohesion = vine.createRule((value, _, field) => {
  const cap = (field.parent as any)?.cap
  const bothNull = (cap == null && value == null)
  const bothSet  = (cap != null && value != null)
  if (!bothNull && !bothSet) {
    return field.report('cap et limitWindow doivent être tous deux vides ou tous deux remplis', 'limit_cohesion', field)
  }
})

export const playerValidator = vine.compile(
  vine.object({
    username: vine.string(),
    postalCode: vine.string().postalCode().optional(),
    address: vine.string().optional(),
    gender: vine.string().in(['man', 'woman', 'other']).optional(),
    phone: vine.string().mobile(),
    age: vine.number().positive().optional()
  })
);

export const playerUpdateValidator = vine.compile(
  vine.object({
    username: vine.string().optional(),
    postalCode: vine.string().postalCode().optional(),
    address: vine.string().optional(),
    gender: vine.string().in(['man', 'woman', 'other']).optional(),
    phone: vine.string().mobile().optional(),
    age: vine.number().positive().optional(),
  })
)

export const retailerValidator = vine.compile(
  vine.object({
    name: vine.string(),
    phone: vine.string(),
    address: vine.string(),
    city: vine.string(),
    postalCode: vine.string(),
    countryCode: vine.string(),
    siret: vine.string(),
    googleBusinessProfileUrl: vine.string()
  })
);

export const createRewardValidator = vine.compile(
  vine.object({
    key: vine.string().trim().minLength(2),
    category: categoryEnum,
    value: vine.number().nullable().optional(),
    cap: vine.number().min(0).nullable().optional(),
    limitWindow: windowEnum.use(limitCohesion()).nullable().optional(),
    scope: vine.array(audienceEnum).nullable().optional(),
    type: vine.array(audienceEnum).minLength(1),
    descriptionPlayer: vine.string().nullable().optional(),
    descriptionRetailer: vine.string().nullable().optional(),
  })
)

export const updateRewardValidator = vine.compile(
  vine.object({
    key: vine.string().trim().minLength(2).optional(),
    category: categoryEnum.optional(),
    value: vine.number().nullable().optional(),
    cap: vine.number().min(0).nullable().optional(),
    limitWindow: windowEnum.use(limitCohesion()).nullable().optional(),
    scope: vine.array(audienceEnum).nullable().optional(),
    type: vine.array(audienceEnum).minLength(1).optional(),
    descriptionPlayer: vine.string().nullable().optional(),
    descriptionRetailer: vine.string().nullable().optional(),
  })
)

export const byKeysRewardsValidator = vine.compile(
  vine.object({
    keys: vine.array(vine.string().trim()).minLength(1).maxLength(200),
    select: vine.array(vine.enum([
      'id','key','category','value','cap','limitWindow','scope','type','descriptionPlayer','descriptionRetailer','createdAt','updatedAt'
    ])).optional(),
  })
)

export const oneKeyRewardsValidator = vine.compile(
  vine.object({
    key: vine.string().trim(),
  })
)

export const listQueryValidator = vine.compile(
  vine.object({
    q: vine.string().trim().optional(),
    category: categoryEnum.optional(),
    type: audienceEnum.optional(),
    prefix: vine.string().trim().optional(),
    limit: vine.number().min(1).max(100).optional(),
    page: vine.number().min(1).optional(),
  })
)
