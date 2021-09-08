# Next.js

>  Universal 리액트 어플리케이션의 서버렌더링을 쉽게 구현 할 수 있게 도와주는 간단한 프레임워크.

## 특징

- 직관적인 [페이지 기반](https://nextjs.org/docs/basic-features/pages) 라우팅 시스템( [동적 경로](https://nextjs.org/docs/routing/dynamic-routes) 지원 포함 )

- [사전 렌더링](https://nextjs.org/docs/basic-features/pages#pre-rendering) , [정적 생성](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) (SSG) 및 [서버 측 렌더링](https://nextjs.org/docs/basic-features/pages#server-side-rendering) (SSR) 모두 페이지 단위로 지원
- 빠른 페이지 로드를 위한 자동 코드 분할
- 최적화된 프리페칭을 통한 [클라이언트 측 라우팅](https://nextjs.org/docs/routing/introduction#linking-between-pages)
- [내장 CSS](https://nextjs.org/docs/basic-features/built-in-css-support) 및 [Sass 지원](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) 및 모든 [CSS-in-JS](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js) 라이브러리 지원
- [Fast Refresh를](https://nextjs.org/docs/basic-features/fast-refresh) 지원하는 개발 환경
- Serverless Functions로 API 엔드포인트를 빌드하기 위한 [API 경로](https://nextjs.org/docs/api-routes/introduction)
- extendable



## 환경설정

Next.js 는 Mac, Windows, Linux 에서 동일하게 작동한다. 즉, Node.js 만 있으면 된다.

```
mkdir hello-next
cd hello-next
yarn init -y
yarn add react react-dom next
mkdir pages
```

 

package.json 파일에 다음과 같은 스크립트를 추가

```json
{
  "name": "hello-next",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "dev": "next"
  },
  "dependencies": {
    "next": "^2.1.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2"
  }
}
```

---

모든 것을 자동으로 설정해주는 `create-next-app` 을 사용하여 새 Next.js 앱을 만드는 것이 좋다.

프로젝트 실행 방법

```bash
npx create-next-app
# or
yarn create next-app
```

TypeScript 프로젝트로 시작하려면 다음 `--typescript`플래그를 사용.

```bash
npx create-next-app --typescript
# or
yarn create next-app --typescript
```

설치가 완료되면 지침에 따라 개발 서버를 시작하고 , 편집 후  `pages/index.js` 에서 결과 확인.