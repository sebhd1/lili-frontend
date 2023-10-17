How to initialize a vue app?
To create a Vuejs app, first we should install vite and then vuejs.
in the main.js, import { createApp } from 'vue', import './style.css' and the root component.

After importing the statements, you need to call createApp() and you need to pass it the rootComponent in it, afterwards
you need to mount the root component to the root container with .mount() "#app".

Single-File Components ?

A SFC is a file with a .vue extension.
It contains three separated parts, which are:
 - 1 Script -> JavaScript;
 - 2 Template -> HTML;
 - 3 Style -> CSS;



Style of writings a Vue app. 

- 1 Options API - it uses an object of options.
- 2 Composition API - no object of options and uses the script setup top level


Create a Vue Application

run the command npm create vue@latest.

> cd <your-project-name>
> npm install
> npm run dev


Using Vue from CDN

you can just use this : <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

