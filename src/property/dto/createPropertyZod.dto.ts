import z from "zod";

export const createPropertySchema = z
  .object({
    name: z.string().min(2).max(10),
    description: z.string().min(5).max(10),
    price: z.number().positive(),
    // area: z.preprocess((val) => Number(val), z.number().positive()),
    // area: z.coerce.number().positive(),
    // age: z.coerce
    //   .number({
    //     required_error: "Area is required",
    //     invalid_type_error: "Area must be a number",
    //   })
    //   .positive("Area must be a positive number"),
  })
  .required();

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;
