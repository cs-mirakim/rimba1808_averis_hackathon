---
name: mattpoc
description: Deep modules, TypeScript best practices, and test-driven engineering workflows by Matt Pocock.
---

# Matt Pocock Engineering Guidelines

## Core Principles
1. **Deep Modules**: Simple, expressive interfaces that hide complex domain logic. Small API surface, rich functionality.
2. **Predictable Data Types**: Explicit types, zero `any`, strict null checks, and immutable data flow where appropriate.
3. **Seams and Boundaries**: Clean isolation between API clients, caching layers, and presentation components.
4. **Graceful Degradation**: Always handle network hiccups, rate limits, and missing external dependencies with verified local fallbacks.
5. **No Speculative Abstractions**: Solve the immediate problem deeply before designing general abstractions.
