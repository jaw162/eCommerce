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

###
