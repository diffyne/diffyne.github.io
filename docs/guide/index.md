---
title: Introduction
description: Get started with Diffyne - A blazing-fast, server-driven UI framework for PHP
---

# Introduction to Diffyne

Welcome to the Diffyne documentation! Diffyne is a blazing-fast, server-driven UI framework for PHP powered by a lightweight Virtual DOM + Diff Engine.

## What is Diffyne?

Diffyne brings the power of reactive, component-based UIs to PHP applications without requiring you to write JavaScript. Build interactive, dynamic interfaces using familiar PHP and Blade templates.

### Key Features

- ⚡ **Blazing Fast** - Virtual DOM diff engine sends minimal patches (70-95% smaller payloads)
- 🔒 **Secure by Default** - State signing, locked properties, and method whitelisting
- 🎯 **Simple & Familiar** - Write PHP components with Blade templates
- 🔄 **Reactive** - Public properties automatically sync between server and client
- 🛠️ **Laravel Native** - Seamless integration with Laravel features
- 📦 **Lightweight** - Minimal JavaScript runtime

## How It Works

Instead of sending full HTML on every interaction, Diffyne:

1. **Renders to Virtual DOM** on the server
2. **Computes minimal diff** between old and new state
3. **Sends tiny patches** (often just 50-100 bytes)
4. **Updates only what changed** in the browser

**Result:** 70-95% smaller payloads than traditional approaches, faster updates, better UX.

## Quick Example

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

## What You Can Build

- **Forms** with real-time validation
- **Dashboards** with live data updates
- **Search** with instant results
- **Interactive UIs** without writing JavaScript
- **Real-time apps** with WebSocket support

## Next Steps

Ready to get started? Check out these guides:

- [Installation](/guide/installation) - Install and configure Diffyne
- [Quick Start](/guide/quickstart) - Build your first component in 5 minutes
- [Your First Component](/guide/first-component) - Detailed walkthrough

## Resources

- [GitHub Repository](https://github.com/diffyne/diffyne)
- [Issue Tracker](https://github.com/diffyne/diffyne/issues)
- [Examples](/examples/) - Real-world component examples

