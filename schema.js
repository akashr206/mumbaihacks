import {
    pgTable,
    serial,
    text,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    department: varchar("department", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    stage: varchar("stage", { length: 50 }).notNull(),
    doctor: varchar("doctor", { length: 255 }).notNull(),
    admissionTime: text("admission_time").notNull(),
});

export const doctors = pgTable("doctors", {
    id: serial("id").primaryKey(),
    role: varchar("role", { length: 100 }).notNull(),
    wardId: integer("ward_id").references(() => wards.id),
});

export const inventory = pgTable("inventory", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    lastRestocked: varchar("last_restocked", { length: 50 }).notNull(),
    current: integer("current").notNull(),
    total: integer("total").notNull(),
    unit: varchar("unit", { length: 50 }).notNull(),
    minimum: integer("minimum").notNull(),
});

export const hospital = pgTable("hospital", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    totalDoctors: integer("total_doctors").notNull(),
    totalNurses: integer("total_nurses").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wards = pgTable("wards", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    capacity: integer("capacity").notNull(),
    occupied: integer("occupied").notNull(),
    nurses: integer("nurses").notNull(),
    doctors: integer("doctors").notNull(),
    criticality: integer("criticality").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
