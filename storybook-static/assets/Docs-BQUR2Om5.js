import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-isGQDf6Z.js";import"./iframe-BsFNpFx9.js";import"./preload-helper-Dp1pzeXC.js";function t(o){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"localized-react-router",children:"Localized React Router"}),`
`,n.jsxs(e.p,{children:["A powerful, localized routing solution for React applications, built on top of ",n.jsx(e.a,{href:"https://tanstack.com/router",rel:"nofollow",children:"@tanstack/react-router"})," and ",n.jsx(e.a,{href:"https://lingui.dev/",rel:"nofollow",children:"Lingui"}),"."]}),`
`,n.jsx(e.h2,{id:"features",children:"Features"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Multi-region & Multi-language"}),": Handle routes like ",n.jsx(e.code,{children:"/en-us/about"}),", ",n.jsx(e.code,{children:"/fr-be/about"}),", etc., with ease."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Type-safe Routing"}),": Leverages TanStack Router for full type safety."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Integrated i18n"}),": Automatic translation loading and language switching using Lingui."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Context-based Routes"}),": Group routes under shared contexts (e.g., authentication, roles) with ",n.jsx(e.code,{children:"beforeLoad"})," hooks."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Dynamic Path Generation"}),": Utilities to generate localized paths and URLs."]}),`
`]}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# Using pnpm
pnpm add @gertvdb/react-router
`})}),`
`,n.jsx(e.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.h3,{id:"1-define-your-components",children:"1. Define your components"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Home.tsx
export const Home = () => <h1>Home</h1>;

// About.tsx
export const About = () => <h1>About</h1>;
`})}),`
`,n.jsx(e.h3,{id:"2-configure-the-router",children:"2. Configure the Router"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Router, IRouterConfig } from '@gertvdb/react-router';

const config: IRouterConfig = {
  components: {
    home: { component: Home },
    about: { component: About },
  },
  routes: [
    { id: 'home', language: 'en', regions: ['us', 'gb'], path: '/' },
    { id: 'home', language: 'nl', regions: ['be', 'nl'], path: '/' },
    { id: 'about', language: 'en', regions: ['us', 'gb'], path: '/about' },
    { id: 'about', language: 'nl', regions: ['be', 'nl'], path: '/over' },
  ],
  routeEntry: { id: 'home', language: 'en', region: 'us' },
  notFoundComponent: () => <div>Not Found</div>,
  errorComponent: () => <div>Error</div>,
};

const translations = async (lang: string) => {
  // Load your translations here
  return import(\`./locales/\${lang}.json\`);
};

export const App = () => (
  <Router
    config={config}
    translations={translations}
    context={{}}
  />
);
`})}),`
`,n.jsx(e.h2,{id:"key-concepts",children:"Key Concepts"}),`
`,n.jsx(e.h3,{id:"routes-vs-components",children:"Routes vs Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Routes"}),": Define the structure, paths, and supported locales."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Components"}),": Define the actual React components and data loaders for each route ID."]}),`
`]}),`
`,n.jsx(e.h3,{id:"context-routes",children:"Context Routes"}),`
`,n.jsxs(e.p,{children:["Use ",n.jsx(e.code,{children:"routeContexts"})," to define shared logic (like authentication) for a group of routes."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`const config: IRouterConfig = {
  // ...
  routeContexts: [
    {
      id: 'auth',
      beforeLoad: async ({ context }) => {
        if (!context.isAuthenticated) {
          throw redirect({ to: '/login' });
        }
      },
    },
  ],
  components: {
    dashboard: {
      component: Dashboard,
      contextId: 'auth' // This route now requires 'auth' context
    },
  },
};
`})}),`
`,n.jsx(e.h3,{id:"navigation",children:"Navigation"}),`
`,n.jsxs(e.p,{children:["Access the router instance via ",n.jsx(e.code,{children:"useRouter"})," to navigate programmatically."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`const router = useRouter();

router.navigate({
  to: { id: 'about', language: 'en', region: 'us' }
});
`})}),`
`,n.jsx(e.h2,{id:"license",children:"License"}),`
`,n.jsx(e.p,{children:"MIT"})]})}function l(o={}){const{wrapper:e}={...s(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{l as default};
