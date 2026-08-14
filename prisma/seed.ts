import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main(){
    console.log('Creando roles')
    const roles = await Promise.all([
    prisma.rol.upsert({
      where:  { nombre: 'SUPER_ADMIN' },
      update: {},
      create: { nombre: 'SUPER_ADMIN', descripcion: 'Acceso total al sistema' },
    }),
    prisma.rol.upsert({
      where:  { nombre: 'OPERATOR' },
      update: {},
      create: { nombre: 'OPERATOR', descripcion: 'Gestión de operaciones' },
    }),
    prisma.rol.upsert({
      where:  { nombre: 'DRIVER' },
      update: {},
      create: { nombre: 'DRIVER', descripcion: 'Conductor de vehículo' },
    }),
    prisma.rol.upsert({
      where:  { nombre: 'CLIENT' },
      update: {},
      create: { nombre: 'CLIENT', descripcion: 'Cliente externo' },
    }),
  ])

  console.log('🔐 Hasheando passwords...')

  const passwordHash = await bcrypt.hash('password123', 10)
  console.log('Password hasheado:', passwordHash)

 console.log('👥 Creando usuarios...')

  const [rolAdmin, rolOperator, rolDriver, rolClient] = roles

  await Promise.all([
    // SUPER_ADMIN
    prisma.usuario.upsert({
      where:  { email: 'admin@aurafreight.com' },
      update: {},
      create: {
        nombre:   'Admin Principal',
        email:    'admin@aurafreight.com',
        password: passwordHash,
        activo:   true,
        roles: {
          create: { rolId: rolAdmin.id }
        }
      },
    }),

    // OPERATOR
    prisma.usuario.upsert({
      where:  { email: 'operator@aurafreight.com' },
      update: {},
      create: {
        nombre:   'Operador Uno',
        email:    'operator@aurafreight.com',
        password: passwordHash,
        activo:   true,
        roles: {
          create: { rolId: rolOperator.id }
        }
      },
    }),

    // DRIVER
    prisma.usuario.upsert({
      where:  { email: 'driver@aurafreight.com' },
      update: {},
      create: {
        nombre:   'Conductor Uno',
        email:    'driver@aurafreight.com',
        password: passwordHash,
        activo:   true,
        roles: {
          create: { rolId: rolDriver.id }
        }
      },
    }),

    // CLIENT
    prisma.usuario.upsert({
      where:  { email: 'client@aurafreight.com' },
      update: {},
      create: {
        nombre:   'Cliente Uno',
        email:    'client@aurafreight.com',
        password: passwordHash,
        activo:   true,
        roles: {
          create: { rolId: rolClient.id }
        }
      },
    }),
  ])
  
  console.log('✅ Seed completado')
  console.log('─────────────────────────────────')
  console.log('admin@aurafreight.com    → SUPER_ADMIN')
  console.log('operator@aurafreight.com → OPERATOR')
  console.log('driver@aurafreight.com   → DRIVER')
  console.log('client@aurafreight.com   → CLIENT')
  console.log('Password de todos:       → password123')
  console.log('─────────────────────────────────')
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })