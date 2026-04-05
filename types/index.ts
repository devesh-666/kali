export interface User {
  _id?: string
  username: string
  password: string
  role: 'admin' | 'user'
  createdAt?: Date
}

export interface Command {
  title: string
  syntax: string
  description: string
  example?: string
  flags?: Flag[]
}

export interface Flag {
  flag: string
  description: string
}

export interface Tool {
  _id?: string
  name: string
  slug: string
  category: string
  subcategory?: string
  description: string
  longDescription?: string
  version?: string
  author?: string
  website?: string
  commands: Command[]
  useCases: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  relatedTools?: string[]
  installCommand?: string
  featured?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Category {
  _id?: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  toolCount?: number
}

export interface SearchResult {
  tools: Tool[]
  total: number
  query: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      role: 'admin' | 'user'
    }
  }
  interface User {
    id: string
    username: string
    role: 'admin' | 'user'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username: string
    role: 'admin' | 'user'
  }
}
