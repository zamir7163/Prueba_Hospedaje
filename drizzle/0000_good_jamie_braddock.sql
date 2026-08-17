CREATE TABLE "habitaciones" (
	"id" serial PRIMARY KEY NOT NULL,
	"numero" varchar(10) NOT NULL,
	"piso" integer NOT NULL,
	"tipo_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "habitaciones_numero_unique" UNIQUE("numero")
);
--> statement-breakpoint
CREATE TABLE "huespedes" (
	"id" serial PRIMARY KEY NOT NULL,
	"doc_identidad" varchar(20) NOT NULL,
	"nombre_completo" varchar(100) NOT NULL,
	"telefono" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "huespedes_doc_identidad_unique" UNIQUE("doc_identidad")
);
--> statement-breakpoint
CREATE TABLE "reservas" (
	"id" serial PRIMARY KEY NOT NULL,
	"huesped_id" integer NOT NULL,
	"habitacion_id" integer NOT NULL,
	"fecha_entrada" date NOT NULL,
	"fecha_salida" date NOT NULL,
	"estado" varchar(20) DEFAULT 'CONFIRMADA' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tipos_habitacion" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(50) NOT NULL,
	"precio_noche" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tipos_habitacion_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
ALTER TABLE "habitaciones" ADD CONSTRAINT "habitaciones_tipo_id_tipos_habitacion_id_fk" FOREIGN KEY ("tipo_id") REFERENCES "public"."tipos_habitacion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_huesped_id_huespedes_id_fk" FOREIGN KEY ("huesped_id") REFERENCES "public"."huespedes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_habitacion_id_habitaciones_id_fk" FOREIGN KEY ("habitacion_id") REFERENCES "public"."habitaciones"("id") ON DELETE no action ON UPDATE no action;