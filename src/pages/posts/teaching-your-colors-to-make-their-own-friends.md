---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Teaching Your Colors to Make Their Own Friends"
headline: "Teaching Your Colors to Make Their Own Friends"
pubDate: 2026-08-18
description: 'A way to pair contrasting background/foreground colors automatically using contrast-color() and if()'
author: 'Mike Jeffery'
image:
    url: '/images/posts/teletubbies.webp'
    alt: 'Color palettes'
tags: ["css", "colors"]
---

![From left to right, Tinky-Winky, Dipsy, Po and Laa-Laa pose in a grassy landscape with some of their favorite accessories. Tinky-Winky holds a red handbag, Dipsy wears a cow-spotted top hat, and Po poses on a scooter wearing a helmet. Laa-Laa looks on at the three in wonder.](/images/posts/teletubbies.webp)

Like anyone, I nerd out on design systems and web components all the time. Totally normal, right?

I've been working on a web components-based design system, based on Scott Riley's fantastic [framework-agnostic design systems tutorial](https://piccalil.li/blog/framework-agnostic-design-systems-part-1/), and got to the part where I need to find some button colors. Simple, right?

Except I went on a journey that started with "Web Awesome's color palettes are nice" to "what if every color automatically knew what color should go on top of it?"

## A Matchmaking Strategy
Web Awesome's base color system is wonderfully simple. They basically give you [Roy G. Biv](https://en.wikipedia.org/wiki/ROYGBIV) (plus pink and gray) and there's eleven tints in each family. This covers all your semantic color needs for success, warning, danger, etc. Nothing groundbreaking here, but the colors are *nice.* While ogling the [colors in their docs](https://webawesome.com/docs/tokens/color), I stumbled across their intriguing method of choosing background/text color combinations.

Their doc site tells you how to use their [core colors](https://webawesome.com/docs/tokens/color#core-colors-2), the best of its family, with its corresponding "on" color to get a combination that's guaranteed to meet WCAG 2.1 AA contrast. To me, the cool part is *how* they get those combinations. I'll do my best to describe it accurately and concisely. Three CSS functions within two custom properties create the color pair; it's simple yet elegant.

They hand pick a core color for each family. If that color is 60 or above on their scale, it gets a white foreground color, otherwise it gets a much darker color on the scale. Three CSS functions and two custom properties do all the work:

```css
:root {
    /**
    * Conditional token to check if the key color is >= 60
    * Key colors are the most colorful tint in a scale, recorded as --wa-color-{hue} in each palette
    * The numeric value of the key is isolated as --wa-color-{hue}-key
    * If key < 60, the result is 0%
    * If key >= 60, the result is 100%
    * Intended to be used in the color-mix() function below
    */
  --wa-color-indigo-gte-60: calc(100% - (clamp(0, 60 - var(--wa-color-indigo-key), 1) * 100%));

    /**
    * Token to set text color with appropriate WCAG 2.1 contrast
    * If key < 60, the text color is white
    * If key >= 60, the text color is {hue}-10
    */
  --wa-color-indigo-on: color-mix(in oklab, var(--wa-color-indigo-10) var(--wa-color-indigo-gte-60), white);
}
```

The first custom property turns the comparison into a value of either 0% or 100%. The second uses that value to choose between white and the darker color. When the core color is 60 or above, the mix gets 0% of the dark color and 100% white. Below 60, it gets the dark color instead.

It's genius in its simplicity. Like a slinky. And it reminded me of Una Kravets' CSS Day talk about [Modern UI Patterns](https://www.youtube.com/watch?v=8FSLsVAJj2w&t=558s).

## Let the Palette Pick
In her [CSS Day 2026 talk](https://www.youtube.com/watch?v=8FSLsVAJj2w&t=558s), Una Kravets presents a way to use modern CSS features to make creating contrasting color combinations simpler. She enhances [`contrast-color()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color) using the [CSS `if()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if) to apply any two colors instead of black and white. Her concept blew my mind because it creates a foundation for color combos that are WCAG compliant *and* themeable.

Una's talk inspired me to take a different slant on WA's color system. Using her `contrast-color()` concept, all the colors in my system have a paired "on" color that **meets my WCAG 2.1 AA contrast target[^1] automatically.**

I designed each scale so that 500 is the contrast pivot. It's the lightest point in the scale where I can use white as the foreground while still meeting my contrast target. The "on" color for everything below the pivot uses that family's darkest color; everything above it uses white. The result is that each color in the scale knows what its contrasting foreground color needs to be. In other words, **the farther you move from the contrast pivot, the safer the pairing gets.**

An added benefit of using `contrast-color()` for a foreground color is that it will automatically choose an appropriate color if the background color changes. For the hover state of a button, for example.

```css
@property --contrast-color {
  syntax: "<color>";
  initial-value: white;
  inherits: true;
}

.my-button {
  --button-bg: var(--color-indigo-400);
  --contrast-color: contrast-color(var(--button-bg));

/* The lighter color under 500 on the scale gets a dark foreground */
  background: var(--button-bg);
  color: if(
    style(--contrast-color: white): #fff;
    else: var(--color-indigo-950)
  );

  &:hover {
    /* No need to update the color property on hover. It's automatically white to contrast against the darker background */
    --button-bg: var(--color-indigo-600);
  }
}
```

## Make Accessibility the Default
What started as a struggle to find color pairings for a button component ended up as an experiment in creating a system that chooses properly contrasting color pairs for you.

I think it makes perfect sense to bake accessibility decisions into systems and take the burden away from individuals. This system looks at your background color and hands you a sensible foreground color for free.

I'm still figuring out where this idea belongs in my design system, but I'm pretty sure I'm not going back to manually pairing button backgrounds and foregrounds.

## A note on browser support
At the time of this writing, [`contrast-color()` is available across all browsers](https://caniuse.com/?search=contrast-color), but [`if()` is only available in Chrome and Edge](https://caniuse.com/?search=if%28%29), so if you plan to use it in production, you need a backup plan.

## Links
- [Palette Autopilot](https://codepen.io/editor/mikejeff/pen/019fd1cd-6821-7cae-8cd9-fa0776947434) The concept in this article fleshed out
- [Web Awesome's "key color" concept](https://github.com/shoelace-style/webawesome/blob/next/packages/webawesome/src/styles/color/palettes/base.css)  on GitHub

[^1]: I designed 500 around a 4.5:1 contrast target, with 400 and 600 targeting 7.5:1. The 4.5:1 ratio corresponds to the WCAG AA threshold for normal text; 7.5:1 exceeds the WCAG AAA threshold.
