# vue3-nestjs-prisma

## NestJs

```
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

`./prisma/schema.prisma`に追加

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
```

---

`touch ./src/prisma.service.ts`
[./src/prisma.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/prisma.service.ts)

---

```bash
npx nest g module user
npx nest g service user
npx nest g controller user
```

`./src/user/user.controller.ts`
[./src/user/user.controller.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/user/user.controller.ts)

`./src/user/user.service.ts`
[./src/user/user.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/user/user.service.ts)

`./src/user/user.module.ts`
[./src/user/user.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/user/user.module.ts)

---

```bash
npx nest g module post
npx nest g service post
npx nest g controller post
```

`./src/post/post.controller.ts`
[./src/post/post.controller.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/post/post.controller.ts)

`touch ./src/post/post.service.ts`
`./src/post/post.service.ts`
[./src/post/post.service.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/post/post.service.ts)

`touch ./src/post/post.module.ts`
[./src/post/post.module.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/post/post.module.ts)

`touch ./src/app.module.ts`
[./src/app.module.ts](https://github.com/rogai460/vue3-nestjs-prisma/blob/main/backend/src/app.module.ts)

---

```bash
npm run start

# 登録
curl -XPOST -H "Content-Type: application/json" -d '{"email":"aaa@bbb.com","name":"jonson"}' http://127.0.0.1:3000/user

# 取得
curl -XGET http://127.0.0.1:3000/user/1
```
```bash
npm install --save @nestjs/serve-static

```


```bash
npm create vite@latest
cd frontend
npm install
```