# vue2-teleport-next

vue2-teleport-next is a lightweight npm package designed to seamlessly integrate Vue 3's [teleport component](https://vuejs.org/guide/built-ins/teleport.html) functionality into Vue 2 projects. The teleport component, introduced in Vue 3, allows developers to dynamically render a child component to a target element anywhere in the DOM tree. This package serves as a bridge, enabling Vue 2 developers to leverage the powerful capabilities of Vue 3's teleport feature without the need for a full migration to Vue 3.

**Key Features:**

- Enables Vue 2 projects to utilize Vue 3's teleport component functionality.
- Provides a seamless transition for Vue 2 developers to adopt Vue 3 features incrementally.
- Compatible with existing Vue 2 codebases, requiring minimal changes for implementation.
- Lightweight and easy to integrate into Vue 2 projects, enhancing codebase flexibility and maintainability.

### Note
**The component has a `multiSlot` prop.**
- When set to `true`, it will receive all slot content, but an additional node will be added in the outer layer.
- When set to `false`, no additional outer layer node will be added, but only the content of the first slot will be rendered.
- The default is `false`.

**Installation:**

```
npm install vue2-teleport-next
```

**Usage:**

```html
<template>
  <div>
      <button @click="modalOpen = true">
          Open full screen modal! (With teleport!)
      </button>

      <Teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            I'm a teleported modal!
            (My parent is "body")
            <button @click="modalOpen = false">
              Close
            </button>
          </div>
        </div>
      </Teleport>
  </div>
</template>

<script>
import Teleport from 'vue2-teleport-next';

export default {
  components: {
    Teleport,
  },
  data() {
    return {
      modalOpen: false
    }
  }
}
</script>
```

| Prop Name  | Type                 | Description                  |
|------------|----------------------|------------------------------|
| to         | [String, HTMLElement]| Specifies the target route or element. |
| disabled   | Boolean              | Indicates whether the component is disabled or not. |
| multiSlot  | Boolean              | Indicates whether the component supports multiple slots or not. |

Start leveraging the power of Vue 3's teleport component within your Vue 2 projects today with vue2-teleport-next!