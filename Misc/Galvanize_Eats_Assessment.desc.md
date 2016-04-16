## Background

**Galvanize Eats** is a food service that delivers burgers and pizza on demand. You are building their new site, which includes a light ordering web app. The landing page of the site should tell you some basic information about the company, while the web app should show you a sorted list of menu items, allow you to build an order, enter in your delivery information, and submit the order to Galvanize Eats. Your product owner has created a list of prioritized user stories for you to work down.

## Import stories into Pivotal Tracker

Import this [CSV](https://s3-us-west-2.amazonaws.com/lesson-plan-images/galvanize_eats_assessments/Q1+Assessment+Stories.csv) into a new project in Pivotal Tracker to get the requirements for this story. The new project should be prefixed with your cohort number. They are sorted into two epics that roughly align with the two pages, and they are prioritized. You may find it useful to size the stories before you begin.

## Use the Galvanize Eats repo as a base

Fork/clone [this repo](https://github.com/gSchool/galvanize-eats). You are required to use this repo and keep this folder structure.

## APIs

The project involves two API calls. The first, to get the menu data should be a GET request to this url: [https://galvanize-eats-api.herokuapp.com/menu](https://galvanize-eats-api.herokuapp.com/menu). The second request, to post an order, should be a POST request to this url: [https://galvanize-eats-api.herokuapp.com/orders](https://galvanize-eats-api.herokuapp.com/orders). 

Your post request should submit the user order. When you have successfully hit the POST api you will see "Congratulations!".

## Notes

* CSS or SASS only- no styling frameworks!
* You can use jQuery or plain JavaScript for DOM manipulation
* Does not have to be responsive
* Use feature-branch workflows
* Deploy your work

## Mockups

You can use these mockups as a reference.

![Index Mockup](https://s3-us-west-2.amazonaws.com/lesson-plan-images/galvanize_eats_assessments/page_1_mock.png)

![Order Mockup](https://s3-us-west-2.amazonaws.com/lesson-plan-images/galvanize_eats_assessments/page_2_mock.png)

Here's a [wireframe](https://wireframe.cc/7JjPpp) of the ordering page.

## Screenshots

The finished product might look something like this:

![Index Page](https://s3-us-west-2.amazonaws.com/lesson-plan-images/galvanize_eats_assessments/Screen+Capture+Main+Page.png)

![Order Page](https://s3-us-west-2.amazonaws.com/lesson-plan-images/galvanize_eats_assessments/Screen+Capture+Order+Page.png)

## Copy Text

```

SHOP ONLINE TEXT 

Using our convenient web app, you'll get all the power of gFood

without having to call your order in. Order in your pajamas, order 24

hours a day, order on Christmas, we're here to serve you.

FAST DELIVERY TEXT

You've never seen ordering this quick. Our proprietary ordering

rocket ship delivery team allows you to spend less time being hungry,

and more time doing what matters most to you. We'd ask what that is,

but gFood respects your privacy.

GREAT DEALS TEXT

Money: You've got it, we want it. But let it never be said we're not

incredibly fair! Burger sales? Check. Pizza sales? Check. Burger and

pizza sales?? Check, check, check! We seriously can't stop making

deals.
  
```

## HOW TO SUBMIT YOUR ASSESSMENT 

Add a README to your project that has a link to your deployed site and submit a pull request.