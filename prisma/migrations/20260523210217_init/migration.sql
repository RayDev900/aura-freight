-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_roles" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "rol_id" TEXT NOT NULL,

    CONSTRAINT "usuario_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permiso_roles" (
    "id" TEXT NOT NULL,
    "rol_id" TEXT NOT NULL,
    "modulo" VARCHAR(50) NOT NULL,
    "puede_ver" BOOLEAN NOT NULL DEFAULT false,
    "puede_crear" BOOLEAN NOT NULL DEFAULT false,
    "puede_editar" BOOLEAN NOT NULL DEFAULT false,
    "puede_eliminar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "permiso_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "empresa" VARCHAR(150) NOT NULL,
    "rnc" VARCHAR(20) NOT NULL,
    "ciudad" VARCHAR(80) NOT NULL,
    "direccion" VARCHAR(255),
    "telefono" VARCHAR(20),
    "email" VARCHAR(150),
    "contacto" VARCHAR(100),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conductores" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "cedula" VARCHAR(20) NOT NULL,
    "telefono" VARCHAR(20),
    "licencia_num" VARCHAR(30) NOT NULL,
    "licencia_cat" VARCHAR(10) NOT NULL,
    "licencia_vence" DATE NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "conductores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculos" (
    "id" TEXT NOT NULL,
    "placa" VARCHAR(20) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "capacidad_kg" DECIMAL(10,2) NOT NULL,
    "capacidad_m3" DECIMAL(10,2) NOT NULL,
    "anio" SMALLINT NOT NULL,
    "estado" VARCHAR(20) NOT NULL,
    "lat" DECIMAL(10,6),
    "lng" DECIMAL(10,6),
    "ubicacion_at" TIMESTAMP(3),

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viajes" (
    "id" TEXT NOT NULL,
    "vehiculo_id" TEXT NOT NULL,
    "conductor_id" TEXT NOT NULL,
    "estado" VARCHAR(20) NOT NULL,
    "fecha_salida" TIMESTAMP(3),
    "fecha_llegada" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "viajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenes" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "viaje_id" TEXT,
    "origen" VARCHAR(255) NOT NULL,
    "destino" VARCHAR(255) NOT NULL,
    "peso_kg" DECIMAL(10,2) NOT NULL,
    "volumen_m3" DECIMAL(10,2),
    "descripcion" VARCHAR(500) NOT NULL,
    "instrucciones" VARCHAR(500),
    "estado" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "fecha_estimada" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_ordenes" (
    "id" TEXT NOT NULL,
    "orden_id" TEXT NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "peso_kg" DECIMAL(10,2) NOT NULL,
    "volumen_m3" DECIMAL(10,2),

    CONSTRAINT "detalle_ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estado_ordenes" (
    "id" TEXT NOT NULL,
    "orden_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "estado_anterior" VARCHAR(20),
    "estado_nuevo" VARCHAR(20) NOT NULL,
    "nota" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estado_ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidentes" (
    "id" TEXT NOT NULL,
    "orden_id" TEXT NOT NULL,
    "conductor_id" TEXT NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "severidad" VARCHAR(20) NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "resuelto" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incidentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicaciones_vehiculo" (
    "id" TEXT NOT NULL,
    "vehiculo_id" TEXT NOT NULL,
    "lat" DECIMAL(10,6) NOT NULL,
    "lng" DECIMAL(10,6) NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ubicaciones_vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "estado" VARCHAR(20) NOT NULL,
    "monto_total" DECIMAL(12,2) NOT NULL,
    "fecha_emision" DATE NOT NULL,
    "fecha_vencimiento" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_facturas" (
    "id" TEXT NOT NULL,
    "factura_id" TEXT NOT NULL,
    "orden_id" TEXT NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "cantidad" DECIMAL(10,2) NOT NULL,
    "precio_unit" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "detalle_facturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_rnc_key" ON "clientes"("rnc");

-- CreateIndex
CREATE UNIQUE INDEX "conductores_usuario_id_key" ON "conductores"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "conductores_cedula_key" ON "conductores"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "vehiculos_placa_key" ON "vehiculos"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "ordenes_codigo_key" ON "ordenes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_codigo_key" ON "facturas"("codigo");

-- AddForeignKey
ALTER TABLE "usuario_roles" ADD CONSTRAINT "usuario_roles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_roles" ADD CONSTRAINT "usuario_roles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permiso_roles" ADD CONSTRAINT "permiso_roles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conductores" ADD CONSTRAINT "conductores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajes" ADD CONSTRAINT "viajes_vehiculo_id_fkey" FOREIGN KEY ("vehiculo_id") REFERENCES "vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajes" ADD CONSTRAINT "viajes_conductor_id_fkey" FOREIGN KEY ("conductor_id") REFERENCES "conductores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_viaje_id_fkey" FOREIGN KEY ("viaje_id") REFERENCES "viajes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_ordenes" ADD CONSTRAINT "detalle_ordenes_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estado_ordenes" ADD CONSTRAINT "estado_ordenes_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estado_ordenes" ADD CONSTRAINT "estado_ordenes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidentes" ADD CONSTRAINT "incidentes_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidentes" ADD CONSTRAINT "incidentes_conductor_id_fkey" FOREIGN KEY ("conductor_id") REFERENCES "conductores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicaciones_vehiculo" ADD CONSTRAINT "ubicaciones_vehiculo_vehiculo_id_fkey" FOREIGN KEY ("vehiculo_id") REFERENCES "vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_facturas" ADD CONSTRAINT "detalle_facturas_factura_id_fkey" FOREIGN KEY ("factura_id") REFERENCES "facturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_facturas" ADD CONSTRAINT "detalle_facturas_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
