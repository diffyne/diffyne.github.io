---
layout: home

hero:
  name: Diffyne
  text: Server-Driven UI for PHP
  tagline: Blazing-fast, reactive components powered by Virtual DOM
  image:
    src: /logo.png
    alt: Diffyne
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/diffyne/diffyne

features:
  - icon: ⚡
    title: Blazing Fast
    details: Virtual DOM diff engine sends minimal patches (70-95% smaller payloads) instead of full HTML re-renders
  - icon: 🔒
    title: Secure by Default
    details: State signing, locked properties, and method whitelisting protect your application from common attacks
  - icon: 🎯
    title: Simple & Familiar
    details: Write PHP components with Blade templates. No JavaScript framework knowledge required
  - icon: 🔄
    title: Reactive
    details: Public properties automatically sync between server and client. Changes trigger instant UI updates
  - icon: 🛠️
    title: Laravel Native
    details: Built for Laravel with seamless integration for validation, authentication, and all Laravel features
  - icon: 📦
    title: Lightweight
    details: Minimal JavaScript runtime. Server does the heavy lifting, browser just applies patches
---

## Quick Start

Build your first component in 5 minutes:

```bash
composer require diffyne/diffyne
php artisan make:diffyne Counter
```

```php
<?php

namespace App\Diffyne;

use Diffyne\Attributes\Invokable;
use Diffyne\Component;

class Counter extends Component
{
    public int $count = 0;

    #[Invokable]
    public function increment()
    {
        $this->count++;
    }
}
```

```blade
<div>
    <h2>Count: {{ $count }}</h2>
    <button diff:click="increment">+</button>
</div>
```

That's it! Your component is reactive and ready to use.

## Why Diffyne?

Traditional server-side rendering sends full HTML on every interaction. Diffyne uses a Virtual DOM diff engine to send only the changes, making your applications faster and more responsive.

**Before (Traditional):**
- User clicks button
- Server sends 5KB HTML response
- Browser replaces entire component

**With Diffyne:**
- User clicks button  
- Server sends 50 bytes patch
- Browser updates only changed text node

**Result:** 70-95% smaller payloads, faster updates, better UX.

## What You Can Build

- **Forms** with real-time validation
- **Dashboards** with live data updates
- **Search** with instant results
- **Interactive UIs** without writing JavaScript
- **Real-time apps** with WebSocket support

Ready to get started? [Read the guide →](/getting-started/installation)

