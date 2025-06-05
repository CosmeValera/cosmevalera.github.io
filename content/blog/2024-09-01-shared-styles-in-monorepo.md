+++
title = "Shared Styles in Monorepos"
template = "blog-post.html"
description = "Approaches to maintain consistent styles across multiple projects in a monorepo environment"
[taxonomies]
tags = ["frontend"]
+++

![blog-cover](/images/blog/2024-09-01-shared-styles-in-monorepo/shared-styles-monorep.png)

<h4><b>🤔 Overview</b></h4>

In large-scale projects maintaining consistent styles across multiple applications is crucial. Here are two key approaches for managing shared styles:

1. 📦 Creating a shared styles library as a <b>npm package</b>.
2. 🔗 Directly importing styles from <b>a centralized directory</b> within the monorepo.

---

<h4><b>📦 1. Creating a Styles Library with npm</b></h4>

<b>Overview:</b> This approach involves creating a dedicated styles library that is published as a npm package. The styles can then be imported into any project that needs them.

<b>Implementation:</b> For example, if you're working with custom theme styles for PrimeReact, you can create your styles in a library and export them using an `index.js` file like this:


```sh
module.exports = {
  theme: require('./style/themes/my-theme/theme.scss'),
};
```

After publishing the package, you can install it in your projects using:

```sh
npm i my-theme
```

Then, simply import the styles in your main JavaScript entry point:

```sh
import 'my-theme';
```

<b>Pros:</b>
Centralized version control of styles.
Easy to update and distribute across multiple projects.

<b>Cons:</b>
Requires publishing and versioning with each change.

<h4><b>🔗 2. Direct Import from a Centralized Directory</b></h4>

<b>Overview:</b> If you’re using a monorepo setup, you can store your styles in a central directory and import them directly into each project.

<b>Implementation:</b> Place your styles in a folder at the root level, parallel to your apps, and import them in your projects:

```sh
import '../style/themes/my-theme/theme.scss';
```

<b>Pros:</b>
No need to publish or manage versions.
Immediate access to the latest styles without additional steps.

<b>Cons:</b>
Potential for accidental breaking changes if styles are updated.
Need to have a monorepo structure; doesn't work if the projects are split into different repositories.

---
<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4><b>❓ What to choose</b></h4>

- Use a <b>npm package</b> if you want to have strict version control or you don't have all your projects in the same folder.
- Use direct importing from <b>a centralized directory</b> if you prefer a simpler solution and your code structure allows it.