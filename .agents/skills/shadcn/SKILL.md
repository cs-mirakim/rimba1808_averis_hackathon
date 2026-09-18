---
name: shadcn
description: Guidelines for shadcn/ui patterns, Radix primitives, accessible components, and clean Tailwind styling.
---

# shadcn/ui Component Standards

## Core Patterns
1. **Component Primitives**: Build on accessible, unstyled primitives (Radix UI or native accessible HTML5) with ARIA compliance.
2. **Tailwind Utility Structure**: Keep class names structured using `clsx` and `tailwind-merge` via `cn()` utility.
3. **Controlled & Uncontrolled States**: Support both controlled inputs and intuitive uncontrolled defaults.
4. **Theme Tokens**: Use semantic tokens (`bg-background`, `text-foreground`, `border-border`, `ring-ring`) rather than arbitrary hardcoded hex codes across components.
5. **Composability**: Break down complex UI into small composable pieces (`CardHeader`, `CardTitle`, `CardContent`, `CardFooter`).
