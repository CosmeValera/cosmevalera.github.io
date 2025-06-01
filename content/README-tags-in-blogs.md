---
---
# 🏷️ Blog Tags System

Tags are called `blog_post_tags` in [Config TOML file](./../config.toml)

## 📋 Tag Structure

All blog posts must have at least one tag.

### Topic Tags (Required)
- **Frontend** - React, Angular, CSS, responsive design
- **Backend** - Node.js, APIs, databases, server-side
- **Architecture** - Clean code, SOLID principles, design patterns
- **Finance** - Stock analysis, investing, financial topics
- **Bitcoin** - Cryptocurrency, blockchain-related content
- ...

### Helper Tags (Optional)
- **Recommended** - Showcase content (displays a star ⭐ top-left)
- **For Beginners** - Entry-level explanations (displays a book 📕 top-left)

## 🎯 Tag Order & Display

1. **First tag:** Always a topic tag (main category, full opacity)
2. **Secondary tags:** Additional topic tags (reduced opacity and saturation)
3. **Helper tag:** Optional, always set last (displays icon top-left)

## 📝 Practical Examples
```less
["finance", "for beginners"] | How to analyze a stock
["frontend", "recommended"] | Respond-To Mixin pattern
["architecture", "recommended"] | SOLID Principles
["architecture", "frontend"] | Optimizing Microfrontends with Turborepo
["frontend"] | Shared Styles in Monorepos
```