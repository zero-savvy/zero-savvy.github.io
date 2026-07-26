---
title: "How to Add a New Post"
description: "Writing for this blog is as simple as committing a Markdown file to the repository."
date: "2026-07-25"
author: "Zero Savvy Team"
tags: ["guide"]
---

Publishing a new article does not require touching any application code.
Just add a Markdown file and it appears automatically.

## Steps

1. Create a new file in `content/blog`, for example `my-new-post.md`.
2. Add frontmatter at the top of the file.
3. Write your content in Markdown below the frontmatter.
4. Commit and push — the post appears at `/blog/my-new-post`.

## Frontmatter fields

The following fields are supported:

```yaml
---
title: "Your Post Title"
description: "A short summary shown on the index page."
date: "2026-07-25"
author: "Your Name"
tags: ["tag-one", "tag-two"]
---
```

Only `title` is strictly required — everything else has sensible defaults.
The filename (without `.md`) becomes the URL slug.

## Supported Markdown

You can use headings, **bold**, _italics_, lists, `inline code`, code blocks,
[links](https://github.com/zero-savvy), blockquotes, and images. Standard Markdown
just works.
