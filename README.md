Tour Search UI
==============

A JavaScript library for building rich, real-time search UIs for
small group tours powered by [RezKit](https://rezkit.app)


Features
--------

* Small and lightweight
* Sane, simple API
* Web components


Installation
------------

TBC: npm install & unpkg/jsdelivr


Usage with Vue
--------------

Native Vue tools and components are provided via a Vue plugin. To initialize it use the `vue` method:

```javascript
import { vue as searchUi } from '@rezkit/tour-search-ui'
import { createApp } from 'vue'

const searchKey = MY_ORG_SEARCH_KEY
const app = createApp({ /* Vue app initialization */ })
app.use(searchUi(searchKey))
```