## Exercise 1 - Visit the BT website

In this exercise, you'll follow a script and walk through the BT website on your local machine.

The URL to access the BT website is: [http://lab12.bt.com](http://lab12.bt.com)
 
### Story
In this exercise, the goal is to have you walk through the BT customer journey and act like a real customer.

You can access the demo website by going to [http://lab12.bt.com](http://lab12.bt.com)

On this website, we've implemented Adobe Experience Platform. Every activity is considered an Experience Event and is sent like that to Adobe Experience Platform in real-time, and hydrates the Real-Time Customer Profile.

In this journey, you'll start as an anonymous customer who browses the BT website and after a couple of steps, you'll become a known customer which will fuel Adobe Experience Platform's Real-Time Customer Profile.


### Exercise 1.1 - Visit the BT website

Let's start.

Go to to [http://lab12.bt.com](http://lab12.bt.com).

![Demo](./images/1.png)

In the site's menu, click on Broadband Deals to visit that page.

![Demo](./images/2.png)

In the site's menu, click on TV & Broadband Deals to visit that page.

![Demo](./images/3.png)

In the site's menu, click on SIM Only to visit that page.

![Demo](./images/4.png)

In the site's menu, click on BT Sport to visit that page.

![Demo](./images/5.png)

After visiting the BT Sport page, go to the Login/Register page and fill out your own details to register. Click "Create Account" to create your account.

![Demo](./images/7.png)

Go back to the Homepage of the BT website and open the Adobe Experience Platform X-ray panel. The X-ray panel is a live and dynamic panel that updates in real-time and shows the kind of information that is available in Adobe Experience Platform.

By opening the Real-Time Customer Profile panel, you should see something similar to the below, showing the different identities that are part of your profile, together with the declared personal information that you filled out on the registration form.

![Demo](./images/8.png)

By opening the Experience Events panel, you should be seeing an entry for each page you've visited. Please note that Adobe Experience Platform captures and stores all data by linking it to an ID, regardless of whether the customer was anonymous or known. You'll notice that all your page views are shown here, also for the pages that were visited while you were still unknown.

![Demo](./images/9.png)

By opening the Sensei Services panel, you should be seeing an Churn Score of 0.00. Since you've just created your Account with BT, you don't have any products yet and as such, aren't at risk of churning yet.

![Demo](./images/9s.png)

In the site's menu, click on BT Shop to visit that page.

![Demo](./images/10.png)

In the BT-shop, scroll down and click on the product "Samsung Galaxy S8+ 64GB Midnight Black".

![Demo](./images/11.png)

On the Samsung Galaxy S8 product detail page, click the "Add To Cart"-button twice to add 2 products to your cart. You should see the amount of products being updated on the shopping basket in the upper right corner of your screen. 

![Demo](./images/12.png)

In the site's menu, click on BT Shop to go back to the BT Shop.
Scroll down untill you see the "Google Pixel XL 32GB Black Smartphone" and click it.

![Demo](./images/10.png)

On the Google Pixel XL product detail page, click the "Add To Cart"-button once to add 1 product to your cart. 

![Demo](./images/13.png)

You should see the amount of products being updated on the shopping basket in the upper right corner of your screen. 

![Demo](./images/14.png)

Click on the shopping basket icon to start the checkout process.

On the Cart page, select your payment method and delivery type. Click Purchase to finalize the purchase.

![Demo](./images/15.png)

On the purchase confirmation page, you'll see your order confirmation.

![Demo](./images/16.png)

Open the X-ray panel again, to see the updated Experience Events, where you should see additional Browse Activity and also, the products that you added to your basket.

![Demo](./images/17.png)

With this information on the X-ray panel, let's now have a look inside Adobe Experience Platform.

---

[Next Step: Exercise 2 - Visualize your own real-time customer profile](./ex2.md)