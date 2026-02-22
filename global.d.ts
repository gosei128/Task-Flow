// Allow importing CSS files (including side-effect imports) in TypeScript
// Next.js uses global CSS in app/layout.tsx, so we need a module declaration

declare module "*.css";
