# Angular Reddit Clone.

It's time to put everything you've learned so far about Angular to use.  You're going to make a reddit clone with posts, comments, searching, sorting, animations, and more! Watch the following video for an in-depth walk-through of the features.

<iframe src="https://player.vimeo.com/video/135778837?byline=0&portrait=0" width="500" height="313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Note:

* All post data should only be stored in a controller.
* A page refresh will clear all added posts.
* You should be using custom directives for posts and comments
* You do _not_ have to make any ajax requests or actually contact the reddit API.

### Requirements:

* Each post has a title, author, image, and description.
* Each post's date/time is displayed nicely: "Yesterday at 3:09pm", "Last Thursday at 4:42am", etc. You will need an external library. Watch the video for more details.
* A user can upvote/downvote posts
* Posts dynamically reorder according to number of votes
* A user can create new posts
* A user cannot create a new post if any of the 4 inputs are blank
* A user can click to view existing comments on a specific post
* The number of comments is correctly pluralized
* A user can add a new comment to a specific post
* The new post form and comment forms can be toggled on and off
* A user can search through posts
* A user can sort posts by votes, date, and title.
* Style the app.  It should look better than my implementation.

### Bonus Features

* A user can choose to sort ascending or descending
* The post creation form is on a separate route. Will need to use a service to accomplish this.
* A user can favorite posts and view all favorites in a separate tab
* A user can upload an image (no backend involved)
* Animate posts as they are added and removed from the search results.
  * Research Angular animations. See the video for an example implementation.
  * Hint for animations:
  * http://plnkr.co/edit/qrQwv1?p=preview
  * https://divshot.com/blog/tips-and-tricks/angular-1-2-and-animate-css/
  * http://odetocode.com/blogs/scott/archive/2014/02/25/easy-animations-for-angularjs-with-animate-css.aspx

[Fork and clone this repo to do a Pull Request against](https://github.com/gSchool/ccf-angular-reddit-clone)