# vue3-nestjs-prisma

touch .env

```
DATABASE_URL="file:./dev.db"
```

## NestJs

```bash
git clone git@github.com:rogai460/vue3-nestjs-prisma.git
cd vue3-nestjs-prisma
```

```bash
npx @nestjs/cli new backend
cd backend
rm -fr .git
npm install
```

prisma 初期化

```bash
npm install @prisma/client
npx prisma init --datasource-provider sqlite
```

`.backend/src/prisma/schema.prisma`に追加

```prisma
model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

マイグレーション

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

```
npx prisma studio
```

---

- [./backend/src/prisma.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/prisma.service.ts)

---

```bash
npx nest g module user
npx nest g service user
npx nest g controller user
```

- [./src/user/user.controller.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/user/user.controller.ts)

[./backend/src/user/user.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/user/user.service.ts)

[./backend/src/user/user.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/user/user.module.ts)

---

```bash
npx nest g module post
npx nest g service post
npx nest g controller post
```

- [./backend/src/post/post.controller.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/post/post.controller.ts)

- [./backend/src/post/post.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/post/post.service.ts)

[./backend/src/post/post.module.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/post/post.module.ts)

- [./backend/src/app.module.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/app.module.ts)

---

```bash
npm run start

# 登録
curl -XPOST -H "Content-Type: application/json" -d '{"email":"aaa@bbb.com","name":"jonson"}' http://127.0.0.1:3000/user

# 取得
curl -XGET http://127.0.0.1:3000/user/1
```

## Vue3

```bash
cd vue3-nestjs-prisma
npm create vite@latest
cd frontend
npm install
```

###

https://tailwindcss.com/docs/guides/vite#vue

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

https://github.com/rogai460/vue3-nestjs-prisma/blob/main/frontend/tailwind.config.cjs
https://github.com/rogai460/vue3-nestjs-prisma/blob/main/frontend/src/style.css

`./frontend/src/App.vue`

```vue
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped></style>
```

## Vue3 と NestJs の連携

### Vue3 のビルド結果を backend の`public`に出力するようにする

```bash
cd  vue3-nestjs-prisma/frontend
```

[./frontend/vite.config.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/frontend/vite.config.ts)

### NestJs で HTML を表示できるようにする

```bash
cd  vue3-nestjs-prisma/backend
```

```bash
npm install --save @nestjs/serve-static
```

[./backend/src/app.module.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/app.module.ts)

```
npx nest g module projectInf
npx nest g service projectInf
npx nest g controller projectInf
```

- https://github.com/tailwindtoolbox/Admin-Template
- https://flowbite.com/