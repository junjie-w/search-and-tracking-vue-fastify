# Product Search & View Tracking Demo  

A simple demo project showcasing product search and view tracking, built with [Vue](https://vuejs.org/) and [Fastify](https://fastify.dev/).

## Prerequisites

- **Node** >= 22.18.0 

## Run Server and Client

### CORS Handling in Dev vs Build

- In development, CORS is handled by [Vite proxy](https://vite.dev/config/server-options). 
- In build preview, CORS is handled by [Fastify CORS](https://github.com/fastify/fastify-cors). 

### Development

```bash
# Start backend dev server on http://localhost:3000
cd server
npm install
npm run dev
    
# Start frontend dev server on http://localhost:5173
cd client
npm install
npm run dev
```

Search something and navigate to product detail page, observe the request URLs in network tab:
- `http://localhost:5173/api/search`
- `http://localhost:5173/api/track-product-view`
- **_→ forwarded by Vite proxy_** in **[client/vite.config.ts](client/vite.config.ts)**

### Build

```bash
# Start backend build server on http://localhost:3000
cd server
npm install
npm run build
npm run start
    
# Start frontend build server on http://localhost:4173
cd client
npm install
npm run build
npm run preview
```

Search something and navigate to product detail page, observe the request URLs in network tab:
- `http://localhost:3000/search`
- `http://localhost:3000/track-product-view`
- **_→ handled by Fastify CORS_** in **[server/src/index.ts](server/src/index.ts)**

> For the frontend build server, since I only whitelisted `http://localhost:4173` for CORS, please use port `4173`. Otherwise, you can of course whitelist **`*`** in [server/src/constants.ts](server/src/constants.ts) and then use any other ports.

## Server · API Endpoints

### 1. `/track-product-view` endpoint
   
- #### A. 200 Response
   
   <details>
   <summary>Case 1: valid productId with string userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "productId": "product1"
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: valid productId with null userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": null },
       "productId": "product1"
     }'
   ```
   </details>

   <details>
   <summary>Case 3: valid productId with null user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": null,
       "productId": "product1"
     }'
   ```
   </details>

   <details>
   <summary>Case 4: valid productId with undefined user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "productId": "product1"
     }'
   ```
   </details>
   
- #### B. 400 Response
   
   <details>
   <summary>Case 1: missing productId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: empty productId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "productId": ""
     }'
   ```
   </details>
   
   <details>
   <summary>Case 3: invalid user object structure</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": "some string",
       "productId": "product1"
     }'
   ```
   </details>
   
   > **400 requests are handled by Fastify schema in [server/src/schemas/trackProductView.ts](server/src/schemas/trackProductView.ts)**

### 2. `/search` endpoint
   
- #### A. 200 Response
   
   <details>
   <summary>Case 1: valid search input with valid userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "search": {
         "term": "tea",
         "languageCode": "en"
       }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: valid search input with null userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": null },
       "search": {
         "term": "beer",
         "languageCode": "en"
       }
     }'
   ```
   </details>

   <details>
   <summary>Case 3: valid search input with null user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": null,
       "search": {
         "term": "wine",
         "languageCode": "en"
       }
     }'
   ```
   </details>

   <details>
   <summary>Case 4: valid search input with undefined user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "search": {
         "term": "wine",
         "languageCode": "en"
       }
     }'
   ```
   </details>

- #### B. 400 Response
   
   <details>
   <summary>Case 1: missing required search.term</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "search": {
         "languageCode": "en"
       }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: missing required search.languageCode</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "search": {
         "term": "tea"
       }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 3: missing search object</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" }
     }'
   ```
   </details>

   > **400 requests are handled by Fastify schema in [server/src/schemas/search.ts](server/src/schemas/search.ts)**

## Client · Features 

### 1. User ID  

- Navigate to any page, open browser DevTools → Application → Local Storage
- Observe that a unique `userId` is automatically generated and persisted across browser sessions (displayed in header as well)

### 2. Product Search on Homepage
- Start typing in the search input (e.g., "tea", "wine", "beer") 
- Open browser DevTools → Network tab and observe that the `/search` API endpoint is called with debounced query
- The request payload contains `userId` which was generated previously

### 3. Product View Tracking on PDP
- Click on a product from the search results to navigate to the product detail page
- Open browser DevTools → Network tab and observe that the `/track-product-view` api endpoint is automatically called with the productId and userId. 
- Check the browser console log: `Product view tracked: ...`

### 4. Recently Viewed Products
- Click on a product from the search results to navigate to its product detail page
- Click **Back to Home**, notice the most recently viewed product appears first in the **Recently viewed** list.
- Open browser DevTools → Application → Local Storage and observe that the list persists under `recently-viewed-product-ids`.
- Implemented with [Pinia](https://pinia.vuejs.org/)
  
## Testing, CI and Other Practices 
- **Testing**
    > Backend unit and api tests; frontend unit tests with Vitest and e2e tests with Playwright 
- **CI workflow**
    > automated build and tests for backend and frontend on every PR
- **Loading state**
    > throttle network requests in browser DevTools to observe loading state 
- **Debounced search**
- **Basic error handling** (for demo purpose)
- **TypeScript strict mode**

## Limitations

### Server 
- No API environment configuration
- No API key management 
- No API client configuration
- No caching 
- No rate limiting 
- No proper cors configuration 

### Client 

- SEO 
  > SEO for PDP page? SPA with Vue might impact SEO (SSR vs CSR)
- No API proxy routes in build
  > Frontend makes direct API calls to the backend, exposing backend endpoints and requiring CORS
- No productId validation for PDP 
- No error boundary component 

## Scripts 

### Server
```bash
cd server
npm run dev
npm run build
npm run start
npm run test
```

### Client
```bash
cd client
npm run dev
npm run build
npm run preview
npm run test:unit
npm run test:e2e
npm run test:e2e:chromium
```
