---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Yesterday, I shipped a web component"
headline: "Yesterday, I shipped a web component"
pubDate: 2026-03-11
description: 'My first web component was a dark theme toggle for this site.'
author: 'Mike Jeffery'
image:
    url: ' '
    alt: ' '
tags: ["web components", "changelog"]
---

I've been curious about Web Components for a while now.

Not in a *“this will change everything”* kind of way, more in a *“I should  understand this better”* way. They’ve been part of the platform for years, and as someone who spends most of their time working with HTML and CSS, it felt like a gap in my knowledge.

I decided to build something small.

## A dark theme toggle

The component I built is a simple dark theme toggle.

It does a four things:

- It reads the user’s OS-level color scheme preference.
- If the user interacts with the toggle on the site, it stores that preference in `localStorage`.
- It’s accessible.
- You can drop it anywhere on the page.

Nothing fancy, but it's a small, useful piece of UI.

## A boost from the web community

I didn’t start from scratch.

I used [Chris Ferdinandi’s Web Component boilerplate](https://gomakethings.com/snippets/boilerplates/web-component/) as a starting point. It’s minimal, easy to understand, and a great way to get something working without fighting the platform.

For the UI pattern, I leaned on [Heydon Pickering’s toggle button design](https://inclusive-components.design/toggle-button/) from *Inclusive Components*. If you’ve never read that site, it’s a goldmine of thoughtful, accessibility-first UI patterns.

That combination made it easy to focus on the behavior instead of reinventing structure or accessibility patterns.

## Shipping something small

The component itself is pretty simple, but I’m proud of it.

There’s something satisfying about building a small thing, finishing it, and shipping it. Especially when it’s built on top of the platform instead of a framework.

And now I understand Web Components better than I did a week ago.

## What’s next

It’s an MVP, but I’ll probably enhance it over time. 

But for now, it works. And it shipped.