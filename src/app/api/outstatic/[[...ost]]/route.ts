import { OutstaticApi } from 'outstatic'

// outstatic@1.4.14's route handler types predate Next.js 15.5's stricter
// route-handler type checking; cast to unblock the build without changing
// runtime behavior. Revisit if/when outstatic is upgraded to 2.x.
export const GET = OutstaticApi.GET as any

export const POST = OutstaticApi.POST as any