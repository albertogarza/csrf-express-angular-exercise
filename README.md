# CSRF Exercise

For this lab, you will start with two simple post implementations: one legit (AngularJS) and the other illegitimate (HTML). The apps do something very simple. There is a route listening for POSTs on "/" and it simply returns everything you type in the text box. The server, however, is currently not protected by a CSRF token, therefore it cannot confirm any request is coming from its own app or from a malicious site.

Your job is to fix this. After you have successfully fixed it, the legit app (AngularJS) should be able to still get the data back from the server while the illegitimate site (HTML) should not.

Keep in mind this is just an example! In the real world, the malicious site or code would not be coming from the same domain. And the server would not be doing something so useless. :)

## Initial setup

1. To download the project dependencies, run: `npm install`
2. To start the server, run: `npm start`
3. IMPORTANT: Whenever you make any changes to the server code, don't forget to kill the `npm start` process and start it again or you won't see your changes.

Once you have the above steps completed, please proceed with the lab requirements.

## Lab

You will need to complete the following sections in order and be able to answer the questions to prove you understand this code, in addition to get it working. If you ever get stuck, feel free to ask your neighbor or look at the `answer` folder for some insights.

### 1. Project Setup

In this step, you will need to understand how the project is setup. This project uses jade, with which you may be unfamiliar. Think of it as the JSON for HTML. You know how XML is verbose and JSON makes it so much easier to read? That's what Jade is supposed to do. Files with the `.jade` extension use a special syntax that the server understands and translates to HTML for the browser.

Please answer the following questions:

* Where is the main server code?
* What does the server code do?
* Where is you main AngularJS code? You'll need to find both the template and controller for this app.
* What does the AngularJS code do?
* Which file do you think will be doing the malicious attack?

### 2. Project Baseline

Now that you're familiar with the code, let's dig deeper.

* Navigate to `http://localhost:3000`, fill out the text field and submit it. What do you see?
* Navigate to `http://localhost:3000/csrf.html`, fill out the same text field and submit it. What do you see?
* Imagine `http://localhost:3000/csrf.html` was actually `http://evil.site/index.html` and that you're dealing with sensitive data. Would that be a cause of alarm?
* How could you protect your server/app? Some of you might think of authentication, right? But what if the attacker already has the cookie or session id?

### 3. Learn your Tools (do some research)

In this step you will be learning of what's available to you using AngularJS and Node.js.

* Learn about what AngularJS offers by default (please read the XSRF forgery section at https://code.angularjs.org/1.4.10/docs/api/ng/service/$http#cross-site-request-forgery-xsrf-protection). Is that cool or what?
* Learn about what modules in the Node.js ecosystem. Please read https://github.com/expressjs/csurf.
* How can you use the above technologies to implement a CSRF token and patch this site? Where would you need to make code changes? In the back-end, front-end, or both?

### 4. Patch Your Server

* Run `npm install csurf --save`. What just happened? Did any of your files change?
* Now include csurf in the app.js file.

```javascript
var csurf = require('csurf');
```

* Add the csurf middleware by adding the following line of code (this will prepare a CSRF token that we can pass down to our client):

```javascript
app.use(csurf({cookie: true}));
```

* Now, add the CSRF token to the default header (the one AngularJS expects by default).

```javascript
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
```

* Restart your server and try both the legit and non-legit sites. What do you see? (At this point, you should see the legit (AngularJS) succeed while the non-legit would fail, miserably I might add, with a 403 Forbidden.)
* Go to the legit site, open the network tab in the dev tools, and reload the app. Can you find your CSRF token in the response headers?
* Submit it one more time. Can you find your CSRF token in the request headers?
* Copy that token and paste it in a safe place. Go to the Resources tab in dev tools and open Cookies > localhost. Do you see your token there?
* Reload the page. Did you get the same token? Why do you think you didn't? Is that safe?
* Go to the csrf.html file and reload it. Check if you can find the token in the response headers or the cookies section. Why is it in there too? Is this a real world scenario? What could you do to reproduce a more real world scenario?
* Is it possible to hack this without having access to the token? Why or why not?
* How many files did we change? How many lines of code were involved? Is this easy to implement?

### 5. Patch Your AngularJS Code

Just kidding! Well, sort of. It turns out you only need to update your server code IF you decide to use the default header name. However, you can change it if you'd like.

 * What would be the advantage of setting your own custom header name? Are there any disadvantages?

## Conclusion

You should now understand what XSRF/CSRF is and how it's implemented using AngularJS and Express.js. You should also understand the importance of using a CSRF token and not rely exclusively on authentication, cookies, etc.

Now go and code... but code safe!
