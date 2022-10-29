# Tech eCommerce Frontend

##### Made with Next.js and Strapi

### Getting started

As for the frontend there are very few dependencies so it should be as straight forward as running npm install in the root directory. 

    "cookie": "^0.5.0"
    
This package was used for authentication, mainly so that the bearer tokens would be http-only cookies.

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
