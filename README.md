Tune up your video channels streaming on your device.

## Directory structure for app

### public
* It contains static files such as index.html, javascript library files, images, and other asset.

### src
* It contains the source code of the project.

### src/assets
* It contain the assets like images, css & fonts

### src/components
* It contains the reusable atomic & molecular components
* Each component folder will contain the component, test & documentation file

### src/constants
* It contain the constant file
* Eg : Regex & other application generic constant

### src/helpers
* It contains the reusable helper functions

### src/layouts
* It contains the layout components
* layout is the common top wrapper component usually will contain navbar , sidebar and children components

### src/pages
* It contain the page component.
* Each component can layout component as top wrapper based on the page structure
* Each component exported as default, since lazy loading works with default export

### src/routes
* It contain the page routes
* Dynamic configuration is best with working with routes
* Usually it have an nested array to render the routes

### src/schema
* It contain the schema files using the yup
* It used with formik for field validation

### src/service
* It contain the dynamic http request function using axios
* Axios is a promise-based HTTP Client for node.js and the browser
* Axios can be used for api request cancellation, featured with request and response interceptors.

### src/store
* It contains the redux files like actions, reducers & actionTypes.

#### store/actions
* It contains the action files. It used to trigger action to update the redux state

#### store/reducers
* It contains the reducers files, each file will have default export of * function and will have various switch cases to update the redux state

#### store/actionTypes.tsx
* It contains the actionTypes which will be used to configure reducer & actions.

#### store/selectors
* It contains the selectors functions, refer Reselect for more details

#### store/index.tsx
* It contain the create store function which returns a store object
src/styles
* It contain the styled components reusable breakpoints file, global styles & theme constant file

### src/App.js
* App Component is the main component in React which acts as a container for all other components

### src/config
* It contain the config files using the env
src/index.js
* It contain method to render the application into real dom

### src/test.utils.tsx
* It contain method to render the jest component file
* This function required since we need to add top wrapper component of react-router, redux & styled-components. Without adding this wrapper component, test cases will not run.
