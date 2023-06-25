# ResortProject

#Link github 

https://github.com/roxanasirbu/resort-project-Jadore.git

###Instalare resurse
Pentru instalare se rulează în terminal comanda `npm i --force`.

## Pornire aplicație

Rulează `ng serve`. Navighează către `http://localhost:4200/`. Dacă vor fi făcute modificări în fișierele sursă aplicația își va face reload.

## Build

Rulează `ng build` pentru a face build proiectului.

## Rulare teste unitare

Rulează `ng test` pentru a rula teste cu [Karma](https://karma-runner.github.io).

### Erori posibile

1. node_modules/@ngx-translate/core/dist/lib/translate.directive.d.ts:25:102 - error TS2344: Type '{ translate: { alias: "translate"; required: false; }; translateParams: { alias: "translateParams"; required: false; }; }' does not satisfy the constraint '{ [key: string]: string; }'.

   se modifică linia `static ɵdir: i0.ɵɵDirectiveDeclaration<TranslateDirective, "[translate],[ngx-translate]", never, { "translate": { "alias": "translate"; "required": false; }; "translateParams": { "alias": "translateParams"; "required": false; }; }, {}, never, never, false, never>;` cu:  static ɵdir: i0.ɵɵDirectiveDeclaration<TranslateDirective, "[translate],[ngx-translate]", never,  {}, never, never, never>;

2.  node_modules/maplibre-gl/dist/maplibre-gl.d.ts:1145:2 - error TS2416: Property 'getDefault' in type 'BindVertexArray' is not assignable to the same property in base type 'BaseValue<WebGLVertexArrayObject>'. se șterge | null .

3.  node_modules/maplibre-gl/dist/maplibre-gl.d.ts:11077:1 - error TS1383: Only named exports may use 'export type'. se șterge type din `export type * from "@maplibre/maplibre-gl-style-spec";`
