# SCSS Variables Guide

This file documents the design system variables available in `/src/styles/variables.scss` and how to use them in your components.

## How to Use Variables

### 1. Import variables in your SCSS files:
```scss
@import '../../styles/variables';
// Adjust path based on your component's location
```

### 2. Use variables instead of hardcoded values:
```scss
// ❌ Before - hardcoded values
.my-component {
  background-color: #4f46e5;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  color: #1f2937;
}

// ✅ After - using variables
.my-component {
  background-color: $color-primary;
  padding: $spacing-4 $spacing-6;
  border-radius: $border-radius-lg;
  color: $color-gray-800;
}
```

## Available Variable Categories

### Colors
- **Primary**: `$color-primary`, `$color-primary-hover`, `$color-primary-light`
- **Gray Scale**: `$color-gray-50` through `$color-gray-900`
- **Status Colors**: `$color-success`, `$color-danger`, `$color-warning`, `$color-info`
- **Neutral**: `$color-white`, `$color-black`

### Typography
- **Font Sizes**: `$font-size-xs` through `$font-size-6xl`
- **Font Weights**: `$font-weight-normal`, `$font-weight-medium`, `$font-weight-semibold`, `$font-weight-bold`
- **Line Heights**: `$line-height-tight`, `$line-height-normal`, `$line-height-relaxed`, `$line-height-loose`

### Spacing
- **Scale**: `$spacing-1` (0.25rem) through `$spacing-20` (5rem)
- **Common sizes**: `$spacing-2` (0.5rem), `$spacing-4` (1rem), `$spacing-6` (1.5rem), `$spacing-8` (2rem)

### Border Radius
- **Sizes**: `$border-radius-sm` through `$border-radius-xl`, `$border-radius-full`

### Shadows
- **Types**: `$shadow-sm`, `$shadow-md`, `$shadow-lg`, `$shadow-focus`

### Layout
- **Containers**: `$container-sm` through `$container-2xl`
- **Breakpoints**: `$breakpoint-sm` through `$breakpoint-xl`

## Common Usage Patterns

### Buttons
```scss
.btn {
  padding: $button-padding-y $button-padding-x;
  border-radius: $border-radius-lg;
  font-weight: $font-weight-semibold;
  transition: $transition-all;
  
  &--primary {
    background-color: $color-primary;
    color: $color-white;
    
    &:hover {
      background-color: $color-primary-hover;
    }
  }
}
```

### Cards
```scss
.card {
  background-color: $color-white;
  border-radius: $border-radius-xl;
  padding: $spacing-6;
  box-shadow: $shadow-sm;
  
  &:hover {
    box-shadow: $shadow-md;
  }
}
```

### Forms
```scss
.input {
  padding: $input-padding;
  border: $input-border-width solid $color-gray-300;
  border-radius: $border-radius-lg;
  font-size: $font-size-base;
  
  &:focus {
    border-color: $color-primary;
    box-shadow: $shadow-focus;
  }
}
```

### Responsive Design
```scss
.component {
  padding: $spacing-4;
  
  @media (min-width: $breakpoint-md) {
    padding: $spacing-8;
  }
}
```
