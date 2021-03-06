# [Next.js](https://nomadcoders.co/nextjs-fundamentals/lobby)

## ๐ป SET UP

```javascript
(terminal)

without TS > npx create-next-app@latest

with TS     > npx create-next-app@latest --typescript
```

## ๐ป RUN PROJECT

```javascript
(terminal)

(๊ฐ๋ฐ์ ๋ชจ๋๋ก ์คํ)npm run dev
(๋น๋ ํ ์คํ)npm run build => npm start
```

## ๐ OVERVIEW

### โง Framework vs Library

|                    | framework                                                                       | library                                   |
| ------------------ | ------------------------------------------------------------------------------- | ----------------------------------------- |
| ๊ฐ๋               | ์ํํธ์จ์ด์ ํน์  ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด ์ํธ ํ๋ ฅํ๋ ํด๋์ค์ ์ธํฐํ์ด์ค์ ์งํฉ | ํ์ํ ๊ธฐ๋ฅ๋ค์ด ๋ชจ์ฌ์๋ ์ฝ๋์ ๋ฌถ์      |
| ์ฝ๋ ํ๋ฆ์ ์ ์ด๊ถ | ์์ฒด์ ์ผ๋ก ๊ฐ์ง๊ณ  ์์                                                          | ์ฌ์ฉ์์๊ฒ ์์ผ๋ฉฐ ํ์ํ ์ํฉ์ ๊ฐ์ ธ๋ค ์ |

> ์ฆ, framework์๋ **์ ์ด์ ์ญ์  (IoC, Inversion of Control)** ์ด ์ ์ฉ๋์ด ์๋ค๋ ๊ฒ

### โง pages

- pages ํด๋ ๋ด ํ์ผ๋ช์ ๋ฐ๋ผ route ๊ฒฐ์ ๋จ
  > about.js => /about ํ์ด์ง์ ๋ ๋๋ง
- **/(๊ธฐ๋ณธ home ํ์ด์ง)** ๋ index.js ๋ ๋๋ง
- next.js์์๋ 404 ์๋ฌ ํ์ด์ง ๊ธฐ๋ณธ ์ ๊ณตํจ
- component๋ฅผ export default ํด์ผํจ

### โง Pre-rendering(Next ์ฅ์ !!)

> CSR(Client Side Rendering) - ๊ธฐ์กด React.js ๋ฐฉ์

- browser๊ฐ user๊ฐ ๋ณด๋ UI๋ฅผ ๋ง๋๋ ๋ชจ๋  ๊ฒ์ ํ๋ ๊ฒ
  1. browser๊ฐ server์์ JS ๊ฐ์ ธ์ด
  2. JS์ด ์ ๋ฌ๋์์ ๋ client-side(๋ธ๋ผ์ฐ์ )์์ ๋น๋ก์ UI ์์ฑํจ

> Next.js๋ ์ฑ์ ์ด๊ธฐ ์ํ๋ฅผ ํ์ฉํด ๋ฏธ๋ฆฌ ๋ ๋๋ง ํจ

- ๊ณผ์ 

  1. next.js๋ react.js๋ฅผ ๋ฐฑ์๋์์ ๋์์์ผ ํ์ด์ง๋ฅผ ๋ฏธ๋ฆฌ ๋ง๋ฌ
  2. ๋ง๋ค์ด์ง ์ปดํฌ๋ํธ(ํ์ด์ง)๋ค์ renderํจ

     โ pre-rendering(SEO์ ๋งค์ฐ ์ข์)

  3. ๋ ๋๋ง์ด ๋๋ฌ์ ๋ ๊ทธ๊ฒ์ HTML์ด ๋จ
  4. next.js๋ ์ด HTML์ ํ์ด์ง์ ์์ค์ฝ๋์ ๋ฃ์ด์ค
  5. ๋ฐ๋ผ์ ์ ์ ๋ JS์ react.js๊ฐ ๋ก๋ฉ๋์ง ์์๋๋ผ๋ ์ฝํ์ธ ๋ฅผ ๋ณผ ์ ์์
  6. react.js๊ฐ ๋ก๋ฉ๋์์ ๋ ์ด๋ฏธ ์กด์ฌํ๋ HTML๊ณผ ์ฐ๊ฒฐ(hook)๋จ

     โ **Hydration(=== react.js๋ฅผ fe(pre-rendering ๋ HTML)์์์ ์คํํ๋ ๊ฒ)**

> **Warning: Text content did not match**

- Hydration ๊ณผ์ ์์ ์๊ธฐ๋ ์ค๋ฅ
- ์ธ์ ?
  - ์๋ฒ์์ ๋ด๋ ค์ค HTML ๊ฒฐ๊ณผ๋ฌผ๊ณผ Hydration ๊ณผ์ ์์ ๋ง๋ค์ด๋ธ HTML ๊ฒฐ๊ณผ๋ฌผ์ด ๋ค๋ฅผ ๋
  - ex) Date.now() ๋ฉ์๋ ์ฌ์ฉ ์ SSR(Server Side Rendering)๋์ now์ Hydration ํ  ๋์ now๊ฐ ๋ค๋ฆ

### โง Routing

```javascript
import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a
          className="hello"
          style={{ color: router.pathname === "/" ? "red" : "blue" }}
        >
          Google
        </a>
      </Link>
    </nav>
  );
}
```

> a ํ๊ทธ์์๋ง ํด๋์ค, ์คํ์ผ ๋ฑ ์ ์ฉ๊ฐ๋ฅ **useRouter()** : next์์ ์ ๊ณตํ๋ hook (**pathname** property ํ์ฉ)

- ๊ธฐ์กด html link ํ๊ทธ๋ก route ์ฒ๋ฆฌ๋ฅผ ํ  ๊ฒฝ์ฐ page ์ด๋ ๋๋ง๋ค ์๋ก๊ณ ์นจ์ ํ๊ฒ ๋จ(์ฐ์ง ๋ง์!!)
- next/link ์ฌ์ฉํ๋ css ์์์ ์ํด useRouter๋ฅผ ์ฌ์ฉํ๋ ๋ฐฉ์์ ์ถ๊ตฌํ์!

### โง CSS ์ ์ฉ๋ฐฉ์

> tag์ ๋ฐ๋ก style={{}} ์ ์ฉ

```javascript
<a
  className="hello"
  style={{ color: router.pathname === "/" ? "red" : "blue" }}
>
  Google
</a>
```

> CSS Modules

- .module.css ํ์ผ ๊ฒฝ๋ก๋ฅผ importํด ์ฌ์ฉํ๋ ๋ฐฉ์
- ์ฌ๋ฌ ์ปดํฌ๋ํธ์์ ๊ฐ์ ํด๋์ค ์ด๋ฆ์ ์ฌ์ฉํด๋ ๋ธ๋ผ์ฐ์  ์ ํด๋น ํ๊ทธ๋ฅผ ๋ดค์ ๋ ๋๋ค์ผ๋ก ํด๋์ค๋ช์ด ์ ํด์ง๊ธฐ ๋๋ฌธ์ ์ฌ์ฉํ๊ธฐ ์ข์
- ํ์ง๋ง ํด๋์ค๋ช์ ๊ธฐ์ตํด์ผ ํ๊ณ  ์ฌ๋ฌ ํ์ผ์ ๋์๋ค๋์ผ ํ๋ค๋ ๋จ์ ์ด ์์
- ํด๋์ค๋ช์ ์ฌ๋ฌ๊ฐ ๋ถ์ผ ๋

```javascript
import styles from "./NavBar.module.css";

...

<a

className={`${styles.link} ${

router.pathname === "/" ? style.active : "" }`}

>

Google

</a>
```

๋๋

```javascript
import styles from "./NavBar.module.css";

...

<a

className={[

styles.link,

router.pathname === "/" ? style.active : ""

].join(" ")}

>

Google

</a>
```

> Styles JSX(!!๊ฐ์ฅ ์ถ์ฒํ๋ ๋ฐฉ์!!)

- Next.js์ ๊ณ ์ ๋ฐฉ์
- import ์์ ํ์ ์์
- ์ํฌํธํ ์ปดํฌ๋ํธ์์ ๊ฐ์ ์ด๋ฆ์ ํด๋์ค๋ฅผ ์ฌ์ฉํ๋๋ผ๋ ์ ์ฉ๋์ง ์์!! => ๋๋ฆฝ์ 
- ์ํฌํธํ ์ปดํฌ๋ํธ๋ ์ ์ฉ์ํค๊ณ  ์ถ์ผ๋ฉด 'style jsx global' ์ฌ์ฉํ๋ฉด ๋จ
  โ but, ๊ฐ์ ์ปดํฌ๋ํธ ์ด๋๋ผ๋ ํ์ด์ง(url)์ด ๋ณ๊ฒฝ๋๋ฉด ์ ์ฉ๋์ง ์์

```javascript
//Hello.js

import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {

const router = useRouter();

return (

<nav>

<Link href="/">

<a

className="hello"

>

Google

</a>

</Link>

<style jsx>{`

.hello{

color: red;

}

`}</style>

</nav>

);

}

//index.js

import Hello from "Hello.js";

export default function Welcome() {

return (

<div>

	<h1 className="hello">Welcome!</h1>

	<Hello />

</div>

);

}
```

- hello.js ์ a ํ๊ทธ๋ ์คํ์ผ์ด ์ ์ฉ๋์ง๋ง index.js์ h1์๋ ์คํ์ผ ์ ์ฉ ์๋จ

- ์ปดํฌ๋ํธ ๋ด๋ถ๋ก ๋ฒ์๊ฐ ํ์ ๋๊ธฐ ๋๋ฌธ

| Next.js       | Vue.js           |
| ------------- | ---------------- |
| < style jsx > | < style scoped > |

### โง Custom App

> Global Styles (CSS ์ ์ญ์ผ๋ก ์ ์ฉ ์)

- < style jsx global > ํ์
- But, ์ ์ญ ์ ์ฉ์ ์ํด์๋ \_app.js ํ์ฉ ๊ถ์ฅ
-

> Next.js์ ๋ ๋๋ง ์์

1. \_app.js (๋ด๋ถ์ App ์ปดํฌ๋ํธ ํธ์ถํจ)

2. index.js

3. others...

> \_app.js(next app์ blueprint!)

- ์๋ฒ๋ก ์์ฒญ์ด ๋ค์ด์์ ๋ ๊ฐ์ฅ ๋จผ์  ์คํ๋๋ ์ปดํฌ๋ํธ
- ์ฃผ ์ฌ์ฉ ๋ชฉ์ ?
  ๋ชจ๋  ์ปดํฌ๋ํธ์ ๊ณตํต์ผ๋ก ์ ์ฉํ  ์์ฑ ๊ด๋ฆฌ

  ```javascript
  import NavBar from "../components/NavBar";

  import "../styles/globals.css";

  export default function MyApp({ Component, pageProps }) {
    return (
      <>
        <NavBar />

        <Component {...pageProps} />
      </>
    );
  }
  ```

  - Component๋ฅผ Props ํํ๋ก ๋ด๋ ค๋ฐ๋ ํ์

  1. Component prop - ๋ ๋๋ง ํ๊ธธ ์ํ๋ ํ์ด์ง

  - ์ ์ฝ๋์์๋ globals.css์ NavBar ์ปดํฌ๋ํธ ๊ณตํต ์ ์ฉ

  - **์ฆ, ํ์ด์ง๋ค์ด ๋ณํํด๋ layout์ด ์ ์ง๋จ**

  - ์๋ฒ์ ์์ฒญํ ํ์ด์ง๊ฐ Component์ ์์ฑ๊ฐ

  - ex) http://localhost:3000/hello -> Component : hello

## โญ๏ธ ADDITIONAL CONCEPTS

### โง Patterns

> html > head > title ๋ณ๊ฒฝ ์

```javascript
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Next.js</title>
      </Head>
    </div>
  );
}
```

๋๋

```javascript
//title.js

import Head from "next/head";

export default function Title({ title }){

return(

<Head>

<title>{title} | Next.js</title>

</Head>

);

}

//home.js

import Title from "../components/title";

export default function Home(){

return(

<Title title="Home"></Title>

)

}

//about.js

import Title from "../components/title";

export default function About(){

return(

<Title title="About"></Title>

)

}
```

=> page ๋ณ๋ก props๋ฅผ ๋ด๋ ค head title์ ๋ค๋ฅด๊ฒ ์ค์ 

### โง Component Lifecycle

(์ฉ์ด)

**Mounting**: ์ปดํฌ๋ํธ๊ฐ ํ๋ฉด์ ๋ํ๋จ

**Updating**: ์ปดํฌ๋ํธ๊ฐ ์๋ฐ์ดํธ๋จ

**Unmounting**: ์ปดํฌ๋ํธ๊ฐ ํ๋ฉด์์ ์ฌ๋ผ์ง

### โง Redirect and Rewrite

> Redirect

source url๋ก ๊ฐ์ ๋ destination url๋ก ์๋ ์ฐ๊ฒฐ

> Rewrite

์ ์ ๋ฅผ redirect ์ํค๊ธด ํ์ง๋ง url์ด ๋ณํ์ง ์์(destination url ์ํ์ด์ง๋ง url์ ๊ณ์ source url)

> example code

```javascript
//next.config.js
const API_KEY = process.env.API_KEY;
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
```

### โง .env

> ์ฃผ๋ก API key๋ฅผ ์จ๊ธฐ๊ธฐ ์ํด ์ฌ์ฉ

```javascript
// .env
API_KEY = abcde...

//index.js ๋ฑ
const API_KEY = process.env.API_KEY;

//.gitignore(์ถ๊ฐํด์ค์ผ ๊น ํธ์ฌ์๋จ)
.env
```

### โง Server Side Rendering

์ด๋ค ์ฌ์ดํธ์ ๊ฒฝ์ฐ ๋ฏธ๋ฆฌ HTML์ ๋ ๋๋ง ํ๊ณ  ์ดํ์ ๋ฐ์ดํฐ๊ฐ ์ค๋ ๋ฐฉ์(Next.js์ Pre-rendering)์ด ์๋ data fetching์ ๋ชจ๋ ๋ง์น ํ์ ์ ์ ์๊ฒ ์ปดํฌ๋ํธ๋ฅผ ๋ณด์ฌ์ฃผ๊ณ  ์ถ์ ์ ์๋ค.(SSR)

> ์ด๋ฌํ ๊ฒฝ์ฐ๋ฅผ ์ํด next.js์์๋ getServerSideProps()๋ฅผ ์ ๊ณตํ๋ค.

```javascript
//SSR์ ๊ฒฐ๊ณผ(getServerSideProps()์ ๊ฒฐ๊ณผ)๋ฅผ props๋ก ์ ๋ฌ๋ฐ์(=> Hydration)
export default function Home({ results }){
...
}

//์ฌ๊ธฐ์ ๋ฌด์์ returnํ๋์ง, props๋ก์จ page์๊ฒ ์ ๋ฌํจ
//async await ํ์ ์๋
export async function getServerSideProps(){
	const { results } = await (await fetch(`/api/movies`)).json();
	return {
		props: {
			results,
		},
	};
}
```

> getServerSideProps()

1. ์ด ์ฝ๋๋ ๋ฐฑ์๋(Server)์์ ๋์๊ฐ๊ธฐ ๋๋ฌธ์ ์ด ํจ์ ๋ด์์ api key๋ฅผ ์ฌ์ฉํ๋ฉด .env ํ์ผ ํ์์์ด api key๋ฅผ ์จ๊ธธ ์ ์๋ค

> ์ฆ, ์ ํ์ด ๊ฐ๋ฅํ๋ค!!

API๊ฐ ๋์์ค๊ธฐ ์ ๊น์ง ํ๋ฉด์ ์๋ฌด๊ฒ๋ ๋ณด์ด์ง ์๋๋ก(SSR)ํ  ๊ฒ์ธ์ง,

loadingํ๋ฉด์ ๋ณด์ฌ์ค ํ ๋ฐ์ดํฐ๋ฅผ ๋ฐ๋ ๊ฒ์ด ์ข์๊ฐ(pre-rendering)

> SSR์ ๋จ์ 

- fetching data๊ฐ ๋ฐ๋๋ฉด ๋งค๋ฒ ์๋ก์ด ํ์ด์ง๋ฅผ ์์ฒญํ๊ฒ ๋จ(์ฆ, ์์ฃผ ๋ฐ์ดํฐ์ ๋ณํ์ ํ์ด์ง์ ๋ฐ์ํด์ผ ํ๋ ๊ฒฝ์ฐ ์ฌ์ฉํ๋ ๊ฒ์ด ์ข๋ค.)
- Static Generation์ด ๋งค ๋น๋์์ pre-rendering ํ๋ ๋ฐฉ์์ธ ๋ฐ๋ฉด, SSR์ ๋งค request๋ง๋ค HTML์ด server-side๋ก ์๋ก ์์ฑ๋๋ ๋ฐฉ์!

### โง Static Generation vs Server Side Rendering

> Static Generation

1. HTML์ด build time์ ์์ฑ์ด ๋๊ณ , ๋งค ์์ฒญ์๋ง๋ค ์ฌ์ฌ์ฉ๋จ
2. Static Generation์ ์ฌ์ฉํ๋ ค๋ฉด ํ์ด์ง ์ปดํฌ๋ํธ๋ฅผ exportํ๊ฑฐ๋, getStaticProps๋ฅผ(+ ํ์ํ๋ค๋ฉดย getStaticPaths ๊น์ง) export!
3. ์ ์ ์ ์์ฒญ์ด ์๊ธฐ ์ ์ ์ฌ์  ๋ ๋๋ง์ด ๋  ์ ์๋ ํ์ด์ง๋ค์ ์ ์ ํ ๋ฐฉ์
4. ์ถ๊ฐ์ ์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์ค๊ธฐ ์ํด Client Side Rendering์ ์ฌ์ฉํ  ์๋ ์์

> Server Side Rendering

1. HTML์ด ๋งค ์์ฒญ์๋ง๋ค ์์ฑ๋จ
2. ์๋ฒ์ฌ์ด๋ ๋ ๋๋ง์ ์ฌ์ฉํ๋ ํ์ด์ง๋ฅผ ๋ง๋ค๊ธฐ ์ํด์๋,ย getServerSideProps๋ฅผ exportํด์ผ ํจ
3. SSR์ ํผํฌ๋จผ์ค๊ฐ Static Generation๋ณด๋ค ์ ์ข๊ธฐ ๋๋ฌธ์, ์ง์ง ๊ผญ ํ์ํ ๊ฒฝ์ฐ์๋ง ์ฌ์ฉ

### โง Dynamic Routes

> [id].js ํ์ด์ง์ ๊ฒฝ์ฐ router์ id๋ผ๋ ์ด๋ฆ์ผ๋ก query๋ฅผ ๊ฐ์ง๊ณ  ํด๋น ํ์ด์ง๋ฅผ ๋ฟ๋ฆผ

> ์์ ํ์ด์ง์์ ์์ธ ํ์ด์ง๋ก ๋ค์ด๊ฐ ๊ฒฝ์ฐ ์ฃผ๋ก ์ฐ์ด๋๋ฐ, router query๋ก ๋ฐ์ดํฐ๋ฅผ ์ ๋ฌํ๋ ๋ฐฉ์

> ๋๋ฌธ์, ์์ํ์ด์ง๋ฅผ ๊ฑฐ์น์ง ์๊ณ  ๋ค๋ฅธ ํ์ด์ง์์ ์์ธ ํ์ด์ง๋ก ๋ฐ๋ก ๋ค์ด๊ฐ ๊ฒฝ์ฐ์๋ ๋ฐ์ดํฐ๋ฅผ ๋ก๋ํ์ง ๋ชปํจ โ ๊ทธ๋์ redux๋ก ๋ฐ์ดํฐ๋ฅผ ๊ด๋ฆฌํ๋ ๊ฑธ๊น,,?

> [...params].js ์ ๊ฐ์ด router์ params๋ผ๋ ์ด๋ฆ์ผ๋ก query๋ฅผ ๋ฐฐ์ด๋ก ๋ง๋ค ์ ์์

```javascript
// pages/index.js
router.push(`/movies/${title}/${id}`);

// pages/movies/[...params].js
// 2.return ๊ฐ props๋ก ๋ฐ์
export default function Detail({ params }){
	const [title, id] = params || [];
	...
}

//1. SSR๋ก router query(params) ๋ฐ์์
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
```

### โง useRouter vs Link

> useRouter

```javascript
import { useRouter } from 'next/router'

...

//export default ๋ด
const router = useRouter();

...

router.push(
	{
		pathname: `/url`,
		query: {
			key: value,
		},
	},
	`/url`
);
```

> Link

```javascript
import Link from 'next/link';

...

<Link
	href={{
		pathname: `/url`,
		query: {
			key: value,
		},
	}}
	as={`/url`}
>
	<a>{sth}</a>
</Link>
```
