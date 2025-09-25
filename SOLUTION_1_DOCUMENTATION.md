# Solution 1: Dynamic Imports with Nitro Virtual Files

This implementation provides a robust approach to rendering full Vue Single File Components as email templates by leveraging Nuxt's build system and virtual modules.

## How It Works

### 1. Build-Time Template Discovery

- During the Nuxt build process, the module scans the configured `emails` directory
- It discovers all `.vue` files and generates metadata for each template
- Creates a virtual Nitro module that imports all discovered templates

### 2. Virtual Module Generation

The virtual module (`#email-templates`) contains:

```typescript
import AwsVerifyEmail from "/path/to/emails/AwsVerifyEmail.vue";
import Newsletter from "/path/to/emails/Newsletter.vue";
// ... other templates

export const emailTemplates = {
  AwsVerifyEmail: AwsVerifyEmail,
  Newsletter: Newsletter,
  // ...
};

export const emailTemplateMapping = {
  AwsVerifyEmail: {
    name: "AwsVerifyEmail",
    filename: "AwsVerifyEmail.vue",
    displayName: "Aws Verify Email",
    importPath: "#email-templates/AwsVerifyEmail",
    filePath: "/path/to/emails/AwsVerifyEmail.vue",
  },
  // ...
};
```

### 3. Runtime Template Resolution

- Server endpoints use the template resolver utility
- Templates are accessed by name through the virtual module
- Full SFC compilation is handled by Nuxt/Nitro automatically

### 4. API Endpoints

- `GET /api/emails/list` - Returns template metadata from the virtual module
- `POST /api/emails/render` - Renders templates using the full compiled Vue components

## Benefits

### ✅ Complete SFC Support

- **Script Setup**: All reactive data, computed properties, and composition API features work
- **Styles**: Scoped styles and CSS modules are properly handled
- **TypeScript**: Full TypeScript support with proper type checking
- **Props**: Component props are properly typed and validated

### ✅ Performance

- Templates are compiled at build time, not runtime
- No need to parse Vue SFC syntax on every request
- Virtual modules are cached and optimized by Nitro

### ✅ Developer Experience

- Hot reloading works in development
- Full IDE support with proper imports and type checking
- No need to duplicate template logic

### ✅ Maintainability

- Clean separation between build-time discovery and runtime rendering
- Easy to extend with additional metadata or features
- Robust error handling for missing templates

## Example Usage

### Email Template (`emails/WelcomeEmail.vue`)

```vue
<script setup lang="ts">
interface Props {
  userName: string;
  companyName: string;
  dashboardUrl: string;
}

const props = defineProps<Props>();

const greeting = computed(
  () => `Welcome to ${props.companyName}, ${props.userName}!`
);

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
};
</script>

<template>
  <EHtml>
    <EHead />
    <EBody>
      <EContainer>
        <EHeading>{{ greeting }}</EHeading>
        <EText>
          Thank you for joining us! Click the button below to access your
          dashboard.
        </EText>
        <EButton :href="dashboardUrl" :style="buttonStyle">
          Go to Dashboard
        </EButton>
      </EContainer>
    </EBody>
  </EHtml>
</template>
```

### Rendering the Template

```typescript
// POST /api/emails/render
{
  "name": "WelcomeEmail",
  "props": {
    "userName": "John Doe",
    "companyName": "Acme Corp",
    "dashboardUrl": "https://app.acme.com/dashboard"
  },
  "pretty": true
}
```

## Architecture Flow

1. **Build Time**:

   ```
   emails/
   ├── WelcomeEmail.vue
   ├── PasswordReset.vue
   └── Newsletter.vue

   ↓ Module scans directory

   Virtual Module (#email-templates)
   ├── imports all .vue files
   ├── creates component mapping
   └── exports template utilities
   ```

2. **Runtime**:
   ```
   API Request → Template Resolver → Virtual Module → Full Vue Component → SSR Render → HTML Output
   ```

This approach provides the best balance of functionality, performance, and maintainability while leveraging Nuxt's existing infrastructure.
