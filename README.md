# Boiled Page router script

A simple JavaScript module for Boiled Page frontend framework to handle routing for single page applications.

## Install

Place `router.js` to `/assets/js` directory and add its path to `scripts` variable in `gulpfile.js` to be combined with other scripts.

## Methods

### Initialize router

`init(options)` - Initialize router. It adds events related to handle routing.

Parameter | Type | Default | Required | Description
----------|------|---------|----------|------------
`root` | String | / | Yes | The root URL that is added to each path on navigation.
`endsWithSlash` | Boolean | true | Yes | Do URLs end with slash or not.

### Add route

`add(pattern, callback)` - Add new route to router.

Parameter | Type | Required | Description
----------|------|----------|------------
`pattern` | Object | Yes | `RegExp` object matched against one or more paths on navigation.
`callback` | Function | Yes | Function called when route becomes active.

### Remove route by pattern

`remove(pattern)` - Remove route from router by given pattern.

Parameter | Type | Required | Description
----------|------|----------|------------
`pattern` | Object | Yes | Pattern of route to be removed by.

### Clear routes

`clear()` - Remove all routes from router.

### Check route by path

`check(pathname)` - Find route matched against path, call found one's callback function.

Parameter | Type | Required | Description
----------|------|----------|------------
`pathname` | String | No | Path matches a route. Current one will be used when no value is passed.

### Navigate to given path

`navigate(pathname)` - Add path to the browser's session history stack, find route matched against path, call found one's callback function.

Parameter | Type | Required | Description
----------|------|----------|------------
`pathname` | String | Yes | Path matches a route.

### Get all parameters

`getParameters(query)` - Get all parameters from URL query.

Parameter | Type | Required | Description
----------|------|----------|------------
`query` | String | No | Query string of URL. Current one will be used when no value is passed.

### Get parameter by key

`getParameterByKey(key, query)` - Get parameter from URL query by key.

Parameter | Type | Required | Description
----------|------|----------|------------
`key` | String | Yes | Get value of given key in URL query.
`query` | String | No | Query string of URL. Current one will be used when no value is passed.

### Build query

`buildQuery(parameters)` - Build URL query from given parameters.

Parameter | Type | Required | Description
----------|------|----------|------------
`parameters` | Object | Yes | Key-value pairs to build URL query from.

### Destroy router

`destroy()` - Destroy router. It removes all routes and related events.
