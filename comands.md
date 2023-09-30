Tailwind Css
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

@tailwind base;
@tailwind components;
@tailwind utilities;

Router Dom
npm install react-router-dom localforage match-sorter sort-by

Prettier
npm install prettier eslint-config-prettier eslint-plugin-prettier -D

React-Hook-Form
npm install react-hook-form

Para upload de imagens
npm install uuid





     <Link to='/categorias' className="inline-flex">
                <div className="flex items-center gap-2 text-md font-medium transition-all duration-300 hover:text-indigo-700">
                  <svg
                    className="h-3 w-3 text-indigo-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a href=""> Categorias </a>
                </div>
              </Link>
