---
title: Test
---

Some **mdx** text.

```php{3}{2,4-5}{9}
return [
    'extensions' => [
        // Add attributes straight from markdown.
        AttributesExtension::class,
        // Add Torchlight syntax highlighting.
        TorchlightExtension::class,
    ]
]
```

```php{3}{2,4-5}{9}
return [
    'extensions' => [
        // Add attributes straight from markdown.
        AttributesExtension::class,

        // Add Torchlight syntax highlighting. [tl! focus]
        TorchlightExtension::class, // [tl! focus]
    ]
]
```
