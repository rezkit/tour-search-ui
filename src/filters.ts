import { z } from 'zod'

const Predicate = z.boolean().or(z.function().returns(z.boolean()))

const CategoryFilterDefinition = z.object({
  type: z.literal('category'),
  as: z.enum(['checkboxs', 'dropdown', 'radio']),
  title: z.string(),
  category: z.string().nonempty(),
  collapsed: Predicate,
  collapsable: Predicate,
})

const DateFilterDefinition = z.object({
  type: z.literal('dates'),
  as: z.enum(['checkboxes', 'dropdown', 'calendar']),
  title: z.string(),
  collapsed: Predicate,
  collapsable: Predicate,
})

const LocationFilterDefinition = z.object({
  type: z.literal('location'),
  as: z.enum(['checkboxs', 'dropdown', 'radio']),
  title: z.string(),
  location_type: z.string().nonempty(),
  collapsed: Predicate,
  collapsable: Predicate,
})

const FilterDefinition = z.discriminatedUnion('type', [
  CategoryFilterDefinition,
  DateFilterDefinition,
  LocationFilterDefinition,
])

export type FilterDefinition = z.infer<typeof FilterDefinition>
