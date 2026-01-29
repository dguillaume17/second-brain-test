---
title: "TypeScript - Use enum"
---

```typescript title="enum.ts"
export enum MyEnum {
    Case1,
    Case2,
    Case3
}
```

```typescript title="index.ts"
import { MyEnum } from './enum';

const a = MyEnum.Case1;

console.log(a);
```

* test
    * test
        * test