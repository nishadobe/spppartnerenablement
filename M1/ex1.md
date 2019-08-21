## Exercise 1 - Configure Schemas and Set Identifiers

In this exercise, you'll configure the required XDM schemas to classify profile information and customer behavior. In every XDM schema, you'll also have to configure a primary identifier to link all the information to.

The URL to login to Adobe Experience Platform is: [https://platform.adobe.com](https://platform.adobe.com)

**Attention!**

You have been assigned a number. As part of this exercise you'll need to specify your that number when you:

  * Create XDM Schema's
  * Create Datasets

 
### Story

Before you start configuring XDM Schema's and setting Primary Identifiers, we need to think about the business context of what we're trying to do: 

  * We Want Data
  * We Want to Link Data to a Customer
  * We Want to Build a Progressive, Unified Profile

There are 2 types of data that we want to capture:

  * Who is this customer?
  * What does this customer do?

However, the question ```Who is this customer?``` is a very open question that has many answers. When Luma wants to see this question answered, they are looking for demographic information like First Name, Last Name and Address. But also for contact information like an Email Address or a Mobile Phone Number. Ans also for information linked to Language, OptIn/OptOut and maybe even Profile Pictures. And finally, what we really need to know, is how we'll be identifying this customer in the various systems that Luma will use.

The same thing goes for the question ```What does this customer do?```. It's a very open question with many answers. When Luma wants to see this question answered, they are looking for any interaction a customer has has had with any of their online properties. Which pages or products have been visited? Has this customer added a product to his cart or even purchased an item? What device and browser has been used to browse the website? What kind of information is this customer looking for and how can we use that to configure and deliver a delightful experience to this customer? And finally, what we really need to know, is how we'll be identifying this customer in the various systems that Luma will use.

### Exercise 1.1 - Who is this customer?

Capturing the answer to ```Who is this customer?``` for Luma is done through the Login/Registration-page.

![Data Ingestion](./images/7.png)

From a Schema perspective, we look at this from a 'Class'-perspective. The question: ```Who is this customer?```is something that we define in the Class "Profile".

So when you create an XDM Schema to capture the answer to ```Who is this customer?```, first of all, you'll need to create and define 1 schema that references the class "Profile".

To specify what kind of answers can be given to that question, you'll need to define Mixins. Mixins are extensions of the Profile-class, and have very specific configurations. For instance, demographic information like First Name, Last Name, Gender and Birthday are part of the Mixin: ```Profile Person Details```.

Secondly, Luma needs to decide how they will identify this customer. In the case of Luma, the main identifier for a known customer will be a specific customer ID, like for instance an email address. But technically, there are other ways of identifying a customer at Luma, like using a mobile phone number.
In this lab, we'll define the email address as the primary identifier and the phone number as a secondary identifier.

Lastly, it's important to distinguish the channel on which data was captured. In this case, we'll be talking about Website Registrations and the schema that needs to be defined needs to reflect ```Where``` the registration data was captured. The channel will also have an important role in influencing what data is captured. As such, it's a best practice to define schema's for every combination of channel, primary identifier and type of data collected.

Based on the above, you'll need to configure a Schema in Adobe Experience Platform.

Log in to Adobe Experience Platform by going to this URL: [https://platform.adobe.com](https://platform.adobe.com)

  * Your Username is: your Adobe ID
  * Your Password is: your personbal password

After logging in, you'll land on the homepage of Adobe Experience Platform.

![Data Ingestion](./images/home.png)

In Adobe Experience Platform, click on ```Schemas```in the menu on the left side of your screen.

![Data Ingestion](./images/menuschemas.png)

In Schemas, you'll see a number of already defined schemas. 

![Data Ingestion](./images/schemas.png)

You should create a new schema. To create a new schema, click on the button ```+ Create Schema```.

![Data Ingestion](./images/createschema.png)

After clicking the ```+ Create Schema```button, you'll see an empty, new schema. Click on the ``Untitleed Schema``-field tto change the name of the schema.

![Data Ingestion](./images/emptyschema.png)

Let's first name your schema. Please use the following naming for your schema:

Remember your specific number and use it below.
**XX** = your number.

Example:

  * Number 1 > replace XX with 01
  * Number 75 > replace XX with 75

As the name for our schema, we'll use this:
**SPP - XX - Website Registration Schema**

Replace XX with your number. 

Example:

  * Number 1 > SPP - **01** - Website Registration Schema
  * Number 75 > SPP - **75** - Website Registration Schema

That should give you something like this:
![Data Ingestion](./images/schemaname.png)

Next, you need to select the class of your schema. As indicated before, the class of your schema should be "XDM Profile". 
Click on the button ```+ Assign```

![Data Ingestion](./images/assign.png)

In the ```Assign Class```-window, select ```XDM Profile```.

![Data Ingestion](./images/XDMProfile.png)

Click the ```Assign Class```-button to assign the class.

![Data Ingestion](./images/assignclass.png)

You'll now see an overview of the minimal structure of your schema.

![Data Ingestion](./images/classoverview.png)

It's important to note that when eventually ingesting data against this schema, that some fields are required.
For instance, the field ```_id``` is a required field.

  * _id needs to contain a unique id for a specific data ingestion

Now you need to define what an answer to the question ```Who is this customer?``` should look like.
In the introduction of this lab, we noted the need for following attributes to define a customer:

  * Demographic information like First Name, Last Name and Address
  * Contact information like a Home Address, Email Address or a Mobile Phone Number
  * Other Information linked to Language, OptIn/OptOut and maybe even Profile Pictures. 
  * Primary Identifier for a customer

To make that information part of your schema, you need to add the following Mixins to your schema:

  * Profile Person Details (Demographic Information)
  * Profile Personal Details (Contact Information)
  * Profile Preferences Details (Other Information)
  * SPP Profile Identification (Primary and Secondary Identifiers)

You can add these Mixins by clicking the ```+ Add```-button below the Class that you just defined.

![Data Ingestion](./images/addmixin.png)

Let's start with **Profile Person Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```Profile Person Details```.

![Data Ingestion](./images/ppd.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Next, add the Mixin **Profile Personal Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```Profile Personal Details```.

![Data Ingestion](./images/ppsd.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Next, add the Mixin **Profile Preferences Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```Profile Preferences Details```.

![Data Ingestion](./images/ppfd.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Lastly, add the Mixin **SPP Profile Identification**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```SPP Profile Identification```.

![Data Ingestion](./images/btpd.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

You should now have this Schema structure in place.

![Data Ingestion](./images/schemastructure.png)

The most important field in any XDM Schema is the primary identifier. We need to define the primary identifier in this schema now.

In the schema UI, click on the name of your schema to select it.

Next, click on the object ```_platformlab05``` in the schema.

![Data Ingestion](./images/platformlab05.png)

This opens up the object ```identification```. 

Click on the object ```identification```.

![Data Ingestion](./images/platformlab05id.png)

You're now seeing 3 potential identifiers that we can choose from to define a primary identifier. In the case of Website Registration Information, we'll consider the email-address as the primary identifier.

Click on the field ```emailId```. 

![Data Ingestion](./images/platformlab05idemail.png)

By selecting the ```emailId```, the Field Properties for ```emailId``` are now shown on the right side of your screen.

![Data Ingestion](./images/fieldprop.png)
![Data Ingestion](./images/fieldprop1.png)

The last property of the field ```emailId``` is the checkbox for ```Identity```.

![Data Ingestion](./images/idfield.png)

Check the checkbox for ```Identity```

![Data Ingestion](./images/idfieldchecked.png)

By checking that checkbox, you now have the option of defining this field as the Primary Identity.

Check the checkbox for Primary Identity.

![Data Ingestion](./images/pidfieldchecked.png)

By defining the field ```emailId``` as the Primary Identity, you now have to tell Adobe Experience Platform in which namespace to classify this identity.

By opening the dropdown-list, all available namespaces are shown. Logically, the field ```emailId``` should be linked to the namespace of ```Email```.

![Data Ingestion](./images/nsemail.png)

So finally, the Identity-configuration should look like this:

![Data Ingestion](./images/idresult.png)

Click ```Apply``` to apply your changes.

![Data Ingestion](./images/apply.png)

Click ```Save``` to save your changes.

![Data Ingestion](./images/save.png)

The last thing to do here, is to activate the Schema to be linked to the **Unified Profile**.
By enabling your schema for Unified Profile, you're making sure that all data sent to Adobe Experience Platform against this schema will be part of the Unified Profile environment, which makes sure that all that data can be used in real-time for querying and also for segmentation.

To do this, let's select the name of your schema.

![Data Ingestion](./images/schemastructure.png)

In the right tab of your schema, you'll see a Unified Profile Switcher, which is currently deactivated.

![Data Ingestion](./images/upswitcher.png)

Activate the Unified Profile - switch by clicking it.

![Data Ingestion](./images/upswitch.png)

You'll see this message:

![Data Ingestion](./images/sure.png)

Click ```Enable``` to enable this schema for Unified Profile.

Finally, click ```Save``` to save your schema.

![Data Ingestion](./images/save.png)

### Exercise 1.2 - What does this customer do?

Capturing the answer to ```What does this customer do?``` for Luma is done through f.i. a Product View on a Product Page.

![Data Ingestion](./images/productview.png)

From a Schema perspective, we look at this from a 'Class'-perspective. The question: ```What does this customer do?```is something that we've defined in the Class "ExperienceEvent".

So when you create an XDM Schema to capture the answer to ```Who is this customer?```, first of all, you'll need to create and define 1 schema that references the class "ExperienceEvent".

To specify what kind of answers can be given to that question, you'll need to define Mixins. Mixins are extensions of the Experience Event-class, and have very specific configurations. For instance, information about what kind of products a customer viewed or added to their cart is part of the Mixin ```ExperienceEvent Commerce Details```.

Secondly, Luma needs to decide how they will identify the behavior of this customer. Since we're talking about interactions on a website, it's possible that Luma knows the customer but it's equally possible that an unknown, anonymous visitor is active on the website. So we can't use an identifier like email-address. In this case, Luma has decided to use the Experience Cloud ID (ECID) as the primary identifier.

Lastly, it's important to distinguish the channel on which data was captured. In this case, we'll be talking about Website Interactions and the schema that needs to be defined needs to reflect ```Where``` the interaction data was captured. The channel will also have an important role in influencing what data is captured. As such, it's a best practice to define schema's for every combination of channel, primary identifier and type of data collected.

Based on the above, you'll need to configure a Schema in Adobe Experience Platform.

Log in to Adobe Experience Platform by going to this URL: [https://platform.adobe.com](https://platform.adobe.com)

  * Your Username is: your Adobe ID
  * Your Password is: your personbal password

After logging in, you'll land on the homepage of Adobe Experience Platform.

![Data Ingestion](./images/home.png)

In Adobe Experience Platform, click on ```Schemas```in the menu on the left side of your screen.

![Data Ingestion](./images/menuschemas.png)

In Schemas, you'll see a number of already defined schemas. 

![Data Ingestion](./images/schemas.png)

You should create a new schema. To create a new schema, click on the button ```+ Create Schema```.

![Data Ingestion](./images/createschema.png)

After clicking the ```+ Create Schema```button, you'll see an empty, new schema. 

![Data Ingestion](./images/emptyschema.png)

Let's first name your schema. Please use the following naming for your schema:

Look at your computer and locate the computer's number.
**XX** = the number of your tech lab computer.

Example:

  * Number 1 > replace XX with 01
  * Number 75 > replace XX with 75

As the name for our schema, we'll use this:
**SPP - XX - Website Interaction Schema**

Replace XX with your number. 

Example:

  * Number 1 > SPP - **01** - Website Interaction Schema
  * Number 75 > SPP - **75** - Website Interaction Schema

That should give you something like this:
![Data Ingestion](./images/schemanameee.png)

Next, you need to select the class of your schema. As indicated before, the class of your schema should be "XDM ExperienceEvent". 
Click on the button ```+ Assign```

![Data Ingestion](./images/assignee.png)

In the ```Assign Class```-window, select ```XDM ExperienceEvent ```.

![Data Ingestion](./images/XDMEE.png)

Click the ```Assign Class```-button to assign the class.

![Data Ingestion](./images/assignclass.png)

You'll now see an overview of the minimal structure of your schema.

![Data Ingestion](./images/classoverviewee.png) 

It's important to note that when eventually ingesting data against this schema, that some fields are required.
For instance, the fields ```_id``` and ```timestamp``` are required fields.

  * _id needs to contain a unique id for a specific data ingestion
  * timestamp needs to be the timestamp of this hit, in the format **"YYYY-MM-DDTHH:MM:SSZ"**, like f.i.: **"2019-04-08T07:20:00Z"**

Now you need to define what an answer to the question ```What does this customer do?``` should look like.
In the introduction of this lab, we noted the need for following attributes to define what a customer does:

  * Which pages or products have been visited? 
  * Has this customer added a product to his cart or even purchased an item? 
  * What device and browser has been used to browse the website? 
  * What kind of information is this customer looking for and how can we use that to configure and deliver a delightful experience to this customer?
  * Primary Identifier for a customer


To make that information part of your schema, you need to add the following Mixins to your schema:

  * ExperienceEvent Web Details
  * ExperienceEvent Commerce Details
  * ExperienceEvent Environment Details
  * SPP Profile Identification EE (Primary and Secondary Identifiers)

You can add these Mixins by clicking the ```+ Add```-button below the Class that you just defined.

![Data Ingestion](./images/addmixinee.png)

Let's start with **ExperienceEvent Web Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```ExperienceEvent Web Details```.

![Data Ingestion](./images/eewd.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Next, add the Mixin **ExperienceEvent Commerce Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```ExperienceEvent Commerce Details```.

![Data Ingestion](./images/eecd.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Next, add the Mixin **ExperienceEvent Environment Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```ExperienceEvent Environment Details```.

![Data Ingestion](./images/eeed.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Next, add the Mixin **SPP Profile Identification EE**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```SPP Profile Identification EE```.

![Data Ingestion](./images/btpdee.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

Lastly, add the Mixin **SPP Product Interaction Details**.

Click the ```+ Add```-button to start adding a Mixin.

In the "Add Mixin"-screen, select the Mixin ```SPP Product Interaction Details```.

![Data Ingestion](./images/btpidtl.png)

Click the ```Add Mixin```-button to add the Mixin to your schema.

![Data Ingestion](./images/addmixin1.png)

You should now have this Schema structure in place.

![Data Ingestion](./images/schemastructureee.png)

The most important field in any XDM Schema is the primary identifier. We need to define the primary identifier in this schema now.

To do that, click on the object ```_platformlab05``` in the schema.

![Data Ingestion](./images/platformlab05ee.png)

This opens up the object ```identification```. 

Click on the object ```identification```.

![Data Ingestion](./images/platformlab05idee.png)

You're now seeing 2 potential identifiers that we can choose from to define a primary identifier. In the case of Website Interactions, we'll consider the ecid as the primary identifier.

Click on the field ```ecid```. 

![Data Ingestion](./images/platformlab05idecid.png)

By selecting the ```ecid```, the Field Properties for ```ecid``` are now shown on the right side of your screen.

![Data Ingestion](./images/fieldpropee.png)
![Data Ingestion](./images/fieldpropee1.png)

The last property of the field ```ecid``` is the checkbox for ```Identity```.

![Data Ingestion](./images/idfield.png)

Check the checkbox for ```Identity```

![Data Ingestion](./images/idfieldchecked.png)

By checking that checkbox, you now have the option of defining this field as the Primary Identity.

Check the checkbox for Primary Identity.

![Data Ingestion](./images/pidfieldchecked.png)

By defining the field ```ecid``` as the Primary Identity, you now have to tell Adobe Experience Platform in which namespace to classify this identity.

By opening the dropdown-list, all available namespaces are shown. Logically, the field ```ecid``` should be linked to the namespace of ```ECID```.

![Data Ingestion](./images/nsecid.png)

So finally, the Identity-configuration should look like this:

![Data Ingestion](./images/eeidresult.png)

Click ```Apply``` to apply your changes.

![Data Ingestion](./images/apply.png)

Click ```Save``` to save your changes.

![Data Ingestion](./images/save.png)

The last thing to do here, is to activate the Schema to be linked to the **Unified Profile**.
By enabling your schema for Unified Profile, you're making sure that all data sent to Adobe Experience Platform against this schema will be part of the Unified Profile environment, which makes sure that all that data can be used in real-time for querying and also for segmentation.

To do this, let's select the name of your schema.

![Data Ingestion](./images/schemastructureeee.png)

In the right tab of your schema, you'll see a Unified Profile Switcher, which is currently deactivated.

![Data Ingestion](./images/upswitcheree.png)

Activate the Unified Profile - switch by clicking on it.

![Data Ingestion](./images/upswitch.png)

You'll see this message:

![Data Ingestion](./images/sure.png)

Click ```Enable``` to enable this schema for Unified Profile.

Finally, click ```Save``` to save your schema.

![Data Ingestion](./images/save.png)

You've now finished building schemas that are activated to be used in the Real-Time Customer Profile.

Let's have a look at datasets in the next exercise.

---

[Next Step: Exercise 2 - Retrieve Datasets](./ex2.md)