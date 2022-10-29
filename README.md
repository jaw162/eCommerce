# Tech eCommerce Frontend

##### Made with Next.js and Strapi

### Getting started

As for the frontend there are very few dependencies so it should be as straight forward as running npm install in the root directory. 

    "cookie": "^0.5.0"
    
This package was used for authentication, that the bearer tokens would be stored as http-only cookies.

    "react-toastify": "^9.0.8"
    
This package was used for notifications for the user when making CRUD operations in the review sections of the products. 

As for the backend this will require more configuration, mainly due to the fact that you'll need a cloudinary account and some images for the products. The two packages needed are cloudinary-upload-provider and slugify, but these should be installed easily using

    npm install
    
at the root directory once you have cloned it, as the code has already been configured.

### Description

This is a simple frontend made using React, Next.js and CSS, with HTML being utilised through the power of Next's SSG (important for any business that has an online presence and needs to appear in search engine results). The design for the site was inspired from a few sources which I will list below: 

-[Vendure Storefront](https://remix-storefront.vendure.io/)

-[Hyperice](https://hyperice.com/)

-[Mammut](https://www.mammut.com/uk/en/category/5818-10/clothing)

While I am pleased with the design, I had some issues with the UX which I'm still not fully happy with. Returning to the previous scroll position on return turned out to be trickier than expected and I couldn't figure out how popular shopping sites did this themselves. I also had some issues with the filtering, sort and pagination which I (hopefully) resolved by refactoring the code into its own useContext hook (the issue being that props were being passed into several components with the impact of user interaction on each part getting very confusing). This solution may or may not have been less confusing but I will let you decide for yourself, as both versions are viewable on the current version and previous commits. Everything else thankfully went pretty smoothly, although in the future I think I will definitely be using a CSS framework as I find writing CSS, even with the help off CSS modules in React to be quite time-consuming and cumbersome.
