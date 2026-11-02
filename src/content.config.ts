import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const emprendimientos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/emprendimientos' }),
  schema: z.object({ nombre: z.string(), categoria: z.string(), descripcion: z.string().optional(), imagen: z.string().nullable().optional(), instagram: z.string().nullable().optional(), visible: z.boolean().default(true) }),
});
const eventos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/eventos' }),
  schema: z.object({ titulo: z.string(), fecha: z.string().nullable().optional(), fechaTexto: z.string().optional(), lugar: z.string().optional(), descripcion: z.string().optional(), imagen: z.string().nullable().optional(), destacado: z.boolean().default(false) }),
});
const areas = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/areas' }),
  schema: z.object({ nombre: z.string(), descripcion: z.string().optional(), foto: z.string().nullable().optional(), orden: z.number().default(1) }),
});
const logros = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/logros' }),
  schema: z.object({ titulo: z.string(), categoria: z.string(), evento: z.string().optional(), anio: z.number().optional(), descripcion: z.string().optional(), orden: z.number().default(1) }),
});
export const collections = { emprendimientos, eventos, areas, logros };
