# vue2-teleport-next

vue2-teleport-next is a lightweight npm package designed to seamlessly integrate Vue 3's [teleport component](https://vuejs.org/guide/built-ins/teleport.html) functionality into Vue 2 projects. The teleport component, introduced in Vue 3, allows developers to dynamically render a child component to a target element anywhere in the DOM tree. This package serves as a bridge, enabling Vue 2 developers to leverage the powerful capabilities of Vue 3's teleport feature without the need for a full migration to Vue 3.

**Key Features:**

- Enables Vue 2 projects to utilize Vue 3's teleport component functionality.
- Provides a seamless transition for Vue 2 developers to adopt Vue 3 features incrementally.
- Compatible with existing Vue 2 codebases, requiring minimal changes for implementation.
- Lightweight and easy to integrate into Vue 2 projects, enhancing codebase flexibility and maintainability.

**Installation:**

```
npm install vue2-teleport-next
```

**Usage:**

```html
// In your Vue 2 component
<template>
  <div>
    <vue-teleport :to="elementSelector">
      <!-- Your Vue2 component here -->
    </vue-teleport>
  </div>
</template>

<script>
import VueTeleport from 'vue2-teleport-next';

export default {
  components: {
    VueTeleport,
  },
  data() {
    return {
      elementSelector: 'body', // selector of the target element or html element
    };
  },
};
</script>
```

Start leveraging the power of Vue 3's teleport component within your Vue 2 projects today with vue2-teleport-next!