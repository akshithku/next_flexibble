import { graph, config,auth } from '@grafbase/sdk'

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone()

// @ts-ignore
const User = g.type('User', {
  name: g.string().length({min : 2, max: 20}) as any,
  email: g.string(),
  avatarUrl: g.url(),
  description: g.string().length({min : 2, max: 20}).optional() as any,
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g.string(),

})

// @ts-ignore
const Project = g.type('Project', {
  title: g.string().length({ min: 3 }) as any,
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string(),
  createdBy: g.string(),  
});

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
