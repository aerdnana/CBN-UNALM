import { config, fields, collection, singleton } from '@keystatic/core';

// En tu computadora usa archivos locales; en la web publicada guarda en GitHub.
const storage = import.meta.env.PROD
  ? { kind: 'github' as const, repo: 'cbn-unalm/web' as const } // ← cambia por tu usuario/repositorio
  : { kind: 'local' as const };

export default config({
  storage,
  ui: { brand: { name: 'CBN UNALM' } },
  singletons: {
    sitio: singleton({
      label: 'Textos generales',
      path: 'src/data/sitio',
      format: { data: 'json' },
      schema: {
        titulo: fields.text({ label: 'Título principal', multiline: true }),
        bajada: fields.text({ label: 'Texto bajo el título', multiline: true }),
        fotoHero: fields.image({ label: 'Foto principal', directory: 'public/images/sitio', publicPath: '/images/sitio/' }),
        nosotrosTitulo: fields.text({ label: 'Nosotros — título' }),
        nosotrosTexto: fields.text({ label: 'Nosotros — texto', multiline: true }),
        ejes: fields.array(
          fields.object({ titulo: fields.text({ label: 'Título' }), texto: fields.text({ label: 'Texto', multiline: true }) }),
          { label: 'Ejes de trabajo', itemLabel: p => p.fields.titulo.value }
        ),
        lema: fields.text({ label: 'Lema (pie de página)', multiline: true }),
        equipo: fields.array(
          fields.object({ nombre: fields.text({ label: 'Nombre' }), cargo: fields.text({ label: 'Cargo' }) }),
          { label: 'Directiva y asesoría', itemLabel: p => p.fields.nombre.value }
        ),
        cifras: fields.array(
          fields.object({ numero: fields.text({ label: 'Número' }), texto: fields.text({ label: 'Texto' }) }),
          { label: 'Cifras de logros', itemLabel: p => p.fields.numero.value + ' ' + p.fields.texto.value }
        ),
        convocatoriaAbierta: fields.checkbox({ label: '¿Convocatoria abierta?', defaultValue: true }),
        convocatoriaTexto: fields.text({ label: 'Texto de convocatoria', multiline: true }),
        convocatoriaLink: fields.url({ label: 'Link del formulario (Google Forms)' }),
        correo: fields.text({ label: 'Correo de contacto' }),
        instagram: fields.url({ label: 'Instagram' }),
        facebook: fields.url({ label: 'Facebook' }),
        tiktok: fields.url({ label: 'TikTok' }),
        linkedin: fields.url({ label: 'LinkedIn' }),
      },
    }),
  },
  collections: {
    emprendimientos: collection({
      label: 'Proyectos',
      slugField: 'nombre',
      path: 'src/content/emprendimientos/*',
      format: { data: 'json' },
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre' } }),
        categoria: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Alimentos', value: 'Alimentos' },
            { label: 'Textil', value: 'Textil' },
            { label: 'Artesanía', value: 'Artesanía' },
            { label: 'Orgánicos', value: 'Orgánicos' },
            { label: 'Aromáticas', value: 'Aromáticas' },
            { label: 'Consultoría', value: 'Consultoría' },
          ],
          defaultValue: 'Alimentos',
        }),
        descripcion: fields.text({ label: 'Descripción corta (1 línea)', validation: { length: { max: 140 } } }),
        imagen: fields.image({ label: 'Logo o foto', directory: 'public/images/emprendimientos', publicPath: '/images/emprendimientos/' }),
        instagram: fields.url({ label: 'Instagram del emprendimiento' }),
        visible: fields.checkbox({ label: 'Mostrar en la web', defaultValue: true }),
      },
    }),
    eventos: collection({
      label: 'Eventos',
      slugField: 'titulo',
      path: 'src/content/eventos/*',
      format: { data: 'json' },
      schema: {
        titulo: fields.slug({ name: { label: 'Título del evento' } }),
        fecha: fields.date({ label: 'Fecha de inicio' }),
        fechaTexto: fields.text({ label: 'Fecha como se muestra', description: 'Ej: 10 y 11 de julio' }),
        lugar: fields.text({ label: 'Lugar y horario' }),
        descripcion: fields.text({ label: 'Descripción', multiline: true }),
        imagen: fields.image({ label: 'Afiche', directory: 'public/images/eventos', publicPath: '/images/eventos/' }),
        destacado: fields.checkbox({ label: 'Destacar en portada', defaultValue: false }),
      },
    }),
    logros: collection({
      label: 'Logros',
      slugField: 'titulo',
      path: 'src/content/logros/*',
      format: { data: 'json' },
      schema: {
        titulo: fields.slug({ name: { label: 'Título' } }),
        categoria: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Extensión', value: 'Extensión' },
            { label: 'Tesis', value: 'Tesis' },
            { label: 'Póster', value: 'Póster' },
            { label: 'Premio', value: 'Premio' },
          ],
          defaultValue: 'Tesis',
        }),
        evento: fields.text({ label: 'Evento o concurso' }),
        anio: fields.integer({ label: 'Año' }),
        descripcion: fields.text({ label: 'Descripción', multiline: true }),
        orden: fields.integer({ label: 'Orden', defaultValue: 1 }),
      },
    }),
    areas: collection({
      label: 'Áreas',
      slugField: 'nombre',
      path: 'src/content/areas/*',
      format: { data: 'json' },
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre del área' } }),
        descripcion: fields.text({ label: 'Qué hace el área' }),
        foto: fields.image({ label: 'Foto', directory: 'public/images/areas', publicPath: '/images/areas/' }),
        orden: fields.integer({ label: 'Orden', defaultValue: 1 }),
      },
    }),
  },
});
